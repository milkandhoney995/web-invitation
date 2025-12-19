import { beforeAll, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { setProjectAnnotations } from "@storybook/react";
import * as projectAnnotations from "./preview";

// Storybook の preview 設定を Vitest に適用
const project = setProjectAnnotations([projectAnnotations]);

beforeAll(() => {
  if (project.beforeAll) {
    if (Array.isArray(project.beforeAll)) {
      project.beforeAll.forEach(fn => fn());
    } else {
      project.beforeAll();
    }
  }
});

afterEach(() => {
  cleanup();
});