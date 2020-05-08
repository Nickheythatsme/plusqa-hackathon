import * as assert from 'assert';
import Webdriver from '../src/webdriver';

describe('The webdriver can be opened with various options', function() {
    this.timeout(10000);
    this.slow(5000);

    it('can open the webdriver', async function() {
        let webdriver = await Webdriver.init();
        assert.ok(webdriver.activePage);
        await webdriver.activePage.goto('https://google.com');
        webdriver.close();
    });

    it('can open the webdriver to a specific url', async () => {
        const TEST_URL = 'https://news.google.com';
        let webdriver = await Webdriver.init({url: TEST_URL});
        assert.ok(webdriver.activePage);
        webdriver.activePage.url().includes(TEST_URL);
        webdriver.close();
    });
});