import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/btb/customer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICustomerUpdateState {
  isNew: boolean;
  userId: string;
}

export class CustomerUpdate extends React.Component<ICustomerUpdateProps, ICustomerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.signinDate = convertDateTimeToServer(values.signinDate);

    if (errors.length === 0) {
      const { customerEntity } = this.props;
      const entity = {
        ...customerEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/customer');
  };

  render() {
    const { customerEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="btbApp.btbCustomer.home.createOrEditLabel">
              <Translate contentKey="btbApp.btbCustomer.home.createOrEditLabel">Create or edit a Customer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : customerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="idCustomerLabel" for="idCustomer">
                    <Translate contentKey="btbApp.btbCustomer.idCustomer">Id Customer</Translate>
                  </Label>
                  <AvField
                    id="customer-idCustomer"
                    type="text"
                    name="idCustomer"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="firstNameLabel" for="firstName">
                    <Translate contentKey="btbApp.btbCustomer.firstName">First Name</Translate>
                  </Label>
                  <AvField
                    id="customer-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="lastName">
                    <Translate contentKey="btbApp.btbCustomer.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    id="customer-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel">
                    <Translate contentKey="btbApp.btbCustomer.gender">Gender</Translate>
                  </Label>
                  <AvInput
                    id="customer-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && customerEntity.gender) || 'MALE'}
                  >
                    <option value="MALE">
                      <Translate contentKey="btbApp.Gender.MALE" />
                    </option>
                    <option value="FEMALE">
                      <Translate contentKey="btbApp.Gender.FEMALE" />
                    </option>
                    <option value="TRANCE">
                      <Translate contentKey="btbApp.Gender.TRANCE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="email">
                    <Translate contentKey="btbApp.btbCustomer.email">Email</Translate>
                  </Label>
                  <AvField
                    id="customer-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      pattern: {
                        value: '^[^@s]+@[^@s]+.[^@s]+$',
                        errorMessage: translate('entity.validation.pattern', { pattern: '^[^@s]+@[^@s]+.[^@s]+$' })
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneLabel" for="phone">
                    <Translate contentKey="btbApp.btbCustomer.phone">Phone</Translate>
                  </Label>
                  <AvField
                    id="customer-phone"
                    type="text"
                    name="phone"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="city">
                    <Translate contentKey="btbApp.btbCustomer.city">City</Translate>
                  </Label>
                  <AvField
                    id="customer-city"
                    type="text"
                    name="city"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="signinDateLabel" for="signinDate">
                    <Translate contentKey="btbApp.btbCustomer.signinDate">Signin Date</Translate>
                  </Label>
                  <AvInput
                    id="customer-signinDate"
                    type="datetime-local"
                    className="form-control"
                    name="signinDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.customerEntity.signinDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel">
                    <Translate contentKey="btbApp.btbCustomer.role">Role</Translate>
                  </Label>
                  <AvInput
                    id="customer-role"
                    type="select"
                    className="form-control"
                    name="role"
                    value={(!isNew && customerEntity.role) || 'STUDENT'}
                  >
                    <option value="STUDENT">
                      <Translate contentKey="btbApp.Role.STUDENT" />
                    </option>
                    <option value="TEACHER">
                      <Translate contentKey="btbApp.Role.TEACHER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="btbApp.btbCustomer.user">User</Translate>
                  </Label>
                  <AvInput
                    id="customer-user"
                    type="select"
                    className="form-control"
                    name="user.id"
                    value={isNew ? users[0] && users[0].id : customerEntity.user.id}
                  >
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/customer" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerUpdate);
