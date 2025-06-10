Feature: Login page

    Scenario: User can log in with valid credentials
        Given I am on the login page
        When I enter a valid username admin2025 and password admin123
        And I click the login button
        Then I should be redirected to the dashboard page