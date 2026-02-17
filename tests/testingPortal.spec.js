const { test, expect } = require('@playwright/test');

let user_name = "John";
let user_email = "john27@yopmail.com";
let user_phone = "127";
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
        hasText: lead_Timeline_Stage_Name
    });
    await row.getByText('Assign Stages').click();
    const stagesLocator = page.locator(
        "//span[@class='m_1e0e6180 mantine-Pill-label']"
    );
    await expect(stagesLocator.first()).toBeVisible();
    const Lead_Stages = await stagesLocator.allTextContents();
    console.log(Lead_Stages);
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await page.locator('a').filter({ hasText: 'Konnectli' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.locator("//span[text()='Create Lead']").click();
    await page.waitForLoadState('domcontentloaded');

    //user_name
    await page.getByPlaceholder("Enter First Name").fill(user_name);

    //user_email
    await page.getByPlaceholder("Enter Email").fill(user_email);

    //user_phone
    const phoneInput = page.locator("input.form-control").first();
    await phoneInput.click();
    await page.keyboard.type(user_phone, { delay: 100 });

    //nearest_branch
    await page.locator("//input[@data-path='nearest_branch']").click();
    // fill(user_branch);
    await page.getByRole('option', { name: user_branch }).click();


    //destination_country
    await page.locator("//input[@data-path='destination_country']").click();
    //Autoselection through dropdown
    await page.keyboard.type(destination_country, { delay: 100 });
    await page.keyboard.press("ArrowDown", { delay: 100 });
    await page.keyboard.press("Enter");
    //destination_country
    // await page.keyboard.type(destination_country, { delay: 100 });
    // await page.keyboard.press("ArrowDown", { delay: 100 });
    // await page.keyboard.press("Enter");


    //intake
    const intakeMonthInput = page.locator("input[data-path='intake']");
    await intakeMonthInput.click();
    await page.getByRole('option', { name: month }).click();


    //intake_year
    const intakeYearInput = page.locator("input[data-path='intake_year']");
    await intakeYearInput.click();
    await page.getByRole('option', { name: year }).click();


    //which_program_are_you_looking_for
    const programSelect = page.getByRole('textbox', {
        name: 'Which program are you looking for?'
    });
    await programSelect.focus();
    await page.keyboard.type(which_program_are_you_looking_for, { delay: 100 });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');


    //Educational Background
    const educationalBackground = page.getByRole('textbox', {
        name: 'Educational Background'
    });
    await educationalBackground.click();
    await page.getByRole('option', { name: educational_background }).click();
    // await educationalBackground.focus();
    // await page.keyboard.type(educational_background, { delay: 100 });
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');


    //10th Score
    await page.getByRole('textbox', {
        name: 'Academic Score 10th'
    }).click();
    await page.keyboard.type(score_10th);


    //12th Score
    await page.getByRole('textbox', {
        name: 'Academic Score 12th'
    }).click();
    await page.keyboard.type(score_12th);


    //Graduate Score
    await page.getByRole('textbox', {
        name: 'Academic Score Graduation'
    }).click();
    await page.keyboard.type(score_graduate);


    //PostGraduation Score
    await page.getByRole('textbox', {
        name: 'Academic Score Post Graduation'
    }).click();
    await page.keyboard.type(score_post_graduation);


    //English Test Given
    await page.getByRole('textbox', {
        name: 'English Test Given'
    }).click();
    await page.getByRole('option', { name: English_Test_Given }).click();


    //UTM Source
    await page.getByRole('textbox', {
        name: 'UTM Source'
    }).click();
    await page.getByRole('option', { name: UTM_Source }).click();

    //UTM Medium
    await page.getByRole('textbox', {
        name: 'UTM Medium'
    }).click();
    await page.getByRole('option', { name: UTM_Medium }).click();

    await page.waitForLoadState('domcontentloaded');

    //submit
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForURL(/leads/);
    console.log("Lead created successfully");
    await page.waitForLoadState('domcontentloaded');

    //changing stages after creating the lead
    const searchInput = page.getByPlaceholder('search').first();

    await searchInput.click();

    await page.waitForTimeout(1000);
    await searchInput.pressSequentially(user_email, { delay: 100 });
    await page.waitForTimeout(1000);
    await page.locator("//span[@class= 'm_8d3afb97 mantine-ActionIcon-icon']").first().click();

    for (let i = 0; i < Lead_Stages.length - 1; i++) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(Lead_Stages[i]);

        const stageBadge = page.locator(
            '//*[@id="root"]/div/main/div/div/div[2]/div/div/div[1]/div[2]/div/span[2]'
        );
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(await stageBadge.textContent());

        await expect(stageBadge).toContainText(Lead_Stages[i]);

        // Now safe to click
        await stageBadge.click();

        const modal = page.getByRole('dialog', { name: /update lead status/i });
        await expect(modal).toBeVisible();

        await modal.locator('input[data-path="stage_id"]').click();

        // Move to next stage
        await page.getByRole('option', {
            name: Lead_Stages[i + 1]
        }).click();

        await page.getByRole('button', { name: /submit/i }).last().click();

        await expect(
            page.getByText("Lead status updated successfully")
        ).toBeVisible();

        console.log(await page.getByText("Lead status updated successfully").textContent());
    }

    await expect(page.getByText("Create Application")).toBeVisible();


    // ================= destination_country =================
    await page.locator("//input[@data-path='destination_country_id']").click();

    await page.keyboard.type(destination_country);

    // wait until options load
    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");


    // ================= Institute =================
    await page.locator("//input[@data-path='institution_id']").click();

    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");


    // ================= Campus =================
    await page.locator("//input[@data-path='campus_id']").click();

    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");


    // ================= Study Level =================
    await page.locator("//input[@data-path='study_level_id']").click();

    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");


    // ================= Program =================
    await page.locator("input[data-path='preferred_program_id']").click();

    await expect(page.getByRole('option').first()).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");


    // ================= Intake Month =================
    const intakeMonthInput_Application = page.locator("input[data-path='intake_id']");
    await intakeMonthInput_Application.click();

    await expect(page.getByRole('option', { name: month })).toBeVisible();

    await page.getByRole('option', { name: month }).click();


    // ================= Intake Year =================
    const intakeYearInput_Application = page.locator("input[data-path='intake_year']");
    await intakeYearInput_Application.click();

    await expect(page.getByRole('option', { name: year })).toBeVisible();

    await page.getByRole('option', { name: year }).click();
    await page.waitForTimeout(1000);


    // ================= Submit =================
    await page.getByRole('button', { name: /submit/i }).last().click();
    await page.waitForTimeout(1000);


    console.log("Application created successfully");


    await page.goto('https://testing-app.firmli.ai/master-copy');
    
        await page.getByText('Timeline').first().click();
        const row1 = page.locator('tbody tr', {
            hasText: application_Timeline_Stage_Name
        });
        await row1.getByText('Assign Stages').click();
        const stagesLocator1 = page.locator(
            "//span[@class='m_1e0e6180 mantine-Pill-label']"
        );
        await expect(stagesLocator1.first()).toBeVisible();
        const Application_Stages = await stagesLocator1.allTextContents();
        console.log(Application_Stages);
    
        await page.goBack({ waitUntil: 'domcontentloaded' });
        await page.locator('a').filter({ hasText: 'Enrolli' }).click();
        await page.waitForLoadState('domcontentloaded');
    
        const searchInput1 = page.getByPlaceholder('search').first();
    
        await searchInput1.click();
    
        await page.waitForTimeout(1000);
        await searchInput1.pressSequentially(user_email, { delay: 100 });
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
            await page.waitForTimeout(1000);
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

})