import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExamQABank from './exam-qa-bank';
import ExamQABankDetail from './exam-qa-bank-detail';
import ExamQABankUpdate from './exam-qa-bank-update';
import ExamQABankDeleteDialog from './exam-qa-bank-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExamQABankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExamQABankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExamQABankDetail} />
      <ErrorBoundaryRoute path={match.url} component={ExamQABank} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExamQABankDeleteDialog} />
  </>
);

export default Routes;
