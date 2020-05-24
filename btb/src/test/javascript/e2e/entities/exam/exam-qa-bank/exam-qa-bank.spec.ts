/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ExamQABankComponentsPage from './exam-qa-bank.page-object';
import { ExamQABankDeleteDialog } from './exam-qa-bank.page-object';
import ExamQABankUpdatePage from './exam-qa-bank-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('ExamQABank e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examQABankUpdatePage: ExamQABankUpdatePage;
  let examQABankComponentsPage: ExamQABankComponentsPage;
  let examQABankDeleteDialog: ExamQABankDeleteDialog;

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

  it('should load ExamQABanks', async () => {
    await navBarPage.getEntityPage('exam-qa-bank');
    examQABankComponentsPage = new ExamQABankComponentsPage();
    expect(await examQABankComponentsPage.getTitle().getText()).to.match(/Exam QA Banks/);
  });

  it('should load create ExamQABank page', async () => {
    await examQABankComponentsPage.clickOnCreateButton();
    examQABankUpdatePage = new ExamQABankUpdatePage();
    expect(await examQABankUpdatePage.getPageTitle().getAttribute('id')).to.match(/btbApp.examExamQaBank.home.createOrEditLabel/);
  });

  it('should create and save ExamQABanks', async () => {
    const nbButtonsBeforeCreate = await examQABankComponentsPage.countDeleteButtons();

    await examQABankUpdatePage.setIdQABankInput('idQABank');
    expect(await examQABankUpdatePage.getIdQABankInput()).to.match(/idQABank/);
    await waitUntilDisplayed(examQABankUpdatePage.getSaveButton());
    await examQABankUpdatePage.save();
    await waitUntilHidden(examQABankUpdatePage.getSaveButton());
    expect(await examQABankUpdatePage.getSaveButton().isPresent()).to.be.false;

    await examQABankComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await examQABankComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ExamQABank', async () => {
    await examQABankComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await examQABankComponentsPage.countDeleteButtons();
    await examQABankComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    examQABankDeleteDialog = new ExamQABankDeleteDialog();
    expect(await examQABankDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/btbApp.examExamQaBank.delete.question/);
    await examQABankDeleteDialog.clickOnConfirmButton();

    await examQABankComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await examQABankComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
