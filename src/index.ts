import Webdriver from './webdriver';

Webdriver.init().then(async webdriver => {
    await webdriver.activePage.goto('https://google.com');
    await webdriver.close();
});