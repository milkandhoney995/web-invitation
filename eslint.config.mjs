import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  ...storybook.configs["flat/recommended"],
  {
    ignores: [".storybook/**"],
  },
  {
    rules: {
      "react/display-name": "off",
    },
  },
];

export default eslintConfig;
