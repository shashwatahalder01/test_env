import { test as setup, expect } from "@playwright/test";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


setup.describe.configure({ mode: 'serial' });
setup.describe("setup file A", () => {

  setup("setup1", async () => {
    await sleep(3000); 
    expect(true).toBeTruthy();
  });

  setup("setup2", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup3", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup4", async () => {
    expect(true).toBeTruthy();
  });

  setup("setup5", async () => {
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
    await sleep(3000); 
    expect(true).toBeTruthy();
  });

  setup("setup10", async () => {
    expect(true).toBeTruthy();
  });
});
