import * as _ from 'lodash';
import * as postingJsonFile from '../fixtures/posting.json';

// --------- intercepts the api calls ------------//

// All posting data
export function interceptPostingData(countryParam?: string, departmentParam?: string): void {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings?country=${countryParam}&department=${departmentParam}`,
    },
    { fixture: 'posting.json' }
  ).as('getPosting');
}

export const awaitGetPostingResponse = () => cy.wait('@getPosting');

// DE country posting data
export function interceptPostingDEData(countryParam?: string, departmentParam?: string): void {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings?country=${countryParam}&department=${departmentParam}`,
    },
    { fixture: 'postingDE.json' }
  ).as('getPostingDE');
}

export const awaitGetPostingDEResponse = () => cy.wait('@getPostingDE');

// Engineering department posting data
export function interceptPostingENGData(countryParam?: string, departmentParam?: number): void {
  console.log('eng request called');
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings?country=${countryParam}&department=${departmentParam}`,
    },
    { fixture: 'postingENG.json' }
  ).as('getPostingENG');
}

export const awaitGetPostingENGResponse = () => cy.wait('@getPostingENG');

// De country & Engineering department posting data
export function interceptPostingDEENGData(countryParam?: string, departmentParam?: number): void {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings?country=${countryParam}&department=${departmentParam}`,
    },
    { fixture: 'postingDEENG.json' }
  ).as('getPostingDEENG');
}

export const awaitGetPostingDEENGResponse = () => cy.wait('@getPostingDEENG');

export function interceptDepartmentData(): void {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://api.smartrecruiters.com/v1/companies/smartrecruiters/departments',
    },
    { fixture: 'department.json' }
  ).as('getDepartment');
}

export const awaitGetDepartmentResponse = () => cy.wait('@getDepartment');

export function interceptCountryData(): void {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://restcountries.eu/rest/v2/all',
    },
    { fixture: 'country.json' }
  ).as('getCountry');
}

export const awaitGetCountryResponse = () => cy.wait('@getCountry');

export function interceptPostingDescriptionData1(): void {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings/743999746008472`,
    },
    { fixture: 'description1.json' }
  ).as('getPostingDescription1');
}

export const awaitGetPostingDescriptionResponse1 = () => cy.wait('@getPostingDescription1');

export function interceptPostingDescriptionData2(): void {
  cy.intercept(
    {
      method: 'GET',
      url: `https://api.smartrecruiters.com/v1/companies/smartrecruiters/postings/743999745657941`,
    },
    { fixture: 'description2.json' }
  ).as('getPostingDescription2');
}

export const awaitGetPostingDescriptionResponse2 = () => cy.wait('@getPostingDescription2');

// ------- elements of posting list page --------
export const countrySelectELement = () => cy.get('[data-cy=country-select]');
export const departmentSelectELement = () => cy.get('[data-cy=department-select]');
export const postingListELement = () => cy.get('[data-cy=posting-list]');
export const listItemELement = () => cy.get('[data-cy=list-item]');

// Elements of posting description
export const backButtonELement = () => cy.get('[data-cy=back-button]');
export const positionNameELement = () => cy.get('[data-cy=position-name]');
export const positionLocationELement = () => cy.get('[data-cy=position-location]');
export const jobDescriptionELement = () => cy.get('[data-cy=job-description]');
export const jobQualificationELement = () => cy.get('[data-cy=job-qualification]');

// -------- helper functions ---------------
export function getCountryPostingData(countryCode: string) {
  return _.filter(postingJsonFile.content, (postingList) => postingList.location.country === countryCode);
}

export function getDepartmentPostingData(department: string) {
  return _.filter(postingJsonFile.content, (postingList) => postingList.department.label === department);
}

export function getDEPostingData(countryCode: string, department: string) {
  return _.filter(
    postingJsonFile.content,
    (postingList) => postingList.location.country === countryCode && postingList.department.label === department
  );
}
