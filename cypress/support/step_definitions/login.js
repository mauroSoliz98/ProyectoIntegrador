import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("/"); // ajusta la URL si tu ruta de login es distinta
});

When(
  /^I enter a valid username (.+) and password (.+)$/,
  (username, password) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
  }
);

When("I click the login button", () => {
  cy.get('button[type="submit"]').click(); // ajusta el selector si es necesario
});

Then("I should be redirected to the dashboard page", () => {
  cy.url().should("include", "/home"); // ajusta según tu ruta real
  cy.contains("Home"); // opcional: verifica que el contenido esperado esté presente
});
