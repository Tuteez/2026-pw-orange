export class Dashboard {
    constructor(page) {
        this.page = page;
        this.dashboardActiveMenuItem = page.locator('.oxd-main-menu-item.active', { hasText: 'Dashboard' }  );
    }

}