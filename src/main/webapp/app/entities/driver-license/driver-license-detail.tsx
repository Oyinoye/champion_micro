import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver-license.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverLicenseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverLicenseDetail = (props: IDriverLicenseDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverLicenseEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="driverLicenseDetailsHeading">
          <Translate contentKey="maxApp.driverLicense.detail.title">DriverLicense</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.id}</dd>
          <dt>
            <span id="licenseNumber">
              <Translate contentKey="maxApp.driverLicense.licenseNumber">License Number</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.licenseNumber}</dd>
          <dt>
            <span id="issueDate">
              <Translate contentKey="maxApp.driverLicense.issueDate">Issue Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.issueDate ? (
              <TextFormat value={driverLicenseEntity.issueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="expiryDate">
              <Translate contentKey="maxApp.driverLicense.expiryDate">Expiry Date</Translate>
            </span>
          </dt>
          <dd>
            {driverLicenseEntity.expiryDate ? (
              <TextFormat value={driverLicenseEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="address">
              <Translate contentKey="maxApp.driverLicense.address">Address</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.address}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="maxApp.driverLicense.comment">Comment</Translate>
            </span>
          </dt>
          <dd>{driverLicenseEntity.comment}</dd>
          <dt>
            <Translate contentKey="maxApp.driverLicense.champion">Champion</Translate>
          </dt>
          <dd>{driverLicenseEntity.champion ? driverLicenseEntity.champion.championID : ''}</dd>
        </dl>
        <Button tag={Link} to="/driver-license" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver-license/${driverLicenseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driverLicense }: IRootState) => ({
  driverLicenseEntity: driverLicense.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicenseDetail);
