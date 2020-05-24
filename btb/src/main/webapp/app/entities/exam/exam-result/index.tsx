import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExamResult from './exam-result';
import ExamResultDetail from './exam-result-detail';
import ExamResultUpdate from './exam-result-update';
import ExamResultDeleteDialog from './exam-result-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExamResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExamResultUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExamResultDetail} />
      <ErrorBoundaryRoute path={match.url} component={ExamResult} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExamResultDeleteDialog} />
  </>
);

export default Routes;
