const { test, expect } = require('@playwright/test');
let LoginId = 'agent12new@yopmail.com';
let LoginPassword = 'password';

let user_name = "John";
let user_email = "john41@yopmail.com";
let user_phone = "141";
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


test("Agent Login Flow", async ({ page }) => {
    await page.goto('https://testing-app.firmli.ai');
    await page.locator('#login-email').fill(LoginId);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill(LoginPassword);
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page).toHaveTitle('Firmli');


    // ================= GET LEAD STAGES =================

    await page.locator('a').filter({ hasText: 'Konnectli' }).click();

    await page.goto('https://testing-app.firmli.ai/master-copy');

    await page.getByText('Timeline').first().click();

    const row = page.locator('tbody tr', { hasText: lead_Timeline_Stage_Name });

    await row.getByText('Assign Stages').click();

    const stagesLocator = page.locator("//span[@class='m_1e0e6180 mantine-Pill-label']");

    await expect(stagesLocator.first()).toBeVisible();

    const Lead_Stages = await stagesLocator.allTextContents();

    await page.goBack();

    // ================= CREATE LEAD =================

    await page.locator('a').filter({ hasText: 'Konnectli' }).click();

    await page.locator("//span[text()='Create Lead']").click();

    await page.getByPlaceholder("Enter First Name").fill(user_name);

    await page.getByPlaceholder("Enter Email").fill(user_email);

    const phoneInput = page.locator("input.form-control").first();

    await phoneInput.fill(user_phone);

    await page.locator("//input[@data-path='nearest_branch']").click();

    await page.getByRole('option', { name: user_branch }).click();

    await page.locator("//input[@data-path='destination_country']").click();

    await page.keyboard.type(destination_country);

    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");

    await page.keyboard.press("Enter");

    await page.locator("input[data-path='intake']").click();

    await page.getByRole('option', { name: month }).click();

    await page.locator("input[data-path='intake_year']").click();

    await page.getByRole('option', { name: year }).click();

    const programSelect = page.getByRole('textbox', { name: 'Which program are you looking for?' });

    await programSelect.fill(which_program_are_you_looking_for);

    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');

    const educationalBackground = page.getByRole('textbox', { name: 'Educational Background' });

    await educationalBackground.click();

    await page.getByRole('option', { name: educational_background }).click();

    await page.getByRole('textbox', { name: 'Academic Score 10th' }).fill(score_10th);

    await page.getByRole('textbox', { name: 'Academic Score 12th' }).fill(score_12th);

    await page.getByRole('textbox', { name: 'Academic Score Graduation' }).fill(score_graduate);

    await page.getByRole('textbox', { name: 'Academic Score Post Graduation' }).fill(score_post_graduation);

    await page.getByRole('textbox', { name: 'English Test Given' }).click();

    await page.getByRole('option', { name: English_Test_Given }).click();

    await page.getByRole('textbox', { name: 'UTM Source' }).click();

    await page.getByRole('option', { name: UTM_Source }).click();

    await page.getByRole('textbox', { name: 'UTM Medium' }).click();

    await page.getByRole('option', { name: UTM_Medium }).click();

    await page.getByRole('button', { name: 'Submit' }).click();

    await page.waitForURL(/leads/);

    // ================= UPDATE LEAD STAGES =================

    const searchInput = page.getByPlaceholder('search').first();

    await searchInput.fill(user_email);

    await page.locator("//span[@class= 'm_8d3afb97 mantine-ActionIcon-icon']").first().click();

    for (let i = 0; i < Lead_Stages.length - 1; i++) {

        const stageBadge = page.locator('//*[@id="root"]/div/main/div/div/div[2]/div/div/div[1]/div[2]/div/span[2]');

        await expect(stageBadge).toContainText(Lead_Stages[i]);

        await stageBadge.click();

        const modal = page.getByRole('dialog', { name: /update lead status/i });

        await expect(modal).toBeVisible();

        await modal.locator('input[data-path="stage_id"]').click();

        await page.getByRole('option', { name: Lead_Stages[i + 1] }).click();

        await page.getByRole('button', { name: /submit/i }).last().click();

        await expect(page.getByText("Lead status updated successfully")).toBeVisible();
    }
    //Application Form to be visible
    await expect(page.getByText("Create Application")).toBeVisible();


    // ================= CREATE APPLICATION =================

    await page.locator("input[data-path='destination_country_id']").click();

    await page.keyboard.type(destination_country);

    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");

    await page.keyboard.press("Enter");

    const fields = [
        "institution_id",
        "campus_id",
        "study_level_id",
        "preferred_program_id"
    ];

    for (const field of fields) {

        await page.locator(`//input[@data-path='${field}']`).click();

        await expect(page.getByRole('option').first()).toBeVisible();

        await page.keyboard.press("ArrowDown");

        await page.keyboard.press("Enter");
    }

    await page.locator("input[data-path='intake_id']").click();

    await page.getByRole('option', { name: month }).click();

    await page.locator("input[data-path='intake_year']").click();

    await page.getByRole('option', { name: year }).click();
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: /submit/i }).last().click();
    await page.waitForTimeout(1000);

    // ================= APPLICATION STAGES =================

    await page.goto('https://testing-app.firmli.ai/master-copy');

    await page.getByText('Timeline').first().click();

    const row1 = page.locator('tbody tr', { hasText: application_Timeline_Stage_Name });

    await row1.getByText('Assign Stages').click();

    const stagesLocator1 = page.locator("//span[@class='m_1e0e6180 mantine-Pill-label']");

    await expect(stagesLocator1.first()).toBeVisible();

    const Application_Stages = await stagesLocator1.allTextContents();

    await page.goBack();

    await page.locator('a').filter({ hasText: 'Enrolli' }).click();
    await page.waitForTimeout(1000);

    const searchInput1 = page.getByPlaceholder('search').first();

    await searchInput1.pressSequentially(user_email, { delay: 100 });

    await page.locator("//span[@class= 'm_8d3afb97 mantine-ActionIcon-icon']").first().click();

    for (let app = 0; app < Application_Stages.length; app++) {

        const application_status = page.locator("//*[@id='enrolli-card-open-app-status-modal-btn']");

        await application_status.click();

        await page.getByPlaceholder('Please select status').click();

        await page.getByRole('option', { name: Application_Stages[app], exact: true }).click();

        const subStatus = page.getByPlaceholder('Please select sub status');
        await page.waitForTimeout(1000);


        if (await subStatus.count() > 0) {
            await expect(subStatus).toBeVisible();

            await subStatus.click();

            await page.keyboard.press('ArrowDown');

            await page.keyboard.press('Enter');
        }

        await page.getByRole('button', { name: /submit/i }).last().click();

        // ===== REMINDER (NO HARD WAIT) =====

        const date_picker = page.locator("//button[@id ='enrolli-reminder-card-create-datetimepckr-scheduleat-inpt']");
        await page.waitForTimeout(1000);

        if (await date_picker.count() > 0) {

            await expect(date_picker).toBeVisible();

            await date_picker.click();

            const calendarHeader = page.locator("//button[contains(@class,'mantine-DateTimePicker-calendarHeaderLevel')]");

            await expect(calendarHeader.first()).toBeVisible();

            await calendarHeader.first().click();

            await calendarHeader.first().click();

            await page.getByText(reminderYear).last().click();

            await page.getByText(reminderMonth).last().click();

            await page.getByText(reminderDate).last().click();

            await page.locator("//button[contains(@class,'mantine-DateTimePicker-submitButton')]").click();

            await page.locator('#enrolli-reminder-card-create-text-note-inpt').fill('Reminder Note');

            await page.getByRole('button', { name: 'Set reminder' }).click();
        }
    }
})