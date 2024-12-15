import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	experimentalDts: true,
	sourcemap: true,
	clean: true,
});
