import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["out/**", ".next/**", "playwright-report/**", "test-results/**"],
  },
];

export default eslintConfig;
