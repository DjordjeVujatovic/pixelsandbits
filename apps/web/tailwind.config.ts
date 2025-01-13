// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./src/app/**/*.tsx"],
  theme: {
    extend: {
      fontSize: {
        // Mobile first approach with responsive scaling
        "heading-1": ["2rem", { lineHeight: "1.1", fontWeight: "600" }],
        "heading-2": ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],
        "heading-3": ["1.25rem", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-4": ["1rem", { lineHeight: "1.3", fontWeight: "600" }],
        body: ["0.75rem", { lineHeight: "1.5" }],
        "body-md": ["0.875rem", { lineHeight: "1.5" }],

        // MD breakpoint
        "md-heading-1": ["3rem", { lineHeight: "1.1", fontWeight: "600" }],
        "md-heading-2": ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        "md-heading-3": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        "md-heading-4": ["1.125rem", { lineHeight: "1.3", fontWeight: "600" }],
        "md-body": ["0.875rem", { lineHeight: "1.5" }],
        "md-body-md": ["0.9375rem", { lineHeight: "1.5" }],

        // LG breakpoint
        "lg-heading-1": ["3.75rem", { lineHeight: "1.1", fontWeight: "600" }],
        "lg-heading-2": ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        "lg-heading-3": ["1.75rem", { lineHeight: "1.3", fontWeight: "600" }],
        "lg-body": ["0.875rem", { lineHeight: "1.5" }],
        "lg-body-md": ["0.9375rem", { lineHeight: "1.5" }],
      },
    },
  },
  presets: [sharedConfig],
};

export default config;
