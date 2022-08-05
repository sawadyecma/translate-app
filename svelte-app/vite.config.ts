import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env);
  return {
    server: {
      port: 8000,
    },
    plugins: [svelte()],
    define: {
      CLIENT_ID: `'${env.CLIENT_ID}'`,
      API_KEY: `'${env.API_KEY}'`,
    },
  };
});
