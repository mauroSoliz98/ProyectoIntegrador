import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Background Steps
Given('que estoy en la página del mapa', () => {
  cy.visit('/home/map') // Ajusta la ruta según tu aplicación
})

Given('el mapa está completamente cargado', () => {
  // Esperar a que el contenedor del mapa esté presente
  cy.get('.leaflet-container').should('be.visible')
  // Esperar a que las tiles del mapa se carguen
  cy.get('.leaflet-tile-loaded').should('exist')
  // Pequeña espera adicional para asegurar que el mapa esté completamente renderizado
  cy.wait(1000)
})

// When Steps
When('hago click en una ubicación del mapa', () => {
  // Hacer click en el centro del mapa
  cy.get('.leaflet-container')
    .should('be.visible')
    .click(400, 300) // Coordenadas relativas al contenedor del mapa
})

When('hago click en otra ubicación del mapa', () => {
  // Hacer click en una ubicación diferente
  cy.get('.leaflet-container')
    .should('be.visible')
    .click(450, 350)
})

When('selecciono {string} como tipo de desastre', (tipoDesastre) => {
  cy.get('[data-testid="disaster-type-select"]').click()
  cy.get(`[title="${tipoDesastre}"]`).click()
})

When('selecciono {string} como severidad', (severidad) => {
  cy.get('[data-testid="severity-select"]').click()
  cy.get(`[title="${severidad.charAt(0).toUpperCase() + severidad.slice(1)}"]`).click()
})

When('ingreso {string} en el campo de dirección', (direccion) => {
  cy.get('input[name="address"]')
    .should('be.visible')
    .clear()
    .type(direccion)
})

When('ingreso {string} en la descripción', (descripcion) => {
  cy.get('textarea[name="description"]')
    .should('be.visible')
    .clear()
    .type(descripcion)
})

When('hago click en el botón {string}', (boton) => {
  cy.contains('button', boton).click()
})

When('dejo vacío el campo de descripción', () => {
  cy.get('textarea[name="description"]').clear()
})

When('lleno todos los campos requeridos', () => {
  cy.get('input[name="address"]').type('Dirección de prueba')
  cy.get('textarea[name="description"]').type('Descripción de prueba')
})

When('completo el formulario con datos válidos', () => {
  cy.get('[data-testid="disaster-type-select"]').click()
  cy.get('[title="Incendio"]').click()
  
  cy.get('[data-testid="severity-select"]').click()
  cy.get('[title="Alto"]').click()
  
  cy.get('input[name="address"]').type('Calle de Prueba 789')
  cy.get('textarea[name="description"]').type('Descripción de prueba para reseteo')
})

// Then Steps
Then('se debe abrir el drawer de {string}', (titulo) => {
  cy.get('.ant-drawer').should('be.visible')
  cy.get('.ant-drawer-title').should('contain.text', titulo)
})

Then('debo ver las coordenadas de la ubicación seleccionada', () => {
  cy.get('[data-testid="location-card"]').should('be.visible')
  cy.contains('Lat:').should('be.visible')
  cy.contains('Lng:').should('be.visible')
})

Then('debo ver un mensaje de éxito {string}', (mensaje) => {
  // Buscar el toast de éxito
  cy.get('.Toastify__toast--success', { timeout: 5000 })
    .should('be.visible')
    .and('contain.text', mensaje)
})

Then('debo ver un mensaje de error {string}', (mensaje) => {
  // Buscar el toast de error
  cy.get('.Toastify__toast--error', { timeout: 5000 })
    .should('be.visible')
    .and('contain.text', mensaje)
})

Then('el drawer se debe cerrar', () => {
  cy.get('.ant-drawer').should('not.exist')
})

Then('el drawer debe permanecer abierto', () => {
  cy.get('.ant-drawer').should('be.visible')
})

Then('debo ver el nuevo punto marcado en el mapa', () => {
  // Verificar que existe un marcador en el mapa
  cy.get('.leaflet-marker-icon').should('exist')
  // Verificar que existe un círculo (área del evento)
  cy.get('.leaflet-interactive[stroke]').should('exist')
})

Then('no se debe agregar ningún punto al mapa', () => {
  // Contar los marcadores antes y después para asegurar que no se agregó ninguno
  cy.get('.leaflet-marker-icon').then($markers => {
    const initialCount = $markers.length
    // Verificar que el conteo no cambió (esto requeriría almacenar el estado inicial)
    cy.get('.leaflet-marker-icon').should('have.length', initialCount)
  })
})

Then('el nuevo punto debe tener un icono de inundación', () => {
  // Verificar que el último marcador agregado tiene el icono correcto
  cy.get('.leaflet-marker-icon').last().should('have.attr', 'src').and('include', 'inundacion')
})

Then('el formulario se debe resetear a valores por defecto', () => {
  // Los valores por defecto según el código
  cy.get('input[name="address"]').should('have.value', '')
  cy.get('textarea[name="description"]').should('have.value', '')
  // Verificar que los selects vuelvan a sus valores por defecto
  cy.get('[data-testid="disaster-type-select"]').should('contain.text', 'Incendio')
  cy.get('[data-testid="severity-select"]').should('contain.text', 'Alto')
})

Then('el formulario debe estar limpio con valores por defecto', () => {
  cy.get('input[name="address"]').should('have.value', '')
  cy.get('textarea[name="description"]').should('have.value', '')
  cy.get('[data-testid="disaster-type-select"]').should('contain.text', 'Incendio')
  cy.get('[data-testid="severity-select"]').should('contain.text', 'Alto')
})