import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExamStudent from './exam-student';
import ExamStudentDetail from './exam-student-detail';
import ExamStudentUpdate from './exam-student-update';
import ExamStudentDeleteDialog from './exam-student-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExamStudentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExamStudentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExamStudentDetail} />
      <ErrorBoundaryRoute path={match.url} component={ExamStudent} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExamStudentDeleteDialog} />
  </>
);

export default Routes;
