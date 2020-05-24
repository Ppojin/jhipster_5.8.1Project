import { element, by, ElementFinder } from 'protractor';

export default class ExamUpdatePage {
  pageTitle: ElementFinder = element(by.id('btbApp.examExam.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idExamInput: ElementFinder = element(by.css('input#exam-idExam'));
  titleInput: ElementFinder = element(by.css('input#exam-title'));
  levelSelect: ElementFinder = element(by.css('select#exam-level'));
  startDateInput: ElementFinder = element(by.css('input#exam-startDate'));
  endDateInput: ElementFinder = element(by.css('input#exam-endDate'));
  examQABankSelect: ElementFinder = element(by.css('select#exam-examQABank'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdExamInput(idExam) {
    await this.idExamInput.sendKeys(idExam);
  }

  async getIdExamInput() {
    return this.idExamInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setLevelSelect(level) {
    await this.levelSelect.sendKeys(level);
  }

  async getLevelSelect() {
    return this.levelSelect.element(by.css('option:checked')).getText();
  }

  async levelSelectLastOption() {
    await this.levelSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async examQABankSelectLastOption() {
    await this.examQABankSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async examQABankSelectOption(option) {
    await this.examQABankSelect.sendKeys(option);
  }

  getExamQABankSelect() {
    return this.examQABankSelect;
  }

  async getExamQABankSelectedOption() {
    return this.examQABankSelect.element(by.css('option:checked')).getText();
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
