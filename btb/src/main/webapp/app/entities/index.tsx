import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './btb/customer';
import QABank from './qa/qa-bank';
import Exam from './exam/exam';
import ExamQABank from './exam/exam-qa-bank';
import ExamStudent from './exam/exam-student';
import ExamResult from './exam/exam-result';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}/qa-bank`} component={QABank} />
      <ErrorBoundaryRoute path={`${match.url}/exam`} component={Exam} />
      <ErrorBoundaryRoute path={`${match.url}/exam-qa-bank`} component={ExamQABank} />
      <ErrorBoundaryRoute path={`${match.url}/exam-student`} component={ExamStudent} />
      <ErrorBoundaryRoute path={`${match.url}/exam-result`} component={ExamResult} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
