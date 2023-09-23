const puppeteer = require('puppeteer');
const { expect } = require('chai');


describe('clock', function () {
    this.timeout(10000);
    // expose variables
    let browser;
    let page;
    before(async function () {
        browser = await puppeteer.launch({ headless: false, timeout: 10000, slowMo: 100});
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
        let settingsButton = await page.waitForSelector('[data-testid="settingsButton"]')
        if(!settingsButton) return console.log('No settings button')
        settingsButton.click()
        let clearButton = await page.waitForSelector('::-p-text(Clear app data)')
        if(!clearButton) return console.log('No clear button')
        await clearButton.click()
    });

    it('clock status is "work"', async function () {
        let statusEl = await page.waitForSelector('[data-testid="clock-status"]')
        let status = await page.evaluate(el => el.textContent, statusEl)
        expect(status).to.equal('work')
    });
    it('clock is set to 25 min', async function () {
        let timeInputEl = await page.waitForSelector('[data-testid="clock-time-input"]')
        let time = await page.evaluate(el => el.value, timeInputEl)
        expect(time).to.equal('25')
    });
    it('Clock is paused', async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        let pauseButtonText = await page.evaluate(el => el.textContent, pauseButton)
        expect(pauseButtonText).to.equal('Play')
    });
    it('Clock input is enabled', async function () {
        let timeInputEl = await page.waitForSelector('[data-testid="clock-time-input"]')
        let timeInputEnabled = await page.evaluate(el => el.disabled, timeInputEl)
        expect(timeInputEnabled).to.equal(false)
    });
    it('Clock input doesn\'t go below 1', async function () {
        let timeInputEl = await page.waitForSelector('[data-testid="clock-time-input"]')
        await timeInputEl.click({clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.keyboard.press('1')
        // press down arrow and check if value is 1
        await page.keyboard.press('ArrowDown')
        let time = await page.evaluate(el => el.value, timeInputEl)
        expect(time).to.equal('01')
    });
    // close browser
    after(function () {
        browser.close();
    });
});


