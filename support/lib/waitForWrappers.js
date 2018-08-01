export const waitForElementToBeVisible = (selector) =>
    browser.waitUntil(
        () => browser.isVisible(selector),
        browser.options.waitforTimeout,
        `Expected the element with selector <${selector}> to become visible within ${browser
            .options.waitforTimeout / 1000} seconds.`
    )

export const waitForPartialUrl = (urlSegment) =>
    browser.waitUntil(
        () => browser.getUrl().includes(urlSegment),
        browser.options.waitforTimeout,
        `Expected the current url to contain <${urlSegment}>. Instead the current url is <${browser.getUrl()}> after ${browser
            .options.waitforTimeout / 1000} seconds.`
    )

export const waitForElementToBeInvisible = (selector) => {
    browser.waitUntil(
        () => !browser.isVisible(selector),
        browser.options.waitforTimeout,
        `Expected the element with selector <${selector}> to disappear within ${browser
            .options.waitforTimeout / 1000} seconds.`
    )
}
