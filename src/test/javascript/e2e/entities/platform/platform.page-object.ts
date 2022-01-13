import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import PlatformUpdatePage from './platform-update.page-object';

const expect = chai.expect;
export class PlatformDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('champion.platform.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-platform'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class PlatformComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('platform-heading'));
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
    await navBarPage.getEntityPage('platform');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreatePlatform() {
    await this.createButton.click();
    return new PlatformUpdatePage();
  }

  async deletePlatform() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const platformDeleteDialog = new PlatformDeleteDialog();
    await waitUntilDisplayed(platformDeleteDialog.deleteModal);
    expect(await platformDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/champion.platform.delete.question/);
    await platformDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(platformDeleteDialog.deleteModal);

    expect(await isVisible(platformDeleteDialog.deleteModal)).to.be.false;
  }
}
