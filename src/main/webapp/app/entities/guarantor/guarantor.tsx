// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './guarantor.reducer';
import { IGuarantor } from 'app/shared/model/guarantor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGuarantorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Guarantor = (props: IGuarantorProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { guarantorList, match, loading } = props;
  return (
    <div>
      <h2 id="guarantor-heading" data-cy="GuarantorHeading">
        <Translate contentKey="maxApp.guarantor.home.title">Guarantors</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="maxApp.guarantor.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="maxApp.guarantor.home.createLabel">Create new Guarantor</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {guarantorList && guarantorList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="maxApp.guarantor.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.dateOfBirth">Date Of Birth</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.relationship">Relationship</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.knowHowLong">Know How Long</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.occupation">Occupation</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.homeAddress">Home Address</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.officeAddress">Office Address</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.utilityUpload">Utility Upload</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.idUpload">Id Upload</Translate>
                </th>
                <th>
                  <Translate contentKey="maxApp.guarantor.champion">Champion</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {guarantorList.map((guarantor, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${guarantor.id}`} color="link" size="sm">
                      {guarantor.id}
                    </Button>
                  </td>
                  <td>{guarantor.firstName}</td>
                  <td>{guarantor.lastName}</td>
                  <td>
                    {guarantor.dateOfBirth ? <TextFormat type="date" value={guarantor.dateOfBirth} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{guarantor.relationship}</td>
                  <td>{guarantor.knowHowLong}</td>
                  <td>{guarantor.occupation}</td>
                  <td>{guarantor.homeAddress}</td>
                  <td>{guarantor.officeAddress}</td>
                  <td>
                    {guarantor.utilityUpload ? (
                      <div>
                        {guarantor.utilityUploadContentType ? (
                          <a onClick={openFile(guarantor.utilityUploadContentType, guarantor.utilityUpload)}>
                            <img
                              src={`data:${guarantor.utilityUploadContentType};base64,${guarantor.utilityUpload}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {guarantor.utilityUploadContentType}, {byteSize(guarantor.utilityUpload)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {guarantor.idUpload ? (
                      <div>
                        {guarantor.idUploadContentType ? (
                          <a onClick={openFile(guarantor.idUploadContentType, guarantor.idUpload)}>
                            <img src={`data:${guarantor.idUploadContentType};base64,${guarantor.idUpload}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {guarantor.idUploadContentType}, {byteSize(guarantor.idUpload)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{guarantor.champion ? <Link to={`champion/${guarantor.champion.id}`}>{guarantor.champion.championID}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${guarantor.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${guarantor.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${guarantor.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="maxApp.guarantor.home.notFound">No Guarantors found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ guarantor }: IRootState) => ({
  guarantorList: guarantor.entities,
  loading: guarantor.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Guarantor);
