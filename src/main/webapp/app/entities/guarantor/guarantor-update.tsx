import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, openFile, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IChampion } from 'app/shared/model/champion.model';
import { getEntities as getChampions } from 'app/entities/champion/champion.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './guarantor.reducer';
import { IGuarantor } from 'app/shared/model/guarantor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGuarantorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GuarantorUpdate = (props: IGuarantorUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { guarantorEntity, champions, loading, updating } = props;

  const { utilityUpload, utilityUploadContentType, idUpload, idUploadContentType } = guarantorEntity;

  const handleClose = () => {
    props.history.push('/guarantor');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getChampions();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...guarantorEntity,
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
          <h2 id="maxApp.guarantor.home.createOrEditLabel" data-cy="GuarantorCreateUpdateHeading">
            <Translate contentKey="maxApp.guarantor.home.createOrEditLabel">Create or edit a Guarantor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : guarantorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="guarantor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="guarantor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="guarantor-firstName">
                  <Translate contentKey="maxApp.guarantor.firstName">First Name</Translate>
                </Label>
                <AvField id="guarantor-firstName" data-cy="firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="guarantor-lastName">
                  <Translate contentKey="maxApp.guarantor.lastName">Last Name</Translate>
                </Label>
                <AvField id="guarantor-lastName" data-cy="lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="guarantor-dateOfBirth">
                  <Translate contentKey="maxApp.guarantor.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField id="guarantor-dateOfBirth" data-cy="dateOfBirth" type="date" className="form-control" name="dateOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="relationshipLabel" for="guarantor-relationship">
                  <Translate contentKey="maxApp.guarantor.relationship">Relationship</Translate>
                </Label>
                <AvField id="guarantor-relationship" data-cy="relationship" type="text" name="relationship" />
              </AvGroup>
              <AvGroup>
                <Label id="knowHowLongLabel" for="guarantor-knowHowLong">
                  <Translate contentKey="maxApp.guarantor.knowHowLong">Know How Long</Translate>
                </Label>
                <AvField id="guarantor-knowHowLong" data-cy="knowHowLong" type="text" name="knowHowLong" />
              </AvGroup>
              <AvGroup>
                <Label id="occupationLabel" for="guarantor-occupation">
                  <Translate contentKey="maxApp.guarantor.occupation">Occupation</Translate>
                </Label>
                <AvField id="guarantor-occupation" data-cy="occupation" type="text" name="occupation" />
              </AvGroup>
              <AvGroup>
                <Label id="homeAddressLabel" for="guarantor-homeAddress">
                  <Translate contentKey="maxApp.guarantor.homeAddress">Home Address</Translate>
                </Label>
                <AvField id="guarantor-homeAddress" data-cy="homeAddress" type="text" name="homeAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="officeAddressLabel" for="guarantor-officeAddress">
                  <Translate contentKey="maxApp.guarantor.officeAddress">Office Address</Translate>
                </Label>
                <AvField id="guarantor-officeAddress" data-cy="officeAddress" type="text" name="officeAddress" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="utilityUploadLabel" for="utilityUpload">
                    <Translate contentKey="maxApp.guarantor.utilityUpload">Utility Upload</Translate>
                  </Label>
                  <br />
                  {utilityUpload ? (
                    <div>
                      {utilityUploadContentType ? (
                        <a onClick={openFile(utilityUploadContentType, utilityUpload)}>
                          <img src={`data:${utilityUploadContentType};base64,${utilityUpload}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {utilityUploadContentType}, {byteSize(utilityUpload)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('utilityUpload')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input
                    id="file_utilityUpload"
                    data-cy="utilityUpload"
                    type="file"
                    onChange={onBlobChange(true, 'utilityUpload')}
                    accept="image/*"
                  />
                  <AvInput type="hidden" name="utilityUpload" value={utilityUpload} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="idUploadLabel" for="idUpload">
                    <Translate contentKey="maxApp.guarantor.idUpload">Id Upload</Translate>
                  </Label>
                  <br />
                  {idUpload ? (
                    <div>
                      {idUploadContentType ? (
                        <a onClick={openFile(idUploadContentType, idUpload)}>
                          <img src={`data:${idUploadContentType};base64,${idUpload}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {idUploadContentType}, {byteSize(idUpload)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('idUpload')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_idUpload" data-cy="idUpload" type="file" onChange={onBlobChange(true, 'idUpload')} accept="image/*" />
                  <AvInput type="hidden" name="idUpload" value={idUpload} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="guarantor-champion">
                  <Translate contentKey="maxApp.guarantor.champion">Champion</Translate>
                </Label>
                <AvInput id="guarantor-champion" data-cy="champion" type="select" className="form-control" name="championId" required>
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
              <Button tag={Link} id="cancel-save" to="/guarantor" replace color="info">
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
  guarantorEntity: storeState.guarantor.entity,
  loading: storeState.guarantor.loading,
  updating: storeState.guarantor.updating,
  updateSuccess: storeState.guarantor.updateSuccess,
});

const mapDispatchToProps = {
  getChampions,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GuarantorUpdate);
