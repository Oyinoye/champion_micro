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
import { getEntity, updateEntity, createEntity, reset } from './bank-details.reducer';
import { IBankDetails } from 'app/shared/model/bank-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBankDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BankDetailsUpdate = (props: IBankDetailsUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { bankDetailsEntity, champions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bank-details');
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
        ...bankDetailsEntity,
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
          <h2 id="champion.bankDetails.home.createOrEditLabel" data-cy="BankDetailsCreateUpdateHeading">
            <Translate contentKey="champion.bankDetails.home.createOrEditLabel">Create or edit a BankDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bankDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bank-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bank-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="bankNameLabel" for="bank-details-bankName">
                  <Translate contentKey="champion.bankDetails.bankName">Bank Name</Translate>
                </Label>
                <AvField id="bank-details-bankName" data-cy="bankName" type="text" name="bankName" />
              </AvGroup>
              <AvGroup>
                <Label id="accountNumberLabel" for="bank-details-accountNumber">
                  <Translate contentKey="champion.bankDetails.accountNumber">Account Number</Translate>
                </Label>
                <AvField id="bank-details-accountNumber" data-cy="accountNumber" type="text" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label for="bank-details-champion">
                  <Translate contentKey="champion.bankDetails.champion">Champion</Translate>
                </Label>
                <AvInput id="bank-details-champion" data-cy="champion" type="select" className="form-control" name="championId">
                  <option value="" key="0" />
                  {champions
                    ? champions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.championID}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bank-details" replace color="info">
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
  bankDetailsEntity: storeState.bankDetails.entity,
  loading: storeState.bankDetails.loading,
  updating: storeState.bankDetails.updating,
  updateSuccess: storeState.bankDetails.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsUpdate);
