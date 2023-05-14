describe('Project starts', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('This is test task')
    cy.contains('Calculate the sum')
  })
})
