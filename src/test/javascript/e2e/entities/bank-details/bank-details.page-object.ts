import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BankDetailsUpdatePage from './bank-details-update.page-object';

const expect = chai.expect;
export class BankDetailsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('champion.bankDetails.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bankDetails'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BankDetailsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bank-details-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('bank-details');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBankDetails() {
    await this.createButton.click();
    return new BankDetailsUpdatePage();
  }

  async deleteBankDetails() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bankDetailsDeleteDialog = new BankDetailsDeleteDialog();
    await waitUntilDisplayed(bankDetailsDeleteDialog.deleteModal);
    expect(await bankDetailsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/champion.bankDetails.delete.question/);
    await bankDetailsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bankDetailsDeleteDialog.deleteModal);

    expect(await isVisible(bankDetailsDeleteDialog.deleteModal)).to.be.false;
  }
}
