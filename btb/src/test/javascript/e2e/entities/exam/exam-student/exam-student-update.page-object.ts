import { element, by, ElementFinder } from 'protractor';

export default class ExamStudentUpdatePage {
  pageTitle: ElementFinder = element(by.id('btbApp.examExamStudent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idCustomerInput: ElementFinder = element(by.css('input#exam-student-idCustomer'));
  examSelect: ElementFinder = element(by.css('select#exam-student-exam'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdCustomerInput(idCustomer) {
    await this.idCustomerInput.sendKeys(idCustomer);
  }

  async getIdCustomerInput() {
    return this.idCustomerInput.getAttribute('value');
  }

  async examSelectLastOption() {
    await this.examSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async examSelectOption(option) {
    await this.examSelect.sendKeys(option);
  }

  getExamSelect() {
    return this.examSelect;
  }

  async getExamSelectedOption() {
    return this.examSelect.element(by.css('option:checked')).getText();
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
