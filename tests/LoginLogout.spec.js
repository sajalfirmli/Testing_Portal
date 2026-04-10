import { test, expect } from "@playwright/test";
let correctEmail = "firmli2026@yopmail.com";
let correctPassword = "Oslo@123";
let countrycode = "91"
let correctPhoneNumber = "7657892438";

test("Login Logout", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill(correctEmail);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill(correctPassword);
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page).toHaveTitle('Firmli');
    await page.waitForLoadState("networkidle");

    const text = await page.locator('p.mantine-Text-root').nth(2).textContent();
    console.log(text);
    await page.getByText(text).first().click();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.waitForURL("https://testing-app.firmli.ai/signin")
    await expect(page.locator('#login-email')).toBeVisible();
    console.log("Login Logout postive flow worked");
})


test("Login and logout with phone number", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.getByRole('tab', { name: 'Login with Phone' }).click();
    const phoneInput = page.getByRole('textbox').first();
    await phoneInput.clear();
    await page.waitForTimeout(2000);
    await phoneInput.fill(countrycode + correctPhoneNumber);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator("#login-password").fill(correctPassword);
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page).toHaveTitle('Firmli');
    await page.waitForLoadState("networkidle");
    console.log("Login Logout postive flow worked");

    const text = await page.locator('p.mantine-Text-root').nth(2).textContent();
    console.log(text);
    await page.getByText(text).first().click();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.waitForURL("https://testing-app.firmli.ai/signin")
    await expect(page.locator('#login-email')).toBeVisible();
    console.log("Login Logout postive flow with phone number worked");
})


test("invalid email format", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill("firmli2026yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    const error = (await page.locator('p.m_8f816625').textContent()).trim();
    console.log(error);
    await expect(page.getByText(error)).toHaveText("Invalid email");
    console.log("Login Logout Invalid emaid format worked");
})

test("Non existing email id", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill("firmli5050@yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator("div.mantine-Notification-title").last()).toBeVisible();
    const error_message = (await page.locator("div.mantine-Notification-title").last().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Unable to login! Please try again later.");
    console.log("Login Logout Non existing email id worked");
})

test("Valid email Invalid password", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill(correctEmail);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill("abcdef");
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page.locator("div.m_3feedf16").last()).toBeVisible();
    const error_message = (await page.locator("div.m_3feedf16").last().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Password is incorrect");
    console.log("Login Logout Valid email Invalid password worked");
})

test("Email with more than 200 characters", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill("a".repeat(200) + "@gmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator("div.mantine-Notification-title").first()).toBeVisible();
    const error_message = (await page.locator("div.mantine-Notification-title").first().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Username must be a valid email");
    console.log("Email with more than 200 characters worked");
})

test("Email with 2 @ symbols", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill("firmli2026@@yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator("div.mantine-Notification-title").first()).toBeVisible();
    const error_message = (await page.locator("div.mantine-Notification-title").first().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Username must be a valid email");
    console.log("Email with 2 @ symbols worked");
})

test("empty email id", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill("");
    await page.getByRole('button', { name: 'Next' }).click();
    const error = (await page.locator('p.m_8f816625').textContent()).trim();
    console.log(error);
    await expect(page.getByText(error)).toHaveText("Invalid email");
    console.log("Empty email id worked");
})


test("Verifying the password is case sensitive", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.locator('#login-email').fill(correctEmail);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill("OSLO@123");
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page.locator("div.m_3feedf16").last()).toBeVisible();
    const error_message = (await page.locator("div.m_3feedf16").last().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Password is incorrect");
    console.log("Password is case sensitive worked");
})


test("Login with non existing number", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.getByRole('tab', { name: 'Login with Phone' }).click();
    const phoneInput = page.getByRole('textbox').first();
    await phoneInput.clear();
    await phoneInput.fill(countrycode + "1234567890");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator("div.mantine-Notification-title").first()).toBeVisible();
    const error_message = (await page.locator("div.mantine-Notification-title").first().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("User does not exists with this Identifier");
    console.log("Login with non existing number worked");
})

test("Login with Incomplete/Incorrect number", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.getByRole('tab', { name: 'Login with Phone' }).click();
    const phoneInput = page.getByRole('textbox').first();
    await phoneInput.clear();
    await page.waitForTimeout(2000);
    await phoneInput.fill(countrycode + "123456");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator('#login-password')).not.toBeVisible();
    console.log("Login with incorrect number worked");
})

test("Login with Correct phone number and incorrect Password", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.getByRole('tab', { name: 'Login with Phone' }).click();
    const phoneInput = page.getByRole('textbox').first();
    await phoneInput.clear();
    await phoneInput.fill(countrycode + correctPhoneNumber);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator("#login-password").fill("abcdef");
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page.locator("div.m_3feedf16").last()).toBeVisible();
    const error_message = (await page.locator("div.m_3feedf16").last().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Password is incorrect");
    console.log("Login with correct phone number and incorrect password worked");
})

test("Login with phone number and case sensitive password", async ({ page }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.getByRole('tab', { name: 'Login with Phone' }).click();
    const phoneInput = page.getByRole('textbox').first();
    await phoneInput.clear();
    await phoneInput.fill(countrycode + correctPhoneNumber);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator("#login-password").fill("OSLO@123");
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page.locator("div.m_3feedf16").last()).toBeVisible();
    const error_message = (await page.locator("div.m_3feedf16").last().textContent()).trim();
    console.log(error_message);
    await expect(page.getByText(error_message)).toHaveText("Password is incorrect");
    console.log("Login with phone number adn case sensetive password worked");
})