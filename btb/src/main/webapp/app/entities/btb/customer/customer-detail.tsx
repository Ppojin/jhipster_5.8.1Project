import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/btb/customer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomerDetail extends React.Component<ICustomerDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customerEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="btbApp.btbCustomer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="idCustomer">
                <Translate contentKey="btbApp.btbCustomer.idCustomer">Id Customer</Translate>
              </span>
            </dt>
            <dd>{customerEntity.idCustomer}</dd>
            <dt>
              <span id="firstName">
                <Translate contentKey="btbApp.btbCustomer.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{customerEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="btbApp.btbCustomer.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{customerEntity.lastName}</dd>
            <dt>
              <span id="gender">
                <Translate contentKey="btbApp.btbCustomer.gender">Gender</Translate>
              </span>
            </dt>
            <dd>{customerEntity.gender}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="btbApp.btbCustomer.email">Email</Translate>
              </span>
            </dt>
            <dd>{customerEntity.email}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="btbApp.btbCustomer.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{customerEntity.phone}</dd>
            <dt>
              <span id="city">
                <Translate contentKey="btbApp.btbCustomer.city">City</Translate>
              </span>
            </dt>
            <dd>{customerEntity.city}</dd>
            <dt>
              <span id="signinDate">
                <Translate contentKey="btbApp.btbCustomer.signinDate">Signin Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={customerEntity.signinDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="role">
                <Translate contentKey="btbApp.btbCustomer.role">Role</Translate>
              </span>
            </dt>
            <dd>{customerEntity.role}</dd>
            <dt>
              <Translate contentKey="btbApp.btbCustomer.user">User</Translate>
            </dt>
            <dd>{customerEntity.user ? customerEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/customer" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/customer/${customerEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetail);
