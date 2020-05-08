import Webdriver from './webdriver';

Webdriver.init({headless: false}).then(async webdriver => {
    await webdriver.activePage.goto('https://google.com');
    console.log('Page loaded');
    await webdriver.close();
});
