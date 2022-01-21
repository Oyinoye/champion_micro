import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverLicenseComponentsPage from './driver-license.page-object';
import DriverLicenseUpdatePage from './driver-license-update.page-object';
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

describe('DriverLicense e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverLicenseComponentsPage: DriverLicenseComponentsPage;
  let driverLicenseUpdatePage: DriverLicenseUpdatePage;
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
    driverLicenseComponentsPage = new DriverLicenseComponentsPage();
    driverLicenseComponentsPage = await driverLicenseComponentsPage.goToPage(navBarPage);
  });

  it('should load DriverLicenses', async () => {
    expect(await driverLicenseComponentsPage.title.getText()).to.match(/Driver Licenses/);
    expect(await driverLicenseComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete DriverLicenses', async () => {
    const beforeRecordsCount = (await isVisible(driverLicenseComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverLicenseComponentsPage.table);
    driverLicenseUpdatePage = await driverLicenseComponentsPage.goToCreateDriverLicense();
    await driverLicenseUpdatePage.enterData();

    expect(await driverLicenseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(driverLicenseComponentsPage.table);
    await waitUntilCount(driverLicenseComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverLicenseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await driverLicenseComponentsPage.deleteDriverLicense();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(driverLicenseComponentsPage.records, beforeRecordsCount);
      expect(await driverLicenseComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(driverLicenseComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
