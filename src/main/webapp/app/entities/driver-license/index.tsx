import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DriverLicense from './driver-license';
import DriverLicenseDetail from './driver-license-detail';
import DriverLicenseUpdate from './driver-license-update';
import DriverLicenseDeleteDialog from './driver-license-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DriverLicenseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DriverLicenseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DriverLicenseDetail} />
      <ErrorBoundaryRoute path={match.url} component={DriverLicense} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DriverLicenseDeleteDialog} />
  </>
);

export default Routes;
