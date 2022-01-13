import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Champion from './champion';
import ChampionDetail from './champion-detail';
import ChampionUpdate from './champion-update';
import ChampionDeleteDialog from './champion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ChampionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ChampionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ChampionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Champion} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ChampionDeleteDialog} />
  </>
);

export default Routes;
