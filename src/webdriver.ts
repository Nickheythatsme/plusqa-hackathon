import puppeteer from 'puppeteer';

export interface WebdriverOptions extends puppeteer.LaunchOptions {
    url?: string;
}

export default class Webdriver {
    public static async init(opts?: WebdriverOptions): Promise<Webdriver> {
        let browser = await puppeteer.launch({headless: false});
        let page = await browser.newPage();
        if (opts && opts.url) {
            await page.goto(opts.url);
        }
        return new Webdriver(browser, page);
    }

    private active = true;

    constructor(private browser: puppeteer.Browser, private page: puppeteer.Page) {
    }

    get activePage(): puppeteer.Page {
        if (!this.active) {
            throw 'Webdriver not active';
        }
        return this.page;
    }

    public async close() {
        this.active = false;
        await this.browser.close();
    }
}
