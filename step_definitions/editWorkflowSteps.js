import {Given} from 'cucumber'
import EditWorkflow from './../page-objects/editWorkflow.page'
import Dashboard from './../page-objects/dashboard.page'

Given(/^I close the Edit Workflow section$/, () => {
    const editWorkflow = new EditWorkflow()
    editWorkflow.closeSection()
    return new Dashboard()
})
