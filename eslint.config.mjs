import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      ...(pluginSecurity.configs?.recommended?.rules ?? {}),
    },
  },

  //  JS-only rules
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier,
      "@next/next": nextPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...(nextPlugin.configs["core-web-vitals"]?.rules ?? {}),
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-sync-scripts": "off",
    },
  },

  //  TypeScript + Next.js rules
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ["**/*.ts?(x)"],
    plugins: {
      "@next/next": nextPlugin,
      prettier,
      "@typescript-eslint": tseslint.plugin,
      "unused-imports": unusedImports,
      tailwindcss,
      "simple-import-sort": simpleImportSort,
      "react-hooks": reactHooks,
    },
    rules: {
      ...(nextPlugin.configs["core-web-vitals"]?.rules ?? {}),
      ...(tailwindcss.configs["flat/recommended"]?.rules ?? {}),
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
