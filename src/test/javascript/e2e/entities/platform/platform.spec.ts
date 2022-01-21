import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PlatformComponentsPage from './platform.page-object';
import PlatformUpdatePage from './platform-update.page-object';
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

describe('Platform e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let platformComponentsPage: PlatformComponentsPage;
  let platformUpdatePage: PlatformUpdatePage;
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
    platformComponentsPage = new PlatformComponentsPage();
    platformComponentsPage = await platformComponentsPage.goToPage(navBarPage);
  });

  it('should load Platforms', async () => {
    expect(await platformComponentsPage.title.getText()).to.match(/Platforms/);
    expect(await platformComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Platforms', async () => {
    const beforeRecordsCount = (await isVisible(platformComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(platformComponentsPage.table);
    platformUpdatePage = await platformComponentsPage.goToCreatePlatform();
    await platformUpdatePage.enterData();

    expect(await platformComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(platformComponentsPage.table);
    await waitUntilCount(platformComponentsPage.records, beforeRecordsCount + 1);
    expect(await platformComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await platformComponentsPage.deletePlatform();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(platformComponentsPage.records, beforeRecordsCount);
      expect(await platformComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(platformComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
