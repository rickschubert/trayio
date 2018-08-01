import {Given, When, Then} from 'cucumber'
import Dashboard from './../page-objects/dashboard.page'

Given(/^I create a new workflow$/, () => {
    const dashboard = new Dashboard()
    dashboard.createNewWorkflow()
})

Given(/^I call this new workflow "(.*)"$/, (workflowName) => {
    const dashboard = new Dashboard()
    dashboard.giveTitleToWorkflowFromModal(workflowName)
})

Given(/^I see the workflow "(.*)" in my dashboard$/, (workflowName) => {
    const dashboard = new Dashboard()
    dashboard.verifyWorkflowExists(workflowName)
})

When(/^I choose to delete the workflow "(.*)"$/, (workflowTitle) => {
    const dashboard = new Dashboard()
    dashboard.deleteWorkflowWithName(workflowTitle)
})

When(/^I confirm to be sure about the deletion$/, () => {
    const dashboard = new Dashboard()
    dashboard.confirmDeletionOfWorkflow()
})

Then(/^the workflow "(.*)" does not show in my dashboard$/, (workflowName) => {
    const dashboard = new Dashboard()
    dashboard.verifyWorkflowDoesNotExist(workflowName)
})

Then(/^I can logout to land back on the Login page$/, () => {
    const dashboard = new Dashboard()
    dashboard.logout()
})
