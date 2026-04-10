import { test, expect } from "@playwright/test";

let URL = "https://testing-app.firmli.ai/"
let waitURL = "https://testing-app.firmli.ai/programs"
let destination_country = "Australia";
let study_level = "Master Degree";

test("Program Finder", async ({ page }) => {
    await page.goto(URL);
    await page.locator('#login-email').fill("firmli2026@yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill("Oslo@123");
    await page.getByRole('button', { name: 'Signin' }).click();

    await expect(page).toHaveTitle('Firmli');
    await page.locator('a').filter({ hasText: 'Program Finder' }).click();
    await page.waitForURL(waitURL);
    await page.getByRole('button', { name: 'Switch to New Interface' }).click();
    await page.waitForURL("https://testing-app.firmli.ai/programs-new");
    await page.waitForTimeout(5000);


    //Destination country filter selection According to the provided Country
    await page.getByPlaceholder("Destination Country").click();
    await page.keyboard.type(destination_country);
    await expect(page.getByRole('option').first()).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    //Study Level filter selection According to the provided Data
    await page.getByPlaceholder("Study Level").click();
    await page.getByPlaceholder("Study Level").click();
    await page.keyboard.type(study_level);
    await expect(page.getByRole('option').first()).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(5000);

})