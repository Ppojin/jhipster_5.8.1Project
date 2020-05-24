import { element, by, ElementFinder } from 'protractor';

export default class CustomerUpdatePage {
  pageTitle: ElementFinder = element(by.id('btbApp.btbCustomer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  idCustomerInput: ElementFinder = element(by.css('input#customer-idCustomer'));
  firstNameInput: ElementFinder = element(by.css('input#customer-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#customer-lastName'));
  genderSelect: ElementFinder = element(by.css('select#customer-gender'));
  emailInput: ElementFinder = element(by.css('input#customer-email'));
  phoneInput: ElementFinder = element(by.css('input#customer-phone'));
  cityInput: ElementFinder = element(by.css('input#customer-city'));
  signinDateInput: ElementFinder = element(by.css('input#customer-signinDate'));
  roleSelect: ElementFinder = element(by.css('select#customer-role'));
  userSelect: ElementFinder = element(by.css('select#customer-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIdCustomerInput(idCustomer) {
    await this.idCustomerInput.sendKeys(idCustomer);
  }

  async getIdCustomerInput() {
    return this.idCustomerInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setSigninDateInput(signinDate) {
    await this.signinDateInput.sendKeys(signinDate);
  }

  async getSigninDateInput() {
    return this.signinDateInput.getAttribute('value');
  }

  async setRoleSelect(role) {
    await this.roleSelect.sendKeys(role);
  }

  async getRoleSelect() {
    return this.roleSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption() {
    await this.roleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
