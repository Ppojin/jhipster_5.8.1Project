/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ExamComponentsPage from './exam.page-object';
import { ExamDeleteDialog } from './exam.page-object';
import ExamUpdatePage from './exam-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Exam e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examUpdatePage: ExamUpdatePage;
  let examComponentsPage: ExamComponentsPage;
  let examDeleteDialog: ExamDeleteDialog;

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

  it('should load Exams', async () => {
    await navBarPage.getEntityPage('exam');
    examComponentsPage = new ExamComponentsPage();
    expect(await examComponentsPage.getTitle().getText()).to.match(/Exams/);
  });

  it('should load create Exam page', async () => {
    await examComponentsPage.clickOnCreateButton();
    examUpdatePage = new ExamUpdatePage();
    expect(await examUpdatePage.getPageTitle().getAttribute('id')).to.match(/btbApp.examExam.home.createOrEditLabel/);
  });

  it('should create and save Exams', async () => {
    const nbButtonsBeforeCreate = await examComponentsPage.countDeleteButtons();

    await examUpdatePage.setIdExamInput('idExam');
    expect(await examUpdatePage.getIdExamInput()).to.match(/idExam/);
    await examUpdatePage.setTitleInput('title');
    expect(await examUpdatePage.getTitleInput()).to.match(/title/);
    await examUpdatePage.levelSelectLastOption();
    await examUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await examUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
    await examUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await examUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
    // examUpdatePage.examQABankSelectLastOption();
    await waitUntilDisplayed(examUpdatePage.getSaveButton());
    await examUpdatePage.save();
    await waitUntilHidden(examUpdatePage.getSaveButton());
    expect(await examUpdatePage.getSaveButton().isPresent()).to.be.false;

    await examComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await examComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Exam', async () => {
    await examComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await examComponentsPage.countDeleteButtons();
    await examComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    examDeleteDialog = new ExamDeleteDialog();
    expect(await examDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/btbApp.examExam.delete.question/);
    await examDeleteDialog.clickOnConfirmButton();

    await examComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await examComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
