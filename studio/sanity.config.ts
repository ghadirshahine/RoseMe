import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { schemaTypes } from "./schemaTypes"

export default defineConfig({
  name: "default",
  title: "ورود الجنة",
  projectId: "e4p57v4g",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("إدارة المتجر")
          .items([
            S.listItem()
              .title("إعدادات الموقع")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            ...S.documentTypeListItems().filter((item) => item.getId() !== "siteSettings"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
