import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/btb/customer/customer.reducer';
// prettier-ignore
import qABank, {
  QABankState
} from 'app/entities/qa/qa-bank/qa-bank.reducer';
// prettier-ignore
import exam, {
  ExamState
} from 'app/entities/exam/exam/exam.reducer';
// prettier-ignore
import examQABank, {
  ExamQABankState
} from 'app/entities/exam/exam-qa-bank/exam-qa-bank.reducer';
// prettier-ignore
import examStudent, {
  ExamStudentState
} from 'app/entities/exam/exam-student/exam-student.reducer';
// prettier-ignore
import examResult, {
  ExamResultState
} from 'app/entities/exam/exam-result/exam-result.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly customer: CustomerState;
  readonly qABank: QABankState;
  readonly exam: ExamState;
  readonly examQABank: ExamQABankState;
  readonly examStudent: ExamStudentState;
  readonly examResult: ExamResultState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  customer,
  qABank,
  exam,
  examQABank,
  examStudent,
  examResult,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
