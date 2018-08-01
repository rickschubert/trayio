import {waitForElementToBeVisible} from './../support/lib/waitForWrappers'
import {removeElementFromDom} from './../support/lib/shared'
import profiles from './../support/constants/profiles'
import Dashboard from './dashboard.page'

export default class Login {
    constructor({firstVisit} = {}) {
        this.waitForFullyLoaded()
        if (firstVisit) {
            waitForElementToBeVisible(this.cookieMessage)
            removeElementFromDom(this.cookieMessage)
        }
    }

    // SELECTORS ***************************************************************
    get emailInput() {
        return 'input[name="username"]'
    }
    get passwordInput() {
        return 'input[name="password"]'
    }
    get loginButton() {
        return 'button'
    }
    get cookieMessage() {
        return '#adroll_consent_banner'
    }

    // PAGE INTERACTIONS *******************************************************
    waitForFullyLoaded() {
        waitForElementToBeVisible(this.emailInput)
        waitForElementToBeVisible(this.loginButton)
    }

    loginWithProfile(profile) {
        browser.setValue(this.emailInput, profiles[profile].username)
        browser.setValue(this.passwordInput, profiles[profile].password)
        browser.click(this.loginButton)
        return new Dashboard()
    }
}
