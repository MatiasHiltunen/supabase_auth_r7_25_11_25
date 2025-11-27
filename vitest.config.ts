import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import vitePluginDevtoolsJson from "vite-plugin-devtools-json"

export default defineConfig({
  plugins: [tsconfigPaths(), vitePluginDevtoolsJson()],
  test: {
    environment: "node",
    globals: true,
  },
});
