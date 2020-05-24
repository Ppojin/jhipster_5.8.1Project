/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import CustomerComponentsPage from './customer.page-object';
import { CustomerDeleteDialog } from './customer.page-object';
import CustomerUpdatePage from './customer-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Customer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerUpdatePage: CustomerUpdatePage;
  let customerComponentsPage: CustomerComponentsPage;
  /*let customerDeleteDialog: CustomerDeleteDialog;*/

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

  it('should load Customers', async () => {
    await navBarPage.getEntityPage('customer');
    customerComponentsPage = new CustomerComponentsPage();
    expect(await customerComponentsPage.getTitle().getText()).to.match(/Customers/);
  });

  it('should load create Customer page', async () => {
    await customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    expect(await customerUpdatePage.getPageTitle().getAttribute('id')).to.match(/btbApp.btbCustomer.home.createOrEditLabel/);
  });

  /* it('should create and save Customers', async () => {
        const nbButtonsBeforeCreate = await customerComponentsPage.countDeleteButtons();

        await customerUpdatePage.setIdCustomerInput('idCustomer');
        expect(await customerUpdatePage.getIdCustomerInput()).to.match(/idCustomer/);
        await customerUpdatePage.setFirstNameInput('firstName');
        expect(await customerUpdatePage.getFirstNameInput()).to.match(/firstName/);
        await customerUpdatePage.setLastNameInput('lastName');
        expect(await customerUpdatePage.getLastNameInput()).to.match(/lastName/);
        await customerUpdatePage.genderSelectLastOption();
        await customerUpdatePage.setEmailInput('email');
        expect(await customerUpdatePage.getEmailInput()).to.match(/email/);
        await customerUpdatePage.setPhoneInput('phone');
        expect(await customerUpdatePage.getPhoneInput()).to.match(/phone/);
        await customerUpdatePage.setCityInput('city');
        expect(await customerUpdatePage.getCityInput()).to.match(/city/);
        await customerUpdatePage.setSigninDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await customerUpdatePage.getSigninDateInput()).to.contain('2001-01-01T02:30');
        await customerUpdatePage.roleSelectLastOption();
        await customerUpdatePage.userSelectLastOption();
        await waitUntilDisplayed(customerUpdatePage.getSaveButton());
        await customerUpdatePage.save();
        await waitUntilHidden(customerUpdatePage.getSaveButton());
        expect(await customerUpdatePage.getSaveButton().isPresent()).to.be.false;

        await customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });*/

  /* it('should delete last Customer', async () => {
        await customerComponentsPage.waitUntilLoaded();
        const nbButtonsBeforeDelete = await customerComponentsPage.countDeleteButtons();
        await customerComponentsPage.clickOnLastDeleteButton();

        const deleteModal = element(by.className('modal'));
        await waitUntilDisplayed(deleteModal);

        customerDeleteDialog = new CustomerDeleteDialog();
        expect(await customerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/btbApp.btbCustomer.delete.question/);
        await customerDeleteDialog.clickOnConfirmButton();

        await customerComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
        expect(await customerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
