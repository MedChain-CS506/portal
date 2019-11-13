describe('PatientForm test', function() {
    it('tests that PatientForm contains correct items', function() {
      cy.visit("http://localhost:3000/patient-form")
      cy.get("#aadhar")
      cy.get("#first-name")
      cy.get("#last-name")
      cy.get("#sex")
      cy.get("#weight")
      cy.get("#date-of-birth")
      cy.get("#notes")
    //   cy.get("#submit-buttton")
    })
  })