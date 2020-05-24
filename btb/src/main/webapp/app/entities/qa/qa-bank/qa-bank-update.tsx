import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './qa-bank.reducer';
import { IQABank } from 'app/shared/model/qa/qa-bank.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQABankUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IQABankUpdateState {
  isNew: boolean;
}

export class QABankUpdate extends React.Component<IQABankUpdateProps, IQABankUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { qABankEntity } = this.props;
      const entity = {
        ...qABankEntity,
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
    this.props.history.push('/entity/qa-bank');
  };

  render() {
    const { qABankEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="btbApp.qaQABank.home.createOrEditLabel">
              <Translate contentKey="btbApp.qaQABank.home.createOrEditLabel">Create or edit a QABank</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : qABankEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="qa-bank-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="idQABankLabel" for="idQABank">
                    <Translate contentKey="btbApp.qaQABank.idQABank">Id QA Bank</Translate>
                  </Label>
                  <AvField
                    id="qa-bank-idQABank"
                    type="text"
                    name="idQABank"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="btbApp.qaQABank.title">Title</Translate>
                  </Label>
                  <AvField
                    id="qa-bank-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contentsLabel" for="contents">
                    <Translate contentKey="btbApp.qaQABank.contents">Contents</Translate>
                  </Label>
                  <AvField
                    id="qa-bank-contents"
                    type="text"
                    name="contents"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="gitUrlLabel" for="gitUrl">
                    <Translate contentKey="btbApp.qaQABank.gitUrl">Git Url</Translate>
                  </Label>
                  <AvField
                    id="qa-bank-gitUrl"
                    type="text"
                    name="gitUrl"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel">
                    <Translate contentKey="btbApp.qaQABank.category">Category</Translate>
                  </Label>
                  <AvInput
                    id="qa-bank-category"
                    type="select"
                    className="form-control"
                    name="category"
                    value={(!isNew && qABankEntity.category) || 'SERVICE'}
                  >
                    <option value="SERVICE">
                      <Translate contentKey="btbApp.Category.SERVICE" />
                    </option>
                    <option value="CONTROLLER">
                      <Translate contentKey="btbApp.Category.CONTROLLER" />
                    </option>
                    <option value="SECURITY">
                      <Translate contentKey="btbApp.Category.SECURITY" />
                    </option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/qa-bank" replace color="info">
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
  qABankEntity: storeState.qABank.entity,
  loading: storeState.qABank.loading,
  updating: storeState.qABank.updating,
  updateSuccess: storeState.qABank.updateSuccess
});

const mapDispatchToProps = {
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
)(QABankUpdate);
