import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bank-details.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BankDetailsDetail = (props: IBankDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bankDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bankDetailsDetailsHeading">
          <Translate contentKey="maxApp.bankDetails.detail.title">BankDetails</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.id}</dd>
          <dt>
            <span id="bankName">
              <Translate contentKey="maxApp.bankDetails.bankName">Bank Name</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.bankName}</dd>
          <dt>
            <span id="accountNumber">
              <Translate contentKey="maxApp.bankDetails.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.accountNumber}</dd>
          <dt>
            <Translate contentKey="maxApp.bankDetails.champion">Champion</Translate>
          </dt>
          <dd>{bankDetailsEntity.champion ? bankDetailsEntity.champion.championID : ''}</dd>
        </dl>
        <Button tag={Link} to="/bank-details" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank-details/${bankDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bankDetails }: IRootState) => ({
  bankDetailsEntity: bankDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsDetail);
