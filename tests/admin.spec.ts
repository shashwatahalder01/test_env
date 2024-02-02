import { test, expect, Page } from "@playwright/test";

// const url = "http://dokan1.test";
const url = 'http://localhost:8889';
// const password = '01dokan01';
const password = 'password';

test.describe("Admin user functionality test", () => {
  test("Plugin found in plugin list", async ({ page }) => {
    await page.goto(url + "/wp-login.php");
    await page.getByLabel("Username or Email Address").fill("admin");
    await page.waitForTimeout(1000);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByText("Log In").click();
    await page.goto(url + "/wp-admin/");
    await page.locator("a.menu-icon-plugins").click();
    await page.screenshot({ path: "playwright/screenshot.png", fullPage: true });
  });
});
