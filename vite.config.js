import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],

    server: {
      proxy: {
        "/api": {
          target: "https://api.restcountries.com",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api/, ""),

          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              proxyReq.setHeader(
                "Authorization",
                `Bearer ${env.VITE_COUNTRIES_API_KEY}`
              );
            });
          },
        },
      },
    },
  };
});