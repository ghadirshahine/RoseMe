"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import type { Product } from "@/lib/product-types"

export type CartItem = {
  key: string
  product: Product
  quantity: number
  size: string
  wrapping: string
  cardMessage: string
  unitPrice: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "key" | "quantity">) => void
  removeItem: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "ward-aljannah-cart-v1"
const EMPTY_SNAPSHOT = "[]"
const listeners = new Set<() => void>()

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT
  } catch (error) {
    console.error("تعذر قراءة السلة المحفوظة.", error)
    return EMPTY_SNAPSHOT
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function isCartItem(item: unknown): item is CartItem {
  if (typeof item !== "object" || item === null) return false
  if (
    !("key" in item) ||
    typeof item.key !== "string" ||
    !("quantity" in item) ||
    typeof item.quantity !== "number" ||
    !Number.isInteger(item.quantity) ||
    item.quantity < 1 ||
    !("unitPrice" in item) ||
    typeof item.unitPrice !== "number" ||
    !Number.isFinite(item.unitPrice) ||
    !("size" in item) ||
    typeof item.size !== "string" ||
    !("wrapping" in item) ||
    typeof item.wrapping !== "string" ||
    !("cardMessage" in item) ||
    typeof item.cardMessage !== "string" ||
    !("product" in item) ||
    typeof item.product !== "object" ||
    item.product === null ||
    !("title" in item.product) ||
    typeof item.product.title !== "string" ||
    !("slug" in item.product) ||
    typeof item.product.slug !== "string" ||
    !("_id" in item.product) ||
    typeof item.product._id !== "string" ||
    !("price" in item.product) ||
    typeof item.product.price !== "number"
  ) {
    return false
  }
  return true
}

function readItems(snapshot: string): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(snapshot)
    if (!Array.isArray(parsed) || !parsed.every(isCartItem)) {
      throw new TypeError("Cart data has an invalid shape")
    }
    return parsed
  } catch (error) {
    console.error("تعذر تحليل بيانات السلة المحفوظة.", error)
    return []
  }
}

function updateItems(update: (current: CartItem[]) => CartItem[]) {
  try {
    const current = readItems(window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(update(current)))
    listeners.forEach((listener) => listener())
  } catch (error) {
    console.error("تعذر تحديث السلة المحفوظة.", error)
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_SNAPSHOT)
  const items = useMemo(() => readItems(snapshot), [snapshot])

  const addItem = useCallback((item: Omit<CartItem, "key" | "quantity">) => {
    const key = [item.product._id, item.size, item.wrapping, item.cardMessage].join(":")
    updateItems((current) => {
      const existing = current.find((entry) => entry.key === key)
      if (existing) {
        return current.map((entry) =>
          entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry,
        )
      }
      return [...current, { ...item, key, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    updateItems((current) => current.filter((entry) => entry.key !== key))
  }, [])

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return
    updateItems((current) =>
      current.map((entry) => (entry.key === key ? { ...entry, quantity } : entry)),
    )
  }, [])

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      setQuantity,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    }),
    [items, addItem, removeItem, setQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
