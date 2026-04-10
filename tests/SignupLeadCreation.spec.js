import { test, expect } from '@playwright/test';
// test.use({ browserName: 'firefox' });

let name = "Arjun";
let email = "arjun1@yopmail.com";
let countrycode = "91";
let correctPhoneNumber = "4323342";
let nearestBranch = "Chandigarh";
let destinationCountry = "Australia";
let month = "Feb";
let year = "2026";
let UTM_Source = "Google";
let UTM_Medium = "story";
let userCountry = "India";


test("Lead creation from register as Student Page", async ({ page, browserName }) => {
    await page.goto("https://testing-app.firmli.ai/");
    await page.getByRole('link', { name: 'Register as Student' }).click();
    await expect(page).toHaveURL(/landing-page/);

    if (browserName === "chromium") {
        await page.evaluate(() => {
            document.body.style.zoom = "0.8";
        });
    }

    //Name
    await page.getByPlaceholder("Enter First Name").fill(name);

    //Email
    await page.getByPlaceholder("Enter Email").fill(email);

    //Phone Number
    const phoneInput = page.getByPlaceholder('1 (702) 123-4567').first();
    await phoneInput.clear();
    await phoneInput.fill(countrycode + correctPhoneNumber);

    //Nearest Branch
    await page.locator("//input[@data-path='nearest_branch']").click();
    await page.getByRole('option', { name: nearestBranch }).click();

    //Destination Country
    await page.locator("//input[@data-path='destination_country']").click();
    await page.keyboard.type(destinationCountry);
    await expect(page.getByRole('option').first()).toBeVisible();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    //Intake month
    await page.locator("input[data-path='intake']").click();
    await page.getByRole('option', { name: month }).click();

    //Year
    await page.locator("input[data-path='intake_year']").click();
    await page.getByRole('option', { name: year }).click();

    //UTMSource
    await page.getByRole('textbox', { name: 'UTM Source' }).click();
    await page.getByRole('option', { name: UTM_Source }).click();

    //UTMMedium
    await page.getByRole('textbox', { name: 'UTM Medium' }).click();
    await page.getByRole('option', { name: UTM_Medium }).click();


    //Select country
    const countryInput = page.locator('input[placeholder*="Country"]');
    await countryInput.fill(userCountry);
    await page
        .getByRole('listbox')
        .getByRole('option', { name: userCountry, exact: true })
        .click();


    const submitBtn = page.getByRole('button', { name: 'Submit' });
    await submitBtn.click();
    await expect(page).toHaveURL(/landing-page/);
    await page.locator('#login-email').fill("firmli2026@yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill("Oslo@123");
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page).toHaveTitle('Firmli');
    await page.waitForLoadState('networkidle');
    if (page.locator("//h1[@class='m_8a5d1357 mantine-Title-root']").textContent() != "Leads") {
        await page.locator('a').filter({ hasText: 'Konnectli' }).click();
        await page.waitForLoadState('networkidle');
    }
    const searchInput = page.getByPlaceholder('Search');
    await page.waitForTimeout(2000);

    await searchInput.click();
    await searchInput.pressSequentially(email, { delay: 100 });
    await page.keyboard.press("Enter");

    // wait until only 1 card remains
    const cards = page.locator('.mantine-Card-root');
    await expect(cards).toHaveCount(1);

    const count = await cards.count();
    console.log(count);
    if (count == 1) {
        console.log("Lead is created successfully");
    }
    else {
        console.log("Lead is not created successfully");
    }
})