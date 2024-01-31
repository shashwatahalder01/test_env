import { test as setup, expect } from "@playwright/test";


setup.describe.configure({ mode: 'serial' });
setup.describe("setup file  B", () => {

  setup("setup1 @lite", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup2 @lite", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup3 @liteonly", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup4 @pro", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup5 @pro", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup6", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup7", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup8", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup9", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup10", async () => {
    expect(true).toBeTruthy();
  });
});
