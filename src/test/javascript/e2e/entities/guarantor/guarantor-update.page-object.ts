import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class GuarantorUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxApp.guarantor.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#guarantor-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#guarantor-lastName'));
  dateOfBirthInput: ElementFinder = element(by.css('input#guarantor-dateOfBirth'));
  relationshipInput: ElementFinder = element(by.css('input#guarantor-relationship'));
  knowHowLongInput: ElementFinder = element(by.css('input#guarantor-knowHowLong'));
  occupationInput: ElementFinder = element(by.css('input#guarantor-occupation'));
  homeAddressInput: ElementFinder = element(by.css('input#guarantor-homeAddress'));
  officeAddressInput: ElementFinder = element(by.css('input#guarantor-officeAddress'));
  utilityUploadInput: ElementFinder = element(by.css('input#file_utilityUpload'));
  idUploadInput: ElementFinder = element(by.css('input#file_idUpload'));
  championSelect: ElementFinder = element(by.css('select#guarantor-champion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return this.dateOfBirthInput.getAttribute('value');
  }

  async setRelationshipInput(relationship) {
    await this.relationshipInput.sendKeys(relationship);
  }

  async getRelationshipInput() {
    return this.relationshipInput.getAttribute('value');
  }

  async setKnowHowLongInput(knowHowLong) {
    await this.knowHowLongInput.sendKeys(knowHowLong);
  }

  async getKnowHowLongInput() {
    return this.knowHowLongInput.getAttribute('value');
  }

  async setOccupationInput(occupation) {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput() {
    return this.occupationInput.getAttribute('value');
  }

  async setHomeAddressInput(homeAddress) {
    await this.homeAddressInput.sendKeys(homeAddress);
  }

  async getHomeAddressInput() {
    return this.homeAddressInput.getAttribute('value');
  }

  async setOfficeAddressInput(officeAddress) {
    await this.officeAddressInput.sendKeys(officeAddress);
  }

  async getOfficeAddressInput() {
    return this.officeAddressInput.getAttribute('value');
  }

  async setUtilityUploadInput(utilityUpload) {
    await this.utilityUploadInput.sendKeys(utilityUpload);
  }

  async getUtilityUploadInput() {
    return this.utilityUploadInput.getAttribute('value');
  }

  async setIdUploadInput(idUpload) {
    await this.idUploadInput.sendKeys(idUpload);
  }

  async getIdUploadInput() {
    return this.idUploadInput.getAttribute('value');
  }

  async championSelectLastOption() {
    await this.championSelect.all(by.tagName('option')).last().click();
  }

  async championSelectOption(option) {
    await this.championSelect.sendKeys(option);
  }

  getChampionSelect() {
    return this.championSelect;
  }

  async getChampionSelectedOption() {
    return this.championSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setFirstNameInput('firstName');
    expect(await this.getFirstNameInput()).to.match(/firstName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    expect(await this.getLastNameInput()).to.match(/lastName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfBirthInput('01-01-2001');
    expect(await this.getDateOfBirthInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setRelationshipInput('relationship');
    expect(await this.getRelationshipInput()).to.match(/relationship/);
    await waitUntilDisplayed(this.saveButton);
    await this.setKnowHowLongInput('knowHowLong');
    expect(await this.getKnowHowLongInput()).to.match(/knowHowLong/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOccupationInput('occupation');
    expect(await this.getOccupationInput()).to.match(/occupation/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHomeAddressInput('homeAddress');
    expect(await this.getHomeAddressInput()).to.match(/homeAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOfficeAddressInput('officeAddress');
    expect(await this.getOfficeAddressInput()).to.match(/officeAddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUtilityUploadInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setIdUploadInput(absolutePath);
    await this.championSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
