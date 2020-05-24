import { element, by, ElementFinder } from 'protractor';

export default class ExamQABankUpdatePage {
  pageTitle: ElementFinder = element(by.id('btbApp.examExamQaBank.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idQABankInput: ElementFinder = element(by.css('input#exam-qa-bank-idQABank'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdQABankInput(idQABank) {
    await this.idQABankInput.sendKeys(idQABank);
  }

  async getIdQABankInput() {
    return this.idQABankInput.getAttribute('value');
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
