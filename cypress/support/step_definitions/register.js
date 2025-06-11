import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background Steps
Given('que estoy en la página de registro', () => {
  cy.visit('/register') // Ajusta la ruta según tu aplicación
})

// When Steps
When('completo el campo {string} con {string}', (campo, valor) => {
  const fieldMap = {
    'Nombre': 'name',
    'Username': 'username',
    'E-mail': 'email',
    'Pais': 'country',
    'Contraseña': 'password',
    'Confirme contraseña': 'passwordConfirm'
  }
  
  const fieldName = fieldMap[campo]
  if (fieldName) {
    cy.get(`input[name="${fieldName}"]`)
      .should('be.visible')
      .clear()
      .type(valor)
  }
})

When('acepto los términos y condiciones', () => {
  cy.get('input[type="checkbox"]').check()
})

When('hago click en el botón de registro {string}', (textoBoton) => {
  cy.contains('button', textoBoton).click()
})

// Then Steps
Then('debo ver un mensaje de éxito {string}', (mensaje) => {
  cy.get('.Toastify__toast--success', { timeout: 5000 })
    .should('be.visible')
    .and('contain.text', mensaje)
})

Then('debo ser redirigido a la página de login', () => {
  cy.url().should('include', '/login')
})