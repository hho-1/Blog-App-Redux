describe('register', () => {
  it('register test', () => {
    cy.visit("http://localhost:3000/");
    cy.url().should('include', '/')
  })
})