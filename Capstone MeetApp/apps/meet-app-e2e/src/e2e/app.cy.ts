import { getGreeting } from '../support/app.po';

describe('meet-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    //getGreeting().contains('WELCOME');
  });

 
});
describe('Bstackdemo', () => {
  it('should run lighthouse performance audits using default thresholds', () => {
  cy.visit('/');
  });
  });
