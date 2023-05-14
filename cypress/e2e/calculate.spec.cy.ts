describe('Calculations', () => 
{
  it('Visits the initial project page', () => {
    cy.visit('/')
  })

  it('Page should not have history shown', () => {
    cy.visit('/')
    cy.contains('Calculations history').should('not.exist')
  })

  it('Type result and submit', () => {
    cy.visit('/')
    cy.submitResult(12)
    cy.submitResult(14)
    cy.submitResult(16)
    cy.submitResult(18)
    cy.submitResult(20)
  })

  it('Page should have history shown', () => {
    cy.visit('/')
    cy.get('input').clear().type('12').type('{enter}')
    cy.contains('Calculations history')
  })

  it('Page should change digits random numbers', () => {
    cy.visit('/')
    cy.generateRandomDigits()
    cy.submitResult(12)
    cy.generateRandomDigits()
    cy.submitResult(12)
    cy.generateRandomDigits()
    cy.submitResult(12)
    cy.generateRandomDigits()
    cy.submitResult(12)
    cy.generateRandomDigits()
    cy.submitResult(12)
  })
})
