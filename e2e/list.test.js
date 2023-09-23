const puppeteer = require('puppeteer');
const { expect } = require('chai');


describe('list', function () {
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

    it('There is a default list with given content', async function () {
        let content="Doing"
        let task = await page.$(`::-p-text(${content})`)
        expect(task).to.not.equal(null)
    });

    it('Clicking the list title makes it editable', async function () {
        let listName = await page.waitForSelector('[data-testid="list1"] [data-testid="list-name"]')
        let content = await page.evaluate(el => el.textContent, listName)
        await listName.click({clickCount: 2})
        let input = await page.waitForSelector('[data-testid="listname-edit"]')
        expect(input).to.not.equal(null)
        let inputContent = await page.evaluate(el => el.value, input)
        expect(inputContent).to.equal(content)
    });

    it('Renaming list works successfully', async function () {
        let listName = await page.waitForSelector('[data-testid="list1"] [data-testid="list-name"]')
        await listName.click({clickCount: 2})
        let input = await page.waitForSelector('[data-testid="listname-edit"]')
        await input.click({clickCount: 3})
        await page.keyboard.press('Backspace')
        await input.type('New list name')
        await page.keyboard.press('Tab')
        let newName = await page.evaluate(() => {
            let listName = document.querySelector('[data-testid="list1"] [data-testid="list-name"]')
            return listName.innerText
        });
        expect(newName).to.equal('New list name')
    });

    it('Adding a new list works successfully', async function () {
        let addListButton = await page.waitForSelector('[data-testid="add-list"]')
        let listCount = await page.evaluate(()=>document.querySelectorAll('.list').length);
        await addListButton.click()
        await new Promise(resolve => setTimeout(resolve, 500));
        let newListCount = await page.evaluate(()=>document.querySelectorAll('.list').length);
        expect(newListCount).to.equal(listCount+1)
    });
    // close browser
    after(function () {
        browser.close();
    });
});


