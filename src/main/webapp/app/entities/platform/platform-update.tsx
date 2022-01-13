import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './platform.reducer';
import { IPlatform } from 'app/shared/model/platform.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlatformUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlatformUpdate = (props: IPlatformUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { platformEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/platform');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...platformEntity,
        ...values,
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
          <h2 id="maxApp.platform.home.createOrEditLabel" data-cy="PlatformCreateUpdateHeading">
            <Translate contentKey="maxApp.platform.home.createOrEditLabel">Create or edit a Platform</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : platformEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="platform-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="platform-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="platform-code">
                  <Translate contentKey="maxApp.platform.code">Code</Translate>
                </Label>
                <AvField id="platform-code" data-cy="code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="platform-description">
                  <Translate contentKey="maxApp.platform.description">Description</Translate>
                </Label>
                <AvField id="platform-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/platform" replace color="info">
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
  platformEntity: storeState.platform.entity,
  loading: storeState.platform.loading,
  updating: storeState.platform.updating,
  updateSuccess: storeState.platform.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformUpdate);
