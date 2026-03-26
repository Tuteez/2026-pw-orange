import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { Dashboard } from '../pages/Dashboard.page';

// TODO: get credentials from page
// TODO: more test cases for login page 
// TODO: move to describe
// TODO: add beforeEach to open login page
// TODO: parameterize test data for negative login test cases
// TODO: try only, skip. Fail
// TODO: try other assertions ways


test('Successful login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new Dashboard(page);

  const username = 'Admin';
  const password = 'admin123';

  await loginPage.open();
  await loginPage.login(username, password);

  await expect(dashboardPage.dashboardActiveMenuItem).toBeVisible({ timeout: 5000 });
});

// TODO: cia bus daugiau testu, kad isbandyti skirtingus techninius dalykus.
// Patys testai gali but realiai nelabai naudingi
// negative - valid username, invalid password
// negative - invalid username, valid password