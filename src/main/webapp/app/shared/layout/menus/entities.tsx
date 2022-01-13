import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/champion">
      <Translate contentKey="global.menu.entities.champion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/driver-license">
      <Translate contentKey="global.menu.entities.driverLicense" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/bank-details">
      <Translate contentKey="global.menu.entities.bankDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/platform">
      <Translate contentKey="global.menu.entities.platform" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/guarantor">
      <Translate contentKey="global.menu.entities.guarantor" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
