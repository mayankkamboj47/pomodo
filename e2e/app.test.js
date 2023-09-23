const puppeteer = require('puppeteer');
const { expect } = require('chai');


describe('app', function () {
    this.timeout(10000);
    // expose variables
    let browser;
    let page;
    before(async function () {
        browser = await puppeteer.launch({ headless: false, timeout: 10000 });
        page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 500,
            deviceScaleFactor: 1,
        });
        await page.goto('http://localhost:3000')
        page.on('dialog', async dialog => {
            await dialog.accept();
            await page.waitForNavigation();
        })
        await page.waitForNavigation();
    })
    beforeEach(async function () {
        let settingsButton = await page.waitForSelector('[data-testid="settingsButton"]')
        settingsButton.click()
        let clearButton = await page.waitForSelector('::-p-text(Clear app data)')
        await clearButton.click()
    });

    it('page title should be \'Pomodo\'', async function () {
        console.log(await page.title());
        expect(await page.title()).to.eql('Pomodo')
    });
    // close browser
    after(function () {
        browser.close();
    });
});


