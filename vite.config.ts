import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { esmExternalRequirePlugin } from "rolldown/plugins";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "desktop",
      fileName: "index",
    },
    rolldownOptions: {
      plugins: [
        esmExternalRequirePlugin({
          external: ["react", "react-dom", "lucide-react"],
        }),
      ],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"],
        ],
      },
    }),
    svgr(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});
