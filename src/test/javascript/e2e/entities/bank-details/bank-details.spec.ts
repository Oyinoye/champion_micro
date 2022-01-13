import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BankDetailsComponentsPage from './bank-details.page-object';
import BankDetailsUpdatePage from './bank-details-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('BankDetails e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bankDetailsComponentsPage: BankDetailsComponentsPage;
  let bankDetailsUpdatePage: BankDetailsUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    bankDetailsComponentsPage = new BankDetailsComponentsPage();
    bankDetailsComponentsPage = await bankDetailsComponentsPage.goToPage(navBarPage);
  });

  it('should load BankDetails', async () => {
    expect(await bankDetailsComponentsPage.title.getText()).to.match(/Bank Details/);
    expect(await bankDetailsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete BankDetails', async () => {
    const beforeRecordsCount = (await isVisible(bankDetailsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bankDetailsComponentsPage.table);
    bankDetailsUpdatePage = await bankDetailsComponentsPage.goToCreateBankDetails();
    await bankDetailsUpdatePage.enterData();

    expect(await bankDetailsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bankDetailsComponentsPage.table);
    await waitUntilCount(bankDetailsComponentsPage.records, beforeRecordsCount + 1);
    expect(await bankDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bankDetailsComponentsPage.deleteBankDetails();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bankDetailsComponentsPage.records, beforeRecordsCount);
      expect(await bankDetailsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bankDetailsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
