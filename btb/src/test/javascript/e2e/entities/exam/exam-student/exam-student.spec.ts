/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ExamStudentComponentsPage from './exam-student.page-object';
import { ExamStudentDeleteDialog } from './exam-student.page-object';
import ExamStudentUpdatePage from './exam-student-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('ExamStudent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let examStudentUpdatePage: ExamStudentUpdatePage;
  let examStudentComponentsPage: ExamStudentComponentsPage;
  let examStudentDeleteDialog: ExamStudentDeleteDialog;

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

  it('should load ExamStudents', async () => {
    await navBarPage.getEntityPage('exam-student');
    examStudentComponentsPage = new ExamStudentComponentsPage();
    expect(await examStudentComponentsPage.getTitle().getText()).to.match(/Exam Students/);
  });

  it('should load create ExamStudent page', async () => {
    await examStudentComponentsPage.clickOnCreateButton();
    examStudentUpdatePage = new ExamStudentUpdatePage();
    expect(await examStudentUpdatePage.getPageTitle().getAttribute('id')).to.match(/btbApp.examExamStudent.home.createOrEditLabel/);
  });

  it('should create and save ExamStudents', async () => {
    const nbButtonsBeforeCreate = await examStudentComponentsPage.countDeleteButtons();

    await examStudentUpdatePage.setIdCustomerInput('idCustomer');
    expect(await examStudentUpdatePage.getIdCustomerInput()).to.match(/idCustomer/);
    await examStudentUpdatePage.examSelectLastOption();
    await waitUntilDisplayed(examStudentUpdatePage.getSaveButton());
    await examStudentUpdatePage.save();
    await waitUntilHidden(examStudentUpdatePage.getSaveButton());
    expect(await examStudentUpdatePage.getSaveButton().isPresent()).to.be.false;

    await examStudentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await examStudentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ExamStudent', async () => {
    await examStudentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await examStudentComponentsPage.countDeleteButtons();
    await examStudentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    examStudentDeleteDialog = new ExamStudentDeleteDialog();
    expect(await examStudentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/btbApp.examExamStudent.delete.question/);
    await examStudentDeleteDialog.clickOnConfirmButton();

    await examStudentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await examStudentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
