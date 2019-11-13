describe('Navbar test', function() {
    it('tests that Navbar contains intended items', function() {
      cy.visit("http://localhost:3000/")
      cy.get("#title-link").contains("MedChain")
      cy.get("#theme-toggle")
      cy.get("#git-hub-link")
    })

    it('tests that Navbar title link works', function() {
        cy.visit("http://localhost:3000/patient-form")
        cy.get("#title-link").click()
        cy.url().should('eq', 'http://localhost:3000/') 
      })
  })