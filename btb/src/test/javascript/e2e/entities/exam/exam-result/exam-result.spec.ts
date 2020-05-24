/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ExamResultComponentsPage from './exam-result.page-object';
import { ExamResultDeleteDialog } from './exam-result.page-object';
import ExamResultUpdatePage from './exam-result-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('ExamResult e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examResultUpdatePage: ExamResultUpdatePage;
  let examResultComponentsPage: ExamResultComponentsPage;
  let examResultDeleteDialog: ExamResultDeleteDialog;
  const fileToUpload = '../../../../../../main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load ExamResults', async () => {
    await navBarPage.getEntityPage('exam-result');
    examResultComponentsPage = new ExamResultComponentsPage();
    expect(await examResultComponentsPage.getTitle().getText()).to.match(/Exam Results/);
  });

  it('should load create ExamResult page', async () => {
    await examResultComponentsPage.clickOnCreateButton();
    examResultUpdatePage = new ExamResultUpdatePage();
    expect(await examResultUpdatePage.getPageTitle().getAttribute('id')).to.match(/btbApp.examExamResult.home.createOrEditLabel/);
  });

  it('should create and save ExamResults', async () => {
    const nbButtonsBeforeCreate = await examResultComponentsPage.countDeleteButtons();

    await examResultUpdatePage.setIdExcerciseResultInput('idExcerciseResult');
    expect(await examResultUpdatePage.getIdExcerciseResultInput()).to.match(/idExcerciseResult/);
    await examResultUpdatePage.setScoreInput('5');
    expect(await examResultUpdatePage.getScoreInput()).to.eq('5');
    await examResultUpdatePage.setGitUrlInput('gitUrl');
    expect(await examResultUpdatePage.getGitUrlInput()).to.match(/gitUrl/);
    await examResultUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await examResultUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
    await examResultUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await examResultUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
    await examResultUpdatePage.setResultInput(absolutePath);
    await waitUntilDisplayed(examResultUpdatePage.getSaveButton());
    await examResultUpdatePage.save();
    await waitUntilHidden(examResultUpdatePage.getSaveButton());
    expect(await examResultUpdatePage.getSaveButton().isPresent()).to.be.false;

    await examResultComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await examResultComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ExamResult', async () => {
    await examResultComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await examResultComponentsPage.countDeleteButtons();
    await examResultComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    examResultDeleteDialog = new ExamResultDeleteDialog();
    expect(await examResultDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/btbApp.examExamResult.delete.question/);
    await examResultDeleteDialog.clickOnConfirmButton();

    await examResultComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await examResultComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
