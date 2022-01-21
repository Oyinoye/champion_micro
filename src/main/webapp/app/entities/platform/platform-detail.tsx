import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './platform.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlatformDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlatformDetail = (props: IPlatformDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { platformEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="platformDetailsHeading">
          <Translate contentKey="championApp.platform.detail.title">Platform</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{platformEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="championApp.platform.code">Code</Translate>
            </span>
          </dt>
          <dd>{platformEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="championApp.platform.description">Description</Translate>
            </span>
          </dt>
          <dd>{platformEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/platform" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/platform/${platformEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ platform }: IRootState) => ({
  platformEntity: platform.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetail);
