// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver-license.reducer';
import { IDriverLicense } from 'app/shared/model/driver-license.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverLicenseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DriverLicense = (props: IDriverLicenseProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { driverLicenseList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-license-heading" data-cy="DriverLicenseHeading">
        <Translate contentKey="maxApp.driverLicense.home.title">Driver Licenses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="maxApp.driverLicense.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="maxApp.driverLicense.home.createLabel">Create new Driver License</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {driverLicenseList && driverLicenseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="maxApp.driverLicense.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.driverLicense.licenseNumber">License Number</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.driverLicense.issueDate">Issue Date</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.driverLicense.expiryDate">Expiry Date</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.driverLicense.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.driverLicense.comment">Comment</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.driverLicense.champion">Champion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverLicenseList.map((driverLicense, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${driverLicense.id}`} color="link" size="sm">
                      {driverLicense.id}
                    </Button>
                  </td>
                  <td>{driverLicense.licenseNumber}</td>
                  <td>
                    {driverLicense.issueDate ? (
                      <TextFormat type="date" value={driverLicense.issueDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {driverLicense.expiryDate ? (
                      <TextFormat type="date" value={driverLicense.expiryDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{driverLicense.address}</td>
                  <td>{driverLicense.comment}</td>
                  <td>
                    {driverLicense.champion ? (
                      <Link to={`champion/${driverLicense.champion.id}`}>{driverLicense.champion.championID}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driverLicense.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driverLicense.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${driverLicense.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="maxApp.driverLicense.home.notFound">No Driver Licenses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driverLicense }: IRootState) => ({
  driverLicenseList: driverLicense.entities,
  loading: driverLicense.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverLicense);
