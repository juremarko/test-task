// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> 
  {
    submitResult(summedNumber: number): typeof submitResultCommand;
    generateRandomDigits(): typeof generateRandomDigitsCommand;
  }
}

function submitResultCommand(summedNumber: number): void {
    cy.get('input').clear().type(String(summedNumber)).type('{enter}')
}

function generateRandomDigitsCommand(): void {
    cy.get('button').click()
}

// NOTE: You can use it like so:
Cypress.Commands.add('submitResult', submitResultCommand);
Cypress.Commands.add('generateRandomDigits', generateRandomDigitsCommand);

//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
