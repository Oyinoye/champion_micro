import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChampion } from 'app/shared/model/champion.model';
import { getEntities as getChampions } from 'app/entities/champion/champion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './driver-license.reducer';
import { IDriverLicense } from 'app/shared/model/driver-license.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverLicenseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLicenseUpdate = (props: IDriverLicenseUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { driverLicenseEntity, champions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/driver-license');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getChampions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...driverLicenseEntity,
        ...values,
        champion: champions.find(it => it.id.toString() === values.championId.toString()),
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
          <h2 id="champion.driverLicense.home.createOrEditLabel" data-cy="DriverLicenseCreateUpdateHeading">
            <Translate contentKey="champion.driverLicense.home.createOrEditLabel">Create or edit a DriverLicense</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driverLicenseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-license-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="driver-license-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="licenseNumberLabel" for="driver-license-licenseNumber">
                  <Translate contentKey="champion.driverLicense.licenseNumber">License Number</Translate>
                </Label>
                <AvField id="driver-license-licenseNumber" data-cy="licenseNumber" type="text" name="licenseNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="driver-license-issueDate">
                  <Translate contentKey="champion.driverLicense.issueDate">Issue Date</Translate>
                </Label>
                <AvField id="driver-license-issueDate" data-cy="issueDate" type="date" className="form-control" name="issueDate" />
              </AvGroup>
              <AvGroup>
                <Label id="expiryDateLabel" for="driver-license-expiryDate">
                  <Translate contentKey="champion.driverLicense.expiryDate">Expiry Date</Translate>
                </Label>
                <AvField id="driver-license-expiryDate" data-cy="expiryDate" type="date" className="form-control" name="expiryDate" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="driver-license-address">
                  <Translate contentKey="champion.driverLicense.address">Address</Translate>
                </Label>
                <AvField id="driver-license-address" data-cy="address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="commentLabel" for="driver-license-comment">
                  <Translate contentKey="champion.driverLicense.comment">Comment</Translate>
                </Label>
                <AvField id="driver-license-comment" data-cy="comment" type="text" name="comment" />
              </AvGroup>
              <AvGroup>
                <Label for="driver-license-champion">
                  <Translate contentKey="champion.driverLicense.champion">Champion</Translate>
                </Label>
                <AvInput id="driver-license-champion" data-cy="champion" type="select" className="form-control" name="championId" required>
                  <option value="" key="0" />
                  {champions
                    ? champions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.championID}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/driver-license" replace color="info">
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
  champions: storeState.champion.entities,
  driverLicenseEntity: storeState.driverLicense.entity,
  loading: storeState.driverLicense.loading,
  updating: storeState.driverLicense.updating,
  updateSuccess: storeState.driverLicense.updateSuccess,
});

const mapDispatchToProps = {
  getChampions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicenseUpdate);
