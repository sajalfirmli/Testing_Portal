const { test, expect } = require('@playwright/test');

let agent_Timeline = "Agent Timeline";
let CompanyName = "Test Company";
let TotalEmployees = "10";
let AgentCountry = "Australia";
let AgentState = "Auckland";
let AgentCity = "Henderson";
let AgentAddress = "123 Main St";
let ContactPerson = "Test it"
let AgentDesignation = "Manager";
let AgentEmail = "test2@yopmail.com"
let AgentCountryCode = "+92"
let AgentPhone = "123451"
let AgentName = "Firmli"
let AgentLastName = "Agent"

test("agent creating flow", async ({ page }) => {
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
        hasText: agent_Timeline
    });
    await expect(row).toBeVisible();
    await row.getByText('Assign Stages').click();
    const stagesLocator = page.locator(
        "//span[@class='m_1e0e6180 mantine-Pill-label']"
    );
    await expect(stagesLocator.first()).toBeVisible();
    const Agent_Stages = await stagesLocator.allTextContents();
    console.log(Agent_Stages);

    await page.goBack();
    await page.locator('a').filter({ hasText: 'Agentli' }).click();
    await page.waitForTimeout(1000);

    await page.locator("//span[text()='Add Agent']").click();
    await page.getByPlaceholder("company_name").fill(CompanyName)
    await page.getByPlaceholder("no_of_employees").fill(TotalEmployees)

    let cntry = await page.getByPlaceholder("Select Country");
    await cntry.pressSequentially(AgentCountry, { delay: 100 });
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    let state = await page.getByPlaceholder("Select State");
    await state.pressSequentially(AgentState, { delay: 100 });
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    let city = await page.getByPlaceholder("Select City");
    await city.pressSequentially(AgentCity, { delay: 100 });
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await page.getByPlaceholder("address").fill(AgentAddress);
    await page.getByPlaceholder("contact_person").fill(ContactPerson);
    await page.getByPlaceholder("designation").fill(AgentDesignation);
    await page.getByPlaceholder("email").fill(AgentEmail);

    await page.locator('.selected-flag').click();

    await page.locator('.search-box').fill(AgentCountryCode);

    await page.locator(`//ul/li//span[text()="${AgentCountryCode}"]`).click();
    await page.getByPlaceholder("1 (702) 123-4567").fill(AgentPhone);
    await page.getByPlaceholder("Enter First Name").fill(AgentName);
    await page.getByPlaceholder("Enter Last Name").fill(AgentLastName);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder("Search Agents")
        .pressSequentially(AgentEmail);
    await page.locator("//span[@class='m_8d3afb97 mantine-ActionIcon-icon']").first().click();
    await page.waitForTimeout(1000);

    for (let i = 0; i < Agent_Stages.length - 1; i++) {
        if (Agent_Stages[i + 1] == "Onboarding Completed") {
            break;
        }
        else {
            const timelineStatus = page.locator("//*[@id='agent-undefined-status-update']/span/div/p")
            // await timelineStatus.click()
            expect(timelineStatus).toContainText(Agent_Stages[i]);
            await timelineStatus.click();
            await page.getByPlaceholder("Please select agent status").click();
            await page.getByRole("option", { name: Agent_Stages[i + 1] }).click();
            await page.getByRole("button", { name: "Submit" }).click();
            await expect(
                page.getByRole('alert').filter({ hasText: 'Status Changed Successfully!' }).first()
            ).toBeVisible();


            console.log(Agent_Stages[i]);
            console.log("////////////////////////////////////////////////////////////");
            console.log(Agent_Stages[i + 1]);
        }
    }

    await page.waitForTimeout(5000);


    await page.locator("//span[@class= 'm_104cd71f mantine-Avatar-placeholder']").click();
    await page.getByRole("button", { name: "Logout" }).click();
    await page.waitForURL(/login/);
})