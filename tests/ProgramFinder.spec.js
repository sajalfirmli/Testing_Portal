import { test, expect } from "@playwright/test";

const URL = "https://testing-app.firmli.ai/";
const destination_country = "Australia";
const study_level = "Master Degree";

test("Program Finder - Optimized", async ({ page }) => {

    // 🔹 Login
    await page.goto(URL);

    await page.fill('#login-email', "firmli2026@yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();

    await page.fill('#login-password', "Oslo@123");
    await page.getByRole('button', { name: 'Signin' }).click();

    await expect(page).toHaveTitle(/Firmli/);

    // 🔹 Navigate to Program Finder
    await page.getByRole('link', { name: 'Program Finder' }).click();
    await page.waitForURL(/programs/);

    // 🔹 Switch to new UI
    await page.getByRole('button', { name: 'Switch to New Interface' }).click();
    await page.waitForURL(/programs-new/);

    // 🔹 Reusable function for dropdown selection
    async function selectDropdown(placeholder, value) {
        const field = page.getByPlaceholder(placeholder);

        await field.click();
        await field.fill(value);

        const option = page.getByRole('option').first();
        await expect(option).toBeVisible();

        await option.click();
    }

    // 🔹 Apply filters
    await selectDropdown("Destination Country", destination_country);
    await selectDropdown("Study Level", study_level);

    // 🔹 Optional: Wait for results to load (better than timeout)
    await page.waitForLoadState('networkidle');

});