import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GuarantorComponentsPage from './guarantor.page-object';
import GuarantorUpdatePage from './guarantor-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Guarantor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let guarantorComponentsPage: GuarantorComponentsPage;
  let guarantorUpdatePage: GuarantorUpdatePage;
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
    guarantorComponentsPage = new GuarantorComponentsPage();
    guarantorComponentsPage = await guarantorComponentsPage.goToPage(navBarPage);
  });

  it('should load Guarantors', async () => {
    expect(await guarantorComponentsPage.title.getText()).to.match(/Guarantors/);
    expect(await guarantorComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Guarantors', async () => {
    const beforeRecordsCount = (await isVisible(guarantorComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(guarantorComponentsPage.table);
    guarantorUpdatePage = await guarantorComponentsPage.goToCreateGuarantor();
    await guarantorUpdatePage.enterData();

    expect(await guarantorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(guarantorComponentsPage.table);
    await waitUntilCount(guarantorComponentsPage.records, beforeRecordsCount + 1);
    expect(await guarantorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await guarantorComponentsPage.deleteGuarantor();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(guarantorComponentsPage.records, beforeRecordsCount);
      expect(await guarantorComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(guarantorComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
