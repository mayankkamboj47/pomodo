const puppeteer = require('puppeteer');
const { expect } = require('chai');


describe('clock', function () {
    this.timeout(10000);
    // expose variables
    let browser;
    let page;
    before(async function () {
        browser = await puppeteer.launch({ headless: false, timeout: 10000});
        page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 500,
            deviceScaleFactor: 1,
        });
        await page.goto('http://localhost:3000')
    });

    beforeEach(async function(){
        await page.evaluate(()=>localStorage.clear())
        await page.reload();
        let task = await page.waitForSelector('.task')
        await task.click();
    });

    it('On clicking play, the pauseButton text changes to "Pause"', async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        await pauseButton.click()
        let pauseButtonText = await page.evaluate(el => el.textContent, pauseButton)
        expect(pauseButtonText).to.equal('Pause')
    });
    it('On clicking pause, the pauseButton text changes to "Play"', async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        await pauseButton.click()
        await pauseButton.click()
        let pauseButtonText = await page.evaluate(el => el.textContent, pauseButton)
        expect(pauseButtonText).to.equal('Play')
    });
    it('On clicking play, the input vanishes', async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        await pauseButton.click()
        // assert taht input doesn't exist
        let timeInputEl = await page.$('[data-testid="clock-time-input"]')
        expect(timeInputEl).to.equal(null)
    });
    it('On clicking play, an element with testid "time" appears', async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        await pauseButton.click()
        // assert taht input doesn't exist
        let timeEl = await page.$('[data-testid="time"]')
        expect(timeEl).to.not.equal(null)
    });
    it("On clicking play, the clock starts ticking", async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        await pauseButton.click()
        let timeEl = await page.waitForSelector('[data-testid="time"]')
        let time = await page.evaluate(el => el.textContent, timeEl)
        await page.waitForTimeout(1001)
        let time2 = await page.evaluate(el => el.textContent, timeEl)
        expect(time).to.not.equal(time2)
    });
    it("On clicking pause, the clock stops ticking", async function () {
        let pauseButton = await page.waitForSelector('[data-testid="pauseplay"]')
        await pauseButton.click()
        await pauseButton.click()
        let timeEl = await page.waitForSelector('[data-testid="time"]')
        let time = await page.evaluate(el => el.textContent, timeEl)
        await page.waitForTimeout(1001)
        let time2 = await page.evaluate(el => el.textContent, timeEl)
        expect(time).to.equal(time2)
    });
    // close browser
    after(function () {
        browser.close();
    });
});


