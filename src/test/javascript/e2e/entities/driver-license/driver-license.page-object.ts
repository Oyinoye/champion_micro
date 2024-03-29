import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DriverLicenseUpdatePage from './driver-license-update.page-object';

const expect = chai.expect;
export class DriverLicenseDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('champion.driverLicense.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-driverLicense'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DriverLicenseComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('driver-license-heading'));
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
    await navBarPage.getEntityPage('driver-license');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDriverLicense() {
    await this.createButton.click();
    return new DriverLicenseUpdatePage();
  }

  async deleteDriverLicense() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const driverLicenseDeleteDialog = new DriverLicenseDeleteDialog();
    await waitUntilDisplayed(driverLicenseDeleteDialog.deleteModal);
    expect(await driverLicenseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/champion.driverLicense.delete.question/);
    await driverLicenseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverLicenseDeleteDialog.deleteModal);

    expect(await isVisible(driverLicenseDeleteDialog.deleteModal)).to.be.false;
  }
}
