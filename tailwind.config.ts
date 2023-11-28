import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";

const heights = {
  header: "64px",
  footer: "48px",
};
const widths = {
  boxed: "1200px",
};

const customImageRenderingPlugin: PluginCreator = ({ addUtilities, theme }) => {
  const imageRenderings: Record<string, { imageRendering: string }> = theme(
    "imageRendering",
    {},
  );
  const newUtilities: Record<string, { imageRendering: string }> = {};

  Object.keys(imageRenderings).forEach((key) => {
    newUtilities[`.rendering-${key}`] = {
      imageRendering: imageRenderings[key]!.imageRendering,
    };
  });

  addUtilities(newUtilities);
};

export default {
  mode: "jit",
  content: ["./src/{app,components}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3f69ad",
          light: "#6587bd",
          dark: "#32548a",
        },
        secondary: {
          DEFAULT: "#f7cb46",
          light: "#f8d56a",
          dark: "#c5a238",
        },
        success: "#16a34a",
        error: "#dc2626",
      },
      height: heights,
      width: widths,
      padding: {
        ...heights,
        ...widths,
      },

      // Extend with custom utilities for image rendering
      imageRendering: {
        pixelated: { imageRendering: "pixelated" },
        auto: { imageRendering: "auto" },
        "crisp-edges": { imageRendering: "crisp-edges" },
        smooth: { imageRendering: "smooth" }, // custom utility for smooth rendering
      },
    },
  },
  plugins: [customImageRenderingPlugin],
} satisfies Config;