import {
    waitForElementToBeVisible,
    waitForElementToBeInvisible,
} from './../support/lib/waitForWrappers'
import Login from './login.page'

export default class Dashboard {
    constructor() {
        this.waitForFullyLoaded()
    }

    // SELECTORS ***************************************************************
    get recentActivityTitle() {
        return 'h2=Recent Activity'
    }
    get CreateNewWorkflowButton() {
        return 'a[href="/create"]'
    }
    get createWorkflowModal() {
        return 'div=Create Workflow'
    }
    get createWorkflowModalTitleInput() {
        return 'input[name="name"]'
    }
    get createWorkflowModalSubmitButton() {
        return 'div[title="Create"]'
    }
    get workflowTitle() {
        return 'header'
    }
    get deleteWorkflowModal() {
        return 'div=Delete Workflow?'
    }
    get deleteWorkflowModalSubmitButton() {
        return 'div[title="Yes"]'
    }
    get userOptions() {
        return '#userToggle'
    }
    get logoutButton() {
        return 'a[href="/logout"]'
    }
    get deletionSuccessPopup() {
        return 'p=Workflow successfully deleted'
    }
    getSelectorEditMenuOfWorkflow(workflowName) {
        return `//header[.="${workflowName}"]/parent::a/following-sibling::div`
    }
    getSelectorDeleteInEditMenuOfWorkflow(workflowName) {
        return `${this.getSelectorEditMenuOfWorkflow(
            workflowName
        )}//a[.="Delete"]`
    }

    // PAGE INTERACTIONS *******************************************************
    waitForFullyLoaded() {
        waitForElementToBeVisible(this.recentActivityTitle)
    }

    createNewWorkflow() {
        waitForElementToBeVisible(this.CreateNewWorkflowButton)
        browser.click(this.CreateNewWorkflowButton)
    }

    giveTitleToWorkflowFromModal(workflowTitle) {
        waitForElementToBeVisible(this.createWorkflowModal)
        browser.setValue(this.createWorkflowModalTitleInput, workflowTitle)
        browser.click(this.createWorkflowModalSubmitButton)
        waitForElementToBeInvisible(this.createWorkflowModal)
    }

    verifyWorkflowExists(workflowName) {
        waitForElementToBeVisible(`${this.workflowTitle}=${workflowName}`)
    }

    verifyWorkflowDoesNotExist(workflowName) {
        waitForElementToBeInvisible(`${this.workflowTitle}=${workflowName}`)
    }

    deleteWorkflowWithName(workflowName) {
        const editButton = this.getSelectorEditMenuOfWorkflow(workflowName)
        const deleteButton = this.getSelectorDeleteInEditMenuOfWorkflow(
            workflowName
        )
        waitForElementToBeVisible(editButton)
        browser.click(editButton)
        waitForElementToBeVisible(deleteButton)
        browser.click(deleteButton)
    }

    confirmDeletionOfWorkflow() {
        waitForElementToBeVisible(this.deleteWorkflowModal)
        browser.click(this.deleteWorkflowModalSubmitButton)
        waitForElementToBeVisible(this.deletionSuccessPopup)
    }

    logout() {
        browser.click(this.userOptions)
        waitForElementToBeVisible(this.logoutButton)
        browser.click(this.logoutButton)
        return new Login()
    }
}
