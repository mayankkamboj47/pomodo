const puppeteer = require('puppeteer');
const { expect } = require('chai');


describe('task', function () {
    this.timeout(10000);
    // expose variables
    let browser;
    let page;
    let task;
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

    it('There is a default task with given content', async function () {
        let content="You can add Markdown to your tasks"
        let task = await page.$(`::-p-text(${content})`)
        expect(task).to.not.equal(null)
    });

    it('Clicking a task selects it', async function () {
        let task = await page.waitForSelector('[data-testid="task1"]')
        await task.click()
        // expect task to have class selected. use classList
        let selected = await page.evaluate(el => el.classList.contains('selected'), task)
        expect(selected).to.equal(true)
    });
    
    it('Clicking a task selects it and deselects the previous task', async function () {
        let task1 = await page.waitForSelector('[data-testid="task1"]')
        let task2 = await page.waitForSelector('[data-testid="task2"]')
        await task1.click()
        await task2.click()
        // expect task to have class selected. use classList
        let selected1 = await page.evaluate(el => el.classList.contains('selected'), task1)
        let selected2 = await page.evaluate(el => el.classList.contains('selected'), task2)
        expect(selected1).to.equal(false)
        expect(selected2).to.equal(true)
    });

    it('double clicking a task makes it editable', async function () {
        let task = await page.waitForSelector('[data-testid="task1"] [data-testid="task-value"]')
        await task.click({clickCount: 2})
        let input = await page.waitForSelector('[data-testid="task-edit"]')
        expect(input).to.not.equal(null)
    });

    it('editing a task to "hello world" works', async function () {
        let task = await page.waitForSelector('[data-testid="task1"] [data-testid="task-value"]')
        await task.click({clickCount: 2})
        let input = await page.waitForSelector('[data-testid="task-edit"]')
        // clear the input
        await input.click({clickCount: 3})
        await input.type('hello world')
        // blur the input
        await page.keyboard.press('Tab')
        let taskValue = await page.waitForSelector('[data-testid="task1"] [data-testid="task-value"]')
        let value = await page.evaluate(el => el.textContent, taskValue)
        expect(value).to.equal('hello world')
    });

    it('editing a task to "# hello world" adds a h1', async function () {
        let task = await page.waitForSelector('[data-testid="task1"] [data-testid="task-value"]')
        await task.click({clickCount: 2})
        let input = await page.waitForSelector('[data-testid="task-edit"]')
        // clear the input
        await input.click({clickCount: 3})
        await page.keyboard.press('Backspace')
        await input.type('# hello world')
        // blur the input
        await page.keyboard.press('Tab')
        let taskValue = await page.waitForSelector('[data-testid="task1"] [data-testid="task-value"]')
        let value = await page.evaluate(el => el.innerHTML, taskValue)
        expect(value).to.equal('<h1 id="hello-world">hello world</h1>')
    });

    it('delete button deletes a task', async function () {
        let deleteButton = await page.waitForSelector('[data-testid="task1"] [data-testid="task-delete"]')
        await deleteButton.click()
        let task1 = await page.$('[data-testid="task1"]')
        expect(task1).to.equal(null)
    });
    
    it('add button adds a task', async function () {
        let addButton = await page.waitForSelector('[data-testid="add-task"]')
        let totalTasks = await page.evaluate(()=>document.querySelectorAll('.task').length)
        await addButton.click()
        let newTotalTasks = await page.evaluate(()=>document.querySelectorAll('.task').length)
        expect(newTotalTasks).to.equal(totalTasks+1)
    });
    // close browser
    after(function () {
        browser.close();
    });
});


