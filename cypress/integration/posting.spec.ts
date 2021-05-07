import * as posting from '../support/posting.po';
import * as description1JsonFile from '../fixtures/description1.json';
import * as description2JsonFile from '../fixtures/description2.json';

const DE = 'de';
const ENGINEERINGCODE = 18571;
const ENGINEERING = 'Engineering';
const SELECTDE = 'Germany';
const SELECTALL = 'All';

describe('Posting list and desciption test', () => {
  beforeEach(() => {
    posting.interceptPostingData('', '');
    posting.interceptPostingDEData(DE, '');
    posting.interceptPostingENGData('', ENGINEERINGCODE);
    posting.interceptPostingDEENGData(DE, ENGINEERINGCODE);

    posting.interceptDepartmentData();
    posting.interceptCountryData();

    cy.visit('/');
  });

  describe('Test the posting page', () => {
    it('Check api of the posting list: Method GET', () => {
      posting.awaitGetPostingResponse().then((postings) => {
        expect((postings.response as any).statusCode).to.equal(200);
        expect(postings.response.body.content.length).to.not.equal(0);
      });
    });

    it('Check api of the department list: Method GET', () => {
      posting.awaitGetDepartmentResponse().then((departments) => {
        expect((departments.response as any).statusCode).to.equal(200);
        expect(departments.response.body.content.length).to.not.equal(0);
      });
    });

    it('Check api of the country list: Method GET', () => {
      posting.awaitGetCountryResponse().then((countries) => {
        expect((countries.response as any).statusCode).to.equal(200);
        expect(countries.response.body.length).to.not.equal(0);
      });
    });

    it('Check the select drop down, select option & lenght of the list', () => {
      let mockPostingDEList = posting.getCountryPostingData(DE);
      let mockPostingDepartmentList = posting.getDepartmentPostingData(ENGINEERING);
      let mockPostingList = posting.getDEPostingData(DE, ENGINEERING);

      // Check the country & department select drop down
      posting.awaitGetCountryResponse().then(() => {
        expect(posting.countrySelectELement).to.be.exist;
      });

      // Select one country from drop down & Check length of reponse length with mock data length
      posting.countrySelectELement().select(SELECTDE);
      posting.awaitGetPostingDEResponse();
      posting.postingListELement().should('have.length', mockPostingDEList.length);
      posting.countrySelectELement().select(SELECTALL);

      // Select one department from drop down & Check length of reponse length with mock data length
      posting
        .departmentSelectELement()
        .select(ENGINEERING)
        .then(() => {
          posting.awaitGetPostingENGResponse();
        });

      posting.postingListELement().should('have.length', mockPostingDepartmentList.length);
      posting.departmentSelectELement().select(SELECTALL);

      // Select one country & department from drop down & Check length of reponse length with mock data length
      posting.countrySelectELement().select(SELECTDE);
      posting.awaitGetPostingDEResponse();
      posting.postingListELement().should('have.length', mockPostingDEList.length);

      posting.departmentSelectELement().select(ENGINEERING);
      posting.awaitGetPostingDEENGResponse();
      posting.postingListELement().should('have.length', mockPostingList.length);
    });
  });

  describe('Test posting description', () => {
    beforeEach(() => {
      posting.interceptPostingDescriptionData1();
      posting.interceptPostingDescriptionData2();
    });

    it('Open description page on click of the item ', () => {
      posting.postingListELement().eq(0).click();
      posting.awaitGetPostingDescriptionResponse1().then((res) => {
        expect((res.response as any).statusCode).to.equal(200);
      });
    });

    it('Check description and qualification', () => {
      // Open 1 item
      posting.postingListELement().eq(0).click();
      posting.awaitGetPostingDescriptionResponse1();
      posting.positionNameELement().contains(description1JsonFile.name);
      posting
        .positionLocationELement()
        .contains(description1JsonFile.location.city)
        .contains(description1JsonFile.location.region);
      posting.jobDescriptionELement().should('exist');
      posting.jobQualificationELement().should('exist');

      posting.backButtonELement().click();

      // Open 2 item
      posting.postingListELement().eq(7).click();
      posting.awaitGetPostingDescriptionResponse2();
      posting.positionNameELement().contains(description2JsonFile.name);
      posting
        .positionLocationELement()
        .contains(description2JsonFile.location.city)
        .contains(description2JsonFile.location.region);
      posting.jobDescriptionELement().should('exist');
      posting.jobQualificationELement().should('exist');
    });

    it('click back button to the posting list & toggle to check consistency', () => {
      posting.postingListELement().eq(0).click();
      posting.backButtonELement().click();
      posting.postingListELement().eq(0).click();
      posting.backButtonELement().click();
      posting.postingListELement().eq(0).click();
      posting.backButtonELement().click();
    });
  });
});
