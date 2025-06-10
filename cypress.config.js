// cypress.config.js
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
// Corrige la importación: usa { createEsbuildPlugin }
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    supportFile: false,
    stepDefinitions: [
      "cypress/support/step_definitions/**/*.js",
      "cypress/e2e/**/*.js"
    ],
    baseUrl: "http://localhost:5173",
    async setupNodeEvents(on, config) {
      // 1. Agrega el preprocesador de Cucumber
      await addCucumberPreprocessorPlugin(on, config);
      
      // 2. Configura el preprocesador de archivos con esbuild
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)], // Pasa la configuración
        })
      );
      
      return config;
    },
  },
});