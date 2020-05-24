/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import QABankComponentsPage from './qa-bank.page-object';
import { QABankDeleteDialog } from './qa-bank.page-object';
import QABankUpdatePage from './qa-bank-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('QABank e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let qABankUpdatePage: QABankUpdatePage;
  let qABankComponentsPage: QABankComponentsPage;
  let qABankDeleteDialog: QABankDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load QABanks', async () => {
    await navBarPage.getEntityPage('qa-bank');
    qABankComponentsPage = new QABankComponentsPage();
    expect(await qABankComponentsPage.getTitle().getText()).to.match(/QA Banks/);
  });

  it('should load create QABank page', async () => {
    await qABankComponentsPage.clickOnCreateButton();
    qABankUpdatePage = new QABankUpdatePage();
    expect(await qABankUpdatePage.getPageTitle().getAttribute('id')).to.match(/btbApp.qaQABank.home.createOrEditLabel/);
  });

  it('should create and save QABanks', async () => {
    const nbButtonsBeforeCreate = await qABankComponentsPage.countDeleteButtons();

    await qABankUpdatePage.setIdQABankInput('idQABank');
    expect(await qABankUpdatePage.getIdQABankInput()).to.match(/idQABank/);
    await qABankUpdatePage.setTitleInput('title');
    expect(await qABankUpdatePage.getTitleInput()).to.match(/title/);
    await qABankUpdatePage.setContentsInput('contents');
    expect(await qABankUpdatePage.getContentsInput()).to.match(/contents/);
    await qABankUpdatePage.setGitUrlInput('gitUrl');
    expect(await qABankUpdatePage.getGitUrlInput()).to.match(/gitUrl/);
    await qABankUpdatePage.categorySelectLastOption();
    await waitUntilDisplayed(qABankUpdatePage.getSaveButton());
    await qABankUpdatePage.save();
    await waitUntilHidden(qABankUpdatePage.getSaveButton());
    expect(await qABankUpdatePage.getSaveButton().isPresent()).to.be.false;

    await qABankComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await qABankComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last QABank', async () => {
    await qABankComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await qABankComponentsPage.countDeleteButtons();
    await qABankComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    qABankDeleteDialog = new QABankDeleteDialog();
    expect(await qABankDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/btbApp.qaQABank.delete.question/);
    await qABankDeleteDialog.clickOnConfirmButton();

    await qABankComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await qABankComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
