import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Guarantor from './guarantor';
import GuarantorDetail from './guarantor-detail';
import GuarantorUpdate from './guarantor-update';
import GuarantorDeleteDialog from './guarantor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GuarantorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GuarantorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GuarantorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Guarantor} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GuarantorDeleteDialog} />
  </>
);

export default Routes;
