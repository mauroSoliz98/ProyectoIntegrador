Feature: Registro de usuario
  Como un nuevo usuario
  Quiero poder registrarme en la aplicación
  Para acceder al sistema SOS-friends

  Background:
    Given que estoy en la página de registro

  Scenario: Registro exitoso con datos válidos
    When completo el campo "Nombre" con "Juan Pérez"
    And completo el campo "Username" con "juanperez"
    And completo el campo "E-mail" con "juan@example.com"
    And completo el campo "Pais" con "Bolivia"
    And completo el campo "Contraseña" con "password123"
    And completo el campo "Confirme contraseña" con "password123"
    And acepto los términos y condiciones
    And hago click en el botón de registro "Registrarse"
    Then debo ver un mensaje de éxito "Usuario registrado exitosamente"
    And debo ser redirigido a la página de login