import * as app from '../support/app.po';

it('Check title of the app', () => {
  cy.visit('/');
  app.appHeaderELement().contains('SmartRecruiters Postings List App');
});
