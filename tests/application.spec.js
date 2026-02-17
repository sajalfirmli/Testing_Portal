const { test, expect } = require('@playwright/test');

let user_name = "John";
let user_email = "john10@yopmail.com";
let user_phone = "120";
let user_branch = "Chandigarh";
let destination_country = "Australia";
let month = "Feb";
let year = "2026";
let which_program_are_you_looking_for = "UG";
let educational_background = "Science and Engineering";
let score_10th = "90";
let score_12th = "70";
let score_graduate = "80";
let English_Test_Given = "PTE";
let score_post_graduation = "94";
let UTM_Source = "Google";
let UTM_Medium = "story";
let lead_Timeline_Stage_Name = "Lead Timeline";
let application_Timeline_Stage_Name = "Application Timeline";

let reminderYear = '2026';
let reminderMonth = 'Jun';
let reminderDate = '15';

test('Positive Flow', async ({ page }) => {
    await page.goto('https://testing-app.firmli.ai');
    await page.locator('#login-email').fill("firmli2026@yopmail.com");
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill("Oslo@123");
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page).toHaveTitle('Firmli');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('a').filter({ hasText: 'Konnectli' }).click();

    await page.goto('https://testing-app.firmli.ai/master-copy');

    await page.getByText('Timeline').first().click();
    const row = page.locator('tbody tr', {
        hasText: application_Timeline_Stage_Name
    });
    await row.getByText('Assign Stages').click();
    const stagesLocator = page.locator(
        "//span[@class='m_1e0e6180 mantine-Pill-label']"
    );
    await expect(stagesLocator.first()).toBeVisible();
    const Application_Stages = await stagesLocator.allTextContents();
    console.log(Application_Stages);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await page.locator('a').filter({ hasText: 'Enrolli' }).click();
    await page.waitForLoadState('domcontentloaded');

    const searchInput = page.getByPlaceholder('search').first();

    await searchInput.click();

    await page.waitForTimeout(1000);
    await searchInput.pressSequentially(user_email, { delay: 100 });
    await page.waitForTimeout(1000);
    await page.locator("//span[@class= 'm_8d3afb97 mantine-ActionIcon-icon']").first().click();

    for (let app = 0; app < Application_Stages.length; app++) {

        const application_status = page.locator(
            "//*[@id='enrolli-card-open-app-status-modal-btn']"
        );
        // click separately

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

        console.log(await application_status.textContent());


        await application_status.click();

        await page.getByPlaceholder('Please select status').click();
        await page.getByRole('option', { name: Application_Stages[app], exact: true }).click();
        await page.waitForTimeout(1000);

        const subStatus = page.getByPlaceholder('Please select sub status');

        if (await subStatus.count() > 0) {

            await subStatus.click();
            await page.waitForTimeout(1000);
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('Enter');
        }

        await page.getByRole('button', { name: /submit/i }).last().click();
        const date_picker = page.locator("//button[@id ='enrolli-reminder-card-create-datetimepckr-scheduleat-inpt']");
        if (await date_picker.count() > 0) {
            await date_picker.click();
            await page.locator("//button[@class='mantine-focus-auto m_f6645d97 mantine-DateTimePicker-calendarHeaderLevel m_87cf2631 mantine-UnstyledButton-root']").click();
            await page.locator("//button[@class='mantine-focus-auto m_f6645d97 mantine-DateTimePicker-calendarHeaderLevel m_87cf2631 mantine-UnstyledButton-root']").click();
            await page.getByText(reminderYear).last().click();
            await page.getByText(reminderMonth).last().click();
            await page.getByText(reminderDate).last().click();
            await page.locator
                ("//button[@class='mantine-focus-auto mantine-active mantine-DateTimePicker-submitButton m_8d3f4000 mantine-ActionIcon-root m_87cf2631 mantine-UnstyledButton-root']").click();

            await page.locator('#enrolli-reminder-card-create-text-note-inpt')
                .fill('Reminder Note');
            await page.getByRole('button', { name: 'Set reminder' }).click();
        }


        // await expect(application_status)
        //     .toContainText(Application_Stages[app]);
    }


});