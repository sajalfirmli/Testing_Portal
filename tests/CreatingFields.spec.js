const { test, expect } = require('@playwright/test');

// types= Text, Number, Email, Mobile, Textarea, Date, 
// Time, DateTime, File, Single Select, Multi Select, //Checkbox, //Radio


// API = Country (Number Only), Country (Text Only), Destination Countries, 
// Destination Countries (Text Only), State, State (Text Only), 
// City, City (Text Only), Campus, Campus By Institution, Programs By Campus,
// Study Levels By Institution Campus, Programs By Study Level, Students (Number Only)
// Study Level (Text Only), Study Level (Number Only), Discipline (Text Only)
// Intake Year, Intake, Intake (Number Only), Institutions, Institutions (Number Only), 
//Institutions By Country, Vendors (Number Only), Testscores (Text Only), Currencies, 
//Payment Gateways, Status, Code With Country Name, Mediums (Text Only), Mediums (Number Only),
// Sources (Text Only), Sources (Number Only), Lead Services

let url = 'https://testing-app.firmli.ai';
let emailId = 'firmli2026@yopmail.com';
let password = 'Oslo@123';
let fieldname = ' test field ';
let fieldtype = 'single select';
let fieldOption = 'Manual';
let API_name = 'Sources (Number Only)';
const labelAndFields = ["First Value",
    "Second Value",
    "1 1",
    "Test Option"]

test("Creating fields in master", async ({ page }) => {
    await page.goto(url);
    await page.locator('#login-email').fill(emailId);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#login-password').fill(password);
    await page.getByRole('button', { name: 'Signin' }).click();
    await expect(page).toHaveTitle('Firmli');
    await page.waitForLoadState('domcontentloaded');
    await page.locator('a').filter({ hasText: 'Konnectli' }).click();
    await page.goto(url + '/master/form/fields');
    await page.getByRole('button', { name: 'Create New Field' }).click();
    const formatted = fieldname
        .trim()
        .toLowerCase();

    await page.getByPlaceholder('Enter Field Name').fill(formatted);

    const field_label = fieldname
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());

    await page.getByPlaceholder('Enter Field Label').fill(field_label);

    await page.getByRole('textbox', { name: 'Placeholder' }).fill('Enter ' + field_label);



    // formating for field type
    function formatFieldLabel(text) {
        return text
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ")
            .replace(/\b\w/g, letter => letter.toUpperCase());
    }
    const formattedFieldType = formatFieldLabel(fieldtype);

    const fieldTypeInput = page.locator('input[placeholder*="Select field type"]');

    await fieldTypeInput.fill(formattedFieldType);

    await page
        .getByRole('listbox')
        .getByRole('option', { name: formattedFieldType, exact: true })
        .click();


    if (fieldtype == 'Email' || fieldtype == 'Mobile' || fieldtype == 'Number' || fieldtype == 'Text' || fieldtype == 'Textarea' || fieldtype == 'Date' || fieldtype == 'Time' || fieldtype == 'DateTime' || fieldtype == 'File') {
        console.log(fieldtype + "button selected");

        // await page.getByRole('button', { name: 'Save' }).click();
    }
    else {
        console.log(fieldtype + "button selected");
        await page.getByPlaceholder("Select Option Type").isVisible();
        await page.getByPlaceholder("Select Option Type").click();
        await page.getByRole('option', { name: fieldOption }).click();
        if (fieldOption == "API") {
            await page.getByPlaceholder("Select API").isVisible();
            await page.getByPlaceholder("Select API").click();
            await page.getByRole('option', { name: API_name, exact: true }).click();
            await page.getByRole('button', { name: 'Save' }).last().click();
        }

        //For manual fields
        else {


            function formatLabel(text) {
                return text
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .replace(/\b\w/g, c => c.toUpperCase());
            }

            function generateValue(text) {
                return text
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "_");
            }

            for (const label of labelAndFields) {

                // click every time (including first)
                await page.getByRole('button', { name: '+ Add More Options' }).click();

                const formattedLabel = formatLabel(label);
                const generatedValue = generateValue(label);

                const labelInputs = page.locator('input[placeholder="Please enter label"]');
                const valueInputs = page.locator('input[placeholder="Please enter value"]');

                await labelInputs.last().fill(formattedLabel);
                await valueInputs.last().fill(generatedValue);
            }

            await page.getByRole('button', { name: 'Save' }).last().click();
        }
        await page.pause();
        // await page.getByRole('button', { name: 'Save' }).click();
    }

})