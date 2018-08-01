import {
    waitForElementToBeVisible,
    waitForPartialUrl,
} from './../support/lib/waitForWrappers'
import routes from './../support/constants/routes'

export default class EditWorkflow {
    constructor() {
        this.waitForFullyLoaded()
    }

    // SELECTORS ***************************************************************
    get closeButton() {
        return 'a=Close'
    }

    // PAGE INTERACTIONS *******************************************************

    waitForFullyLoaded() {
        waitForPartialUrl(routes.editWorkflow)
        waitForElementToBeVisible(this.closeButton)
    }

    closeSection() {
        browser.click(this.closeButton)
    }
}
