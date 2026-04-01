import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { Dashboard } from '../pages/Dashboard.page';
import { userCredentials as td, user2 } from '../testData/user';
// impruoti viska is user.js:
// import * as allUserData from '../testData/user';

// DONE: get credentials from env
// 1. install dotenv package: npm install dotenv 
// 2. create a .env file in the root of your project
// 3. add your credentials to the .env file, e.g.:
//    ADMIN_USERNAME=your_username
// 4. load the .env file at the beginning of your playwright config file:
// import * as dotenv from 'dotenv';
//    require('dotenv').config();
// 5. use the credentials in your test: const username = process.env.ADMIN_USERNAME;
// .env file should be added to .gitignore, to avoid committing sensitive data to version control. 

// TODO: try other assertions ways

// Tagai: @zodis (ir npx playwright test --grep @zodis) - leidzia paleisti tik tuos testus, kurie turi nurodyta taga.
// arba kuri neturi tago: npx playwright test --grep-invert @zodis
// patogu naudot vietoje .only, .skip.

// test.only - paleis tik si testa, kiti bus ignoruojami. 
// Lokaliai naudoti ner prasmes, bet CI gali buti naudinga, kai norime testuoti tik viena scenariju, o ne visa login funkcionaluma.  

// describe (suite) - testu rinkiniai. grupuoja testus, gali buti nested (describe in describe).
test.describe('Login functionality', () => {
  let loginPage;
  // test.beforeEach - bus paleistas pries kiekviena test case. cia galime atidaryti pvz login page. 
  // nepamirstami inicijuoti loginPage, kad galetume ji naudoti testuose.
  // dar yra beforeAll, kuris bus paleistas tik vienas karta pries visus testus, bet musu atveju tai nebus geras pasirinkimas, nes kiekvienas testas turi buti nepriklausomas, o jei naudotume beforeAll, tai pirmame teste galetume prisijungti prie sistemos, o kituose testuose jau butume prisijunge, kas gali sukelti problemu, jei norime testuoti skirtingus scenarijus.
  // Priesingi afterEach ir afterAll, kurie bus paleisti po testu.
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });
  test('login test - hardcoded credentials', async ({ page }) => {
    const dashboardPage = new Dashboard(page);

    const username = 'Admin';
    const password = 'admin123';

    await loginPage.login(username, password);
    await expect(dashboardPage.dashboardActiveMenuItem).toBeVisible({ timeout: 15000 });
  });

  test('login test - env credentials', async ({ page }) => {
    const dashboardPage = new Dashboard(page);

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    await loginPage.login(username, password);
    await expect(dashboardPage.dashboardActiveMenuItem).toBeVisible({ timeout: 15000 });
  });

  test('login test - object credentials', async ({ page }) => {
    const dashboardPage = new Dashboard(page);

    const user = {
      username: "Admin",
      password: "admin123"
    };

    await loginPage.login(user.username, user.password);
    await expect(dashboardPage.dashboardActiveMenuItem).toBeVisible({ timeout: 15000 });
  });

  test('login test - object from other file', async ({ page }) => {
    const dashboardPage = new Dashboard(page);
    await loginPage.login(td.valid.username, td.valid.password);
    await expect(dashboardPage.dashboardActiveMenuItem).toBeVisible({ timeout: 15000 });
  });

  // cia bus daugiau testu, kad isbandyti skirtingus techninius dalykus.
  // Patys testai gali but realiai nelabai naudingi

  // atiradus bugui, isjungiam testa, kol bugas bus istaisytas.
  // test.skip('TODO: unskip after bugfix #123 - Unsuccessful login with valid username and invalid password', async ({ page }) => {
  const credentialTestData = [
    { username: 'Admin', password: 'wrongpassword' },
    { username: 'WrongUsername', password: 'admin123' },
    { username: td.invalid.username, password: td.invalid.password },
  ];
  credentialTestData.forEach(({ username, password }) => {
    test(`Unsuccessful login with username: ${username} and password: ${password}`, async ({ page }) => {
      await loginPage.login(username, password);
      // await expect(loginPage.errorMessage).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Login page UI elements', () => {
    let loginPage;
    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      await loginPage.open();
    });
    test('Forgot your password? link is visible on login page', async ({ page }) => {
      await expect(loginPage.forgotPasswordLink).toBeVisible();
    });
  });
});
