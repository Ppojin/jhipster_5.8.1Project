import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QABank from './qa-bank';
import QABankDetail from './qa-bank-detail';
import QABankUpdate from './qa-bank-update';
import QABankDeleteDialog from './qa-bank-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QABankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QABankUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QABankDetail} />
      <ErrorBoundaryRoute path={match.url} component={QABank} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QABankDeleteDialog} />
  </>
);

export default Routes;
