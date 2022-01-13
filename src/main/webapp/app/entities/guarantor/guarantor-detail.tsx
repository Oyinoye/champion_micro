import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './guarantor.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGuarantorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GuarantorDetail = (props: IGuarantorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { guarantorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="guarantorDetailsHeading">
          <Translate contentKey="champion.guarantor.detail.title">Guarantor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="champion.guarantor.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="champion.guarantor.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.lastName}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="champion.guarantor.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.dateOfBirth ? (
              <TextFormat value={guarantorEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="relationship">
              <Translate contentKey="champion.guarantor.relationship">Relationship</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.relationship}</dd>
          <dt>
            <span id="knowHowLong">
              <Translate contentKey="champion.guarantor.knowHowLong">Know How Long</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.knowHowLong}</dd>
          <dt>
            <span id="occupation">
              <Translate contentKey="champion.guarantor.occupation">Occupation</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.occupation}</dd>
          <dt>
            <span id="homeAddress">
              <Translate contentKey="champion.guarantor.homeAddress">Home Address</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.homeAddress}</dd>
          <dt>
            <span id="officeAddress">
              <Translate contentKey="champion.guarantor.officeAddress">Office Address</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.officeAddress}</dd>
          <dt>
            <span id="utilityUpload">
              <Translate contentKey="champion.guarantor.utilityUpload">Utility Upload</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.utilityUpload ? (
              <div>
                {guarantorEntity.utilityUploadContentType ? (
                  <a onClick={openFile(guarantorEntity.utilityUploadContentType, guarantorEntity.utilityUpload)}>
                    <img
                      src={`data:${guarantorEntity.utilityUploadContentType};base64,${guarantorEntity.utilityUpload}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {guarantorEntity.utilityUploadContentType}, {byteSize(guarantorEntity.utilityUpload)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="idUpload">
              <Translate contentKey="champion.guarantor.idUpload">Id Upload</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.idUpload ? (
              <div>
                {guarantorEntity.idUploadContentType ? (
                  <a onClick={openFile(guarantorEntity.idUploadContentType, guarantorEntity.idUpload)}>
                    <img
                      src={`data:${guarantorEntity.idUploadContentType};base64,${guarantorEntity.idUpload}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {guarantorEntity.idUploadContentType}, {byteSize(guarantorEntity.idUpload)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="champion.guarantor.champion">Champion</Translate>
          </dt>
          <dd>{guarantorEntity.champion ? guarantorEntity.champion.championID : ''}</dd>
        </dl>
        <Button tag={Link} to="/guarantor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/guarantor/${guarantorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ guarantor }: IRootState) => ({
  guarantorEntity: guarantor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GuarantorDetail);
