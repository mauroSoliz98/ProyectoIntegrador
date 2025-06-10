Feature: Agregar nuevo punto de interés en el mapa
  Como usuario del sistema
  Quiero poder agregar nuevos puntos de interés en el mapa
  Para reportar incidentes o desastres naturales

  Background:
    Given que estoy en la página del mapa
    And el mapa está completamente cargado

  Scenario: Agregar un punto de interés exitosamente
    When hago click en una ubicación del mapa
    Then se debe abrir el drawer de "Añadir punto de interés"
    And debo ver las coordenadas de la ubicación seleccionada
    When selecciono "Incendio" como tipo de desastre
    And selecciono "alto" como severidad
    And ingreso "Calle Falsa 123" en el campo de dirección
    And ingreso "Incendio en edificio residencial" en la descripción
    And hago click en el botón "Guardar"
    Then debo ver un mensaje de éxito "Punto de interés añadido exitosamente"
    And el drawer se debe cerrar
    And debo ver el nuevo punto marcado en el mapa

  Scenario: Intentar guardar sin completar campos requeridos
    When hago click en una ubicación del mapa
    Then se debe abrir el drawer de "Añadir punto de interés"
    When dejo vacío el campo de descripción
    And hago click en el botón "Guardar"
    Then debo ver un mensaje de error "Por favor, complete todos los datos requeridos del formulario"
    And el drawer debe permanecer abierto

  Scenario: Cancelar la creación de un punto
    When hago click en una ubicación del mapa
    Then se debe abrir el drawer de "Añadir punto de interés"
    When lleno todos los campos requeridos
    And hago click en el botón "Cancelar"
    Then el drawer se debe cerrar
    And no se debe agregar ningún punto al mapa

  Scenario: Agregar punto con diferentes tipos de desastres
    When hago click en una ubicación del mapa
    Then se debe abrir el drawer de "Añadir punto de interés"
    When selecciono "Inundación" como tipo de desastre
    And selecciono "medio" como severidad
    And ingreso "Av. Principal 456" en el campo de dirección
    And ingreso "Inundación por desborde de río" en la descripción
    And hago click en el botón "Guardar"
    Then debo ver un mensaje de éxito "Punto de interés añadido exitosamente"
    And el nuevo punto debe tener un icono de inundación

  Scenario: Validar que el formulario se resetea después de guardar
    When hago click en una ubicación del mapa
    And completo el formulario con datos válidos
    And hago click en el botón "Guardar"
    Then el formulario se debe resetear a valores por defecto
    When hago click en otra ubicación del mapa
    Then el formulario debe estar limpio con valores por defecto