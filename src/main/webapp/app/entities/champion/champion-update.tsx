import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPlatform } from 'app/shared/model/platform.model';
import { getEntities as getPlatforms } from 'app/entities/platform/platform.reducer';
import { getEntity, updateEntity, createEntity, reset } from './champion.reducer';
import { IChampion } from 'app/shared/model/champion.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IChampionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionUpdate = (props: IChampionUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { championEntity, users, platforms, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/champion' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getPlatforms();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...championEntity,
        ...values,
        user: users.find(it => it.id.toString() === values.userId.toString()),
        platform: platforms.find(it => it.id.toString() === values.platformId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="championApp.champion.home.createOrEditLabel" data-cy="ChampionCreateUpdateHeading">
            <Translate contentKey="championApp.champion.home.createOrEditLabel">Create or edit a Champion</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : championEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="champion-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="champion-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="championIDLabel" for="champion-championID">
                  <Translate contentKey="championApp.champion.championID">Champion ID</Translate>
                </Label>
                <AvField
                  id="champion-championID"
                  data-cy="championID"
                  type="text"
                  name="championID"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="champion-phoneNumber">
                  <Translate contentKey="championApp.champion.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField
                  id="champion-phoneNumber"
                  data-cy="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="champion-status">
                  <Translate contentKey="championApp.champion.status">Status</Translate>
                </Label>
                <AvInput
                  id="champion-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && championEntity.status) || 'ProspectSecured'}
                >
                  <option value="ProspectSecured">{translate('championApp.MaxEvent.ProspectSecured')}</option>
                  <option value="TestScheduled">{translate('championApp.MaxEvent.TestScheduled')}</option>
                  <option value="TestPassed">{translate('championApp.MaxEvent.TestPassed')}</option>
                  <option value="TestFailed">{translate('championApp.MaxEvent.TestFailed')}</option>
                  <option value="CreditRated">{translate('championApp.MaxEvent.CreditRated')}</option>
                  <option value="GuarantorReturned">{translate('championApp.MaxEvent.GuarantorReturned')}</option>
                  <option value="Activated">{translate('championApp.MaxEvent.Activated')}</option>
                  <option value="VehicleAssigned">{translate('championApp.MaxEvent.VehicleAssigned')}</option>
                  <option value="ContractEntered">{translate('championApp.MaxEvent.ContractEntered')}</option>
                  <option value="Churned">{translate('championApp.MaxEvent.Churned')}</option>
                  <option value="Deactivated">{translate('championApp.MaxEvent.Deactivated')}</option>
                  <option value="HPExited">{translate('championApp.MaxEvent.HPExited')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="bvnLabel" for="champion-bvn">
                  <Translate contentKey="championApp.champion.bvn">Bvn</Translate>
                </Label>
                <AvField id="champion-bvn" data-cy="bvn" type="string" className="form-control" name="bvn" />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="champion-dateOfBirth">
                  <Translate contentKey="championApp.champion.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField id="champion-dateOfBirth" data-cy="dateOfBirth" type="date" className="form-control" name="dateOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label for="champion-user">
                  <Translate contentKey="championApp.champion.user">User</Translate>
                </Label>
                <AvInput id="champion-user" data-cy="user" type="select" className="form-control" name="userId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="champion-platform">
                  <Translate contentKey="championApp.champion.platform">Platform</Translate>
                </Label>
                <AvInput id="champion-platform" data-cy="platform" type="select" className="form-control" name="platformId">
                  <option value="" key="0" />
                  {platforms
                    ? platforms.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/champion" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  platforms: storeState.platform.entities,
  championEntity: storeState.champion.entity,
  loading: storeState.champion.loading,
  updating: storeState.champion.updating,
  updateSuccess: storeState.champion.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getPlatforms,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionUpdate);
