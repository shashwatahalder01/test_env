import { test, expect, Page } from "@playwright/test";


test.describe("Admin user functionality test", () => {
  test("Plugin found in plugin list", async ({ page }) => {
    await page.goto('http://localhost:8889' + "/wp-login.php");
    await page.getByLabel("Username or Email Address").fill("admin");
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page.getByText("Log In").click();
    await page.goto("http://localhost:8889/wp-admin/");
    await page.locator("a.menu-icon-plugins").click();
    await page.screenshot({ path: 'playwrite/screenshot.png', fullPage: true })
  });
});
