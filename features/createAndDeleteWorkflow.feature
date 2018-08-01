Feature: Basic workflow creation and deletion from within the dashboard

    Background:
        Given I am logged into the app

    Scenario: Create a new workflow and delete it
        Given I start on the "dashboard"
        And I create a new workflow
        And I call this new workflow "Rick Schubert"
        And I close the Edit Workflow section
        And I see the workflow "Rick Schubert" in my dashboard
        When I choose to delete the workflow "Rick Schubert"
        And I confirm to be sure about the deletion
        Then the workflow "Rick Schubert" does not show in my dashboard
        And I can logout to land back on the Login page
