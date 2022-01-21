import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BankDetailsUpdatePage {
  pageTitle: ElementFinder = element(by.id('championApp.bankDetails.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  bankNameInput: ElementFinder = element(by.css('input#bank-details-bankName'));
  accountNumberInput: ElementFinder = element(by.css('input#bank-details-accountNumber'));
  championSelect: ElementFinder = element(by.css('select#bank-details-champion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setBankNameInput(bankName) {
    await this.bankNameInput.sendKeys(bankName);
  }

  async getBankNameInput() {
    return this.bankNameInput.getAttribute('value');
  }

  async setAccountNumberInput(accountNumber) {
    await this.accountNumberInput.sendKeys(accountNumber);
  }

  async getAccountNumberInput() {
    return this.accountNumberInput.getAttribute('value');
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
    await this.setBankNameInput('bankName');
    expect(await this.getBankNameInput()).to.match(/bankName/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAccountNumberInput('accountNumber');
    expect(await this.getAccountNumberInput()).to.match(/accountNumber/);
    await this.championSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
