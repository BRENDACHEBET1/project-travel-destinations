import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "..", "VITE_");

  return {
    envDir: "..",
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/countries": {
          target: "https://api.restcountries.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/countries/, "/countries/v5"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyRequest) => {
              proxyRequest.setHeader(
                "Authorization",
                `Bearer ${env.VITE_COUNTRIES_API_KEY}`,
              );
            });
          },
        },
        "/api/country": {
          target: "https://api.restcountries.com",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/country/, "/countries/v5/codes.alpha_3"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyRequest) => {
              proxyRequest.setHeader(
                "Authorization",
                `Bearer ${env.VITE_COUNTRIES_API_KEY}`,
              );
            });
          },
        },
        "/api/destinations": {
          target: env.VITE_API_URL || "http://localhost:5000",
          changeOrigin: true,
        },
        "/api/saved-destinations": {
          target: env.VITE_API_URL || "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
  };
});
