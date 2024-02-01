import { test, expect, Page } from "@playwright/test";

test.describe("Admin user functionality test", () => {
  test("Plugin found in plugin list", async ({ page }) => {
    await page.goto("http://dokan1.test" + "/wp-login.php");
    await page.getByLabel("Username or Email Address").fill("admin");
    await page.waitForTimeout(1000);
    await page.getByLabel("Password", { exact: true }).fill("01dokan01");
    await page.getByText("Log In").click();
    await page.goto("http://dokan1.test/wp-admin/");
    await page.locator("a.menu-icon-plugins").click();
    await page.screenshot({ path: "playwrite/screenshot.png", fullPage: true });
  });
});
