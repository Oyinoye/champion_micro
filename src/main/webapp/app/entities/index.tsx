import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Champion from './champion';
import DriverLicense from './driver-license';
import BankDetails from './bank-details';
import Platform from './platform';
import Guarantor from './guarantor';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}champion`} component={Champion} />
      <ErrorBoundaryRoute path={`${match.url}driver-license`} component={DriverLicense} />
      <ErrorBoundaryRoute path={`${match.url}bank-details`} component={BankDetails} />
      <ErrorBoundaryRoute path={`${match.url}platform`} component={Platform} />
      <ErrorBoundaryRoute path={`${match.url}guarantor`} component={Guarantor} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
