import {Given} from 'cucumber'
import routes from './../support/constants/routes'
import Login from './../page-objects/login.page'
import url from 'url'

Given(/^I am logged into the app$/, () => {
    browser.url(routes.login)
    const login = new Login({firstVisit: true})
    login.loginWithProfile('newUser')
})

Given(/^I start on the "(.*)"$/, (entryPage) => {
    if (url.parse(browser.getUrl()).pathname !== routes[entryPage]) {
        browser.url(routes[entryPage])
    }
})
