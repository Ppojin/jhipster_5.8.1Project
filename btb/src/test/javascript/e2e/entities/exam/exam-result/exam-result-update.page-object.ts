import { element, by, ElementFinder } from 'protractor';

export default class ExamResultUpdatePage {
  pageTitle: ElementFinder = element(by.id('btbApp.examExamResult.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idExcerciseResultInput: ElementFinder = element(by.css('input#exam-result-idExcerciseResult'));
  scoreInput: ElementFinder = element(by.css('input#exam-result-score'));
  gitUrlInput: ElementFinder = element(by.css('input#exam-result-gitUrl'));
  startDateInput: ElementFinder = element(by.css('input#exam-result-startDate'));
  endDateInput: ElementFinder = element(by.css('input#exam-result-endDate'));
  resultInput: ElementFinder = element(by.css('input#file_result'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdExcerciseResultInput(idExcerciseResult) {
    await this.idExcerciseResultInput.sendKeys(idExcerciseResult);
  }

  async getIdExcerciseResultInput() {
    return this.idExcerciseResultInput.getAttribute('value');
  }

  async setScoreInput(score) {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput() {
    return this.scoreInput.getAttribute('value');
  }

  async setGitUrlInput(gitUrl) {
    await this.gitUrlInput.sendKeys(gitUrl);
  }

  async getGitUrlInput() {
    return this.gitUrlInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async setResultInput(result) {
    await this.resultInput.sendKeys(result);
  }

  async getResultInput() {
    return this.resultInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
