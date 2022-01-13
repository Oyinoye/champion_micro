import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ChampionComponentsPage from './champion.page-object';
import ChampionUpdatePage from './champion-update.page-object';
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

describe('Champion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let championComponentsPage: ChampionComponentsPage;
  let championUpdatePage: ChampionUpdatePage;
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
    championComponentsPage = new ChampionComponentsPage();
    championComponentsPage = await championComponentsPage.goToPage(navBarPage);
  });

  it('should load Champions', async () => {
    expect(await championComponentsPage.title.getText()).to.match(/Champions/);
    expect(await championComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Champions', async () => {
    const beforeRecordsCount = (await isVisible(championComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(championComponentsPage.table);
    championUpdatePage = await championComponentsPage.goToCreateChampion();
    await championUpdatePage.enterData();

    expect(await championComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(championComponentsPage.table);
    await waitUntilCount(championComponentsPage.records, beforeRecordsCount + 1);
    expect(await championComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await championComponentsPage.deleteChampion();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(championComponentsPage.records, beforeRecordsCount);
      expect(await championComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(championComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
