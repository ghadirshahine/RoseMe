import "server-only"

import { sanityClient } from "@/lib/sanity/client"

const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_READ_TOKEN

export const sanityServerClient = sanityClient.withConfig({
  ...(token ? { token } : {}),
  useCdn: !token,
})
