import eslint from "@eslint/js"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

const eslintConfig = defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat.recommended,
  globalIgnores(["dist/**", "node_modules/**"]),
])

export default eslintConfig
