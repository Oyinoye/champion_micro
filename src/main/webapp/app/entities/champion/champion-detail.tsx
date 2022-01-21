import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './champion.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IChampionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ChampionDetail = (props: IChampionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { championEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="championDetailsHeading">
          <Translate contentKey="championApp.champion.detail.title">Champion</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{championEntity.id}</dd>
          <dt>
            <span id="championID">
              <Translate contentKey="championApp.champion.championID">Champion ID</Translate>
            </span>
          </dt>
          <dd>{championEntity.championID}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="championApp.champion.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{championEntity.phoneNumber}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="championApp.champion.status">Status</Translate>
            </span>
          </dt>
          <dd>{championEntity.status}</dd>
          <dt>
            <span id="bvn">
              <Translate contentKey="championApp.champion.bvn">Bvn</Translate>
            </span>
          </dt>
          <dd>{championEntity.bvn}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="championApp.champion.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {championEntity.dateOfBirth ? (
              <TextFormat value={championEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="championApp.champion.user">User</Translate>
          </dt>
          <dd>{championEntity.user ? championEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="championApp.champion.platform">Platform</Translate>
          </dt>
          <dd>{championEntity.platform ? championEntity.platform.code : ''}</dd>
        </dl>
        <Button tag={Link} to="/champion" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/champion/${championEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ champion }: IRootState) => ({
  championEntity: champion.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ChampionDetail);
