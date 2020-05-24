import { element, by, ElementFinder } from 'protractor';

export default class QABankUpdatePage {
  pageTitle: ElementFinder = element(by.id('btbApp.qaQABank.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idQABankInput: ElementFinder = element(by.css('input#qa-bank-idQABank'));
  titleInput: ElementFinder = element(by.css('input#qa-bank-title'));
  contentsInput: ElementFinder = element(by.css('input#qa-bank-contents'));
  gitUrlInput: ElementFinder = element(by.css('input#qa-bank-gitUrl'));
  categorySelect: ElementFinder = element(by.css('select#qa-bank-category'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdQABankInput(idQABank) {
    await this.idQABankInput.sendKeys(idQABank);
  }

  async getIdQABankInput() {
    return this.idQABankInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setContentsInput(contents) {
    await this.contentsInput.sendKeys(contents);
  }

  async getContentsInput() {
    return this.contentsInput.getAttribute('value');
  }

  async setGitUrlInput(gitUrl) {
    await this.gitUrlInput.sendKeys(gitUrl);
  }

  async getGitUrlInput() {
    return this.gitUrlInput.getAttribute('value');
  }

  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
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
