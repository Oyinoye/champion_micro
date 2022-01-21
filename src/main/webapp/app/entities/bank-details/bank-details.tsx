// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bank-details.reducer';
import { IBankDetails } from 'app/shared/model/bank-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BankDetails = (props: IBankDetailsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { bankDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="bank-details-heading" data-cy="BankDetailsHeading">
        <Translate contentKey="championApp.bankDetails.home.title">Bank Details</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="championApp.bankDetails.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="championApp.bankDetails.home.createLabel">Create new Bank Details</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bankDetailsList && bankDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="championApp.bankDetails.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.bankDetails.bankName">Bank Name</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.bankDetails.accountNumber">Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="championApp.bankDetails.champion">Champion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bankDetailsList.map((bankDetails, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${bankDetails.id}`} color="link" size="sm">
                      {bankDetails.id}
                    </Button>
                  </td>
                  <td>{bankDetails.bankName}</td>
                  <td>{bankDetails.accountNumber}</td>
                  <td>
                    {bankDetails.champion ? <Link to={`champion/${bankDetails.champion.id}`}>{bankDetails.champion.championID}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bankDetails.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bankDetails.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bankDetails.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="championApp.bankDetails.home.notFound">No Bank Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bankDetails }: IRootState) => ({
  bankDetailsList: bankDetails.entities,
  loading: bankDetails.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
