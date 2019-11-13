describe('Profile test', function() {
    it('tests that Profile contains correct fields', function() {
      cy.visit("http://localhost:3000/profile/age")
      cy.get("#aadhar").contains("Aadhar")
      cy.get("#date-of-birth").contains("Date of Birth")
      cy.get("#sex").contains("Sex")
      cy.get("#weight").contains("Weight")
      cy.get("#known-allergies").contains("Known Allergies")
      cy.get("#known-diseases").contains("Known Diseases")
      cy.get("#prescriptions").contains("Prescriptions")
      cy.get("#medical-files").contains("Medical Files")
    })
  })