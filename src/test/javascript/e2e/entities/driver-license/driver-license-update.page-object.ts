import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class DriverLicenseUpdatePage {
  pageTitle: ElementFinder = element(by.id('maxApp.driverLicense.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  licenseNumberInput: ElementFinder = element(by.css('input#driver-license-licenseNumber'));
  issueDateInput: ElementFinder = element(by.css('input#driver-license-issueDate'));
  expiryDateInput: ElementFinder = element(by.css('input#driver-license-expiryDate'));
  addressInput: ElementFinder = element(by.css('input#driver-license-address'));
  commentInput: ElementFinder = element(by.css('input#driver-license-comment'));
  championSelect: ElementFinder = element(by.css('select#driver-license-champion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLicenseNumberInput(licenseNumber) {
    await this.licenseNumberInput.sendKeys(licenseNumber);
  }

  async getLicenseNumberInput() {
    return this.licenseNumberInput.getAttribute('value');
  }

  async setIssueDateInput(issueDate) {
    await this.issueDateInput.sendKeys(issueDate);
  }

  async getIssueDateInput() {
    return this.issueDateInput.getAttribute('value');
  }

  async setExpiryDateInput(expiryDate) {
    await this.expiryDateInput.sendKeys(expiryDate);
  }

  async getExpiryDateInput() {
    return this.expiryDateInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return this.commentInput.getAttribute('value');
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
    await this.setLicenseNumberInput('licenseNumber');
    expect(await this.getLicenseNumberInput()).to.match(/licenseNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.setIssueDateInput('01-01-2001');
    expect(await this.getIssueDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setExpiryDateInput('01-01-2001');
    expect(await this.getExpiryDateInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCommentInput('comment');
    expect(await this.getCommentInput()).to.match(/comment/);
    await this.championSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
