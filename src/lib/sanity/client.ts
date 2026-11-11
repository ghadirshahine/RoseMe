import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19"

export const sanityConfigured = Boolean(projectId)

export const sanityClient = createClient({
  projectId: projectId || "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion,
  useCdn: true,
})
