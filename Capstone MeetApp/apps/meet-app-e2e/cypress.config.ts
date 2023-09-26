import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import '@cypress/webpack-preprocessor';
export default defineConfig({
  e2e: nxE2EPreset(__dirname),
  defaultCommandTimeout:11000
});

