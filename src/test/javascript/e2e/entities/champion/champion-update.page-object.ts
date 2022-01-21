import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ChampionUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.champion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  championIDInput: ElementFinder = element(by.css('input#champion-championID'));
  phoneNumberInput: ElementFinder = element(by.css('input#champion-phoneNumber'));
  statusSelect: ElementFinder = element(by.css('select#champion-status'));
  bvnInput: ElementFinder = element(by.css('input#champion-bvn'));
  dateOfBirthInput: ElementFinder = element(by.css('input#champion-dateOfBirth'));
  userSelect: ElementFinder = element(by.css('select#champion-user'));
  platformSelect: ElementFinder = element(by.css('select#champion-platform'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setChampionIDInput(championID) {
    await this.championIDInput.sendKeys(championID);
  }

  async getChampionIDInput() {
    return this.championIDInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setBvnInput(bvn) {
    await this.bvnInput.sendKeys(bvn);
  }

  async getBvnInput() {
    return this.bvnInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth) {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput() {
    return this.dateOfBirthInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async platformSelectLastOption() {
    await this.platformSelect.all(by.tagName('option')).last().click();
  }

  async platformSelectOption(option) {
    await this.platformSelect.sendKeys(option);
  }

  getPlatformSelect() {
    return this.platformSelect;
  }

  async getPlatformSelectedOption() {
    return this.platformSelect.element(by.css('option:checked')).getText();
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
    await this.setChampionIDInput('championID');
    expect(await this.getChampionIDInput()).to.match(/championID/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneNumberInput('phoneNumber');
    expect(await this.getPhoneNumberInput()).to.match(/phoneNumber/);
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setBvnInput('5');
    expect(await this.getBvnInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateOfBirthInput('01-01-2001');
    expect(await this.getDateOfBirthInput()).to.eq('2001-01-01');
    await this.userSelectLastOption();
    await this.platformSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
