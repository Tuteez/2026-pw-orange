import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { Dashboard } from '../pages/Dashboard.page';

// TODO: get credentials from env
// TODO: try other assertions ways
// TODO: test data



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
  test('@smoke Successful login with valid credentials', async ({ page }) => {
    const dashboardPage = new Dashboard(page);

    const username = 'Admin';
    const password = 'admin123';

    await loginPage.login(username, password);

    await expect(dashboardPage.dashboardActiveMenuItem).toBeVisible({ timeout: 15000 });
  });

  // cia bus daugiau testu, kad isbandyti skirtingus techninius dalykus.
  // Patys testai gali but realiai nelabai naudingi

  // atiradus bugui, isjungiam testa, kol bugas bus istaisytas.
  // test.skip('TODO: unskip after bugfix #123 - Unsuccessful login with valid username and invalid password', async ({ page }) => {
  const credentialTestData = [
    { username: 'Admin', password: 'wrongpassword' },
    { username: 'WrongUsername', password: 'admin123' },
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
