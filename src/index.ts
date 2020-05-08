import Webdriver from './webdriver';

interface Link {
    url: string,
    visited: boolean,
};

/**
 * Get all links from the page, return a list of dictionaries of links, each with a boolean indicating if it was visited
 * @param webdriver the active webdriver
 */
async function getLinks(webdriver: Webdriver): Promise<Array<Link>> {
    let links = await webdriver.activePage.$$eval('a[href]', elements =>
        elements.map(element => {
            return element.getAttribute('href');
    }));

    return <Array<Link>> links.map(link => {
        return {url: link, visited: false}
    });
}

function prependUrl(url: string): string {
    // TODO
    return '';
}

Webdriver.init({headless: false}).then(async webdriver => {
    await webdriver.activePage.goto('https://nodejs.org/api/debugger.html');
    // Additional code here
    let links = await getLinks(webdriver);
    links.forEach(link => {
        console.log('link: ', JSON.stringify(link));
    })
    await webdriver.close();
});
