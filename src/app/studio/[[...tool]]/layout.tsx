export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-[calc(100vh-76px)] bg-white">{children}</div>
}
