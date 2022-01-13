import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import GuarantorUpdatePage from './guarantor-update.page-object';

const expect = chai.expect;
export class GuarantorDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('champion.guarantor.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-guarantor'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class GuarantorComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('guarantor-heading'));
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
    await navBarPage.getEntityPage('guarantor');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateGuarantor() {
    await this.createButton.click();
    return new GuarantorUpdatePage();
  }

  async deleteGuarantor() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const guarantorDeleteDialog = new GuarantorDeleteDialog();
    await waitUntilDisplayed(guarantorDeleteDialog.deleteModal);
    expect(await guarantorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/champion.guarantor.delete.question/);
    await guarantorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(guarantorDeleteDialog.deleteModal);

    expect(await isVisible(guarantorDeleteDialog.deleteModal)).to.be.false;
  }
}
