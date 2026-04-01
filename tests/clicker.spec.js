import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Clicker task', () => {
    test('clickerTask', async ({ page }) => {
        const clicker = path.resolve(__dirname, '../clickerTask.html');
        await page.goto(`file://${clicker}`);

        // clickAllOuter()
        // TODO perkelti visus metodus i Clicker.page.js
        // TODO pataisyti paskutines eilutes clickus
        // TODO pradziai kai 4 row,
        // TODO poto patobulint kad veiktu su betkuriu row kiekiu, ir kad clickintu tik isorinius (first ir last) elementus
        // TODO parasyt aserta

        //  1 row
        const firstRow = page.locator('.row').first();
        const cells = firstRow.locator('.icon');
        const count = await cells.count();
        for (let i = 0; i < count; i++) {
            await cells.nth(i).click();
        }

        // 2 row - only outer (first and last)
        const secondRow = page.locator('.row').nth(1);
        const cells2 = secondRow.locator('.icon');
        await cells2.first().click();
        await cells2.last().click();

        // 3 row - only outer (first and last)
        const thirdRow = page.locator('.row').nth(2);
        const cells3 = thirdRow.locator('.icon');
        await cells3.first().click();
        await cells3.last().click();

        // 4 row - only outer (first and last)
        const targetGrid = page.locator('.mainGrid');
        const lastRow = targetGrid.locator('.row').last();
        const lastCells = lastRow.locator('.icon');

        for (const cell of await lastCells.all()) {
            await cell.click();
        }

        // TODO:assert alert text
        // page.once('dialog', async prompt => {
        //     expect(prompt.message()).toBe('Expected alert text');
        //     // await prompt.dismiss();
        //     await prompt.accept("5");
        // });


    });
});
