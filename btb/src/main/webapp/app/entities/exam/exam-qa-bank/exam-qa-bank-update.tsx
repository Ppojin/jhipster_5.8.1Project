import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IExam } from 'app/shared/model/exam/exam.model';
import { getEntities as getExams } from 'app/entities/exam/exam/exam.reducer';
import { getEntity, updateEntity, createEntity, reset } from './exam-qa-bank.reducer';
import { IExamQABank } from 'app/shared/model/exam/exam-qa-bank.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExamQABankUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExamQABankUpdateState {
  isNew: boolean;
  examId: string;
}

export class ExamQABankUpdate extends React.Component<IExamQABankUpdateProps, IExamQABankUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      examId: '0',
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

    this.props.getExams();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { examQABankEntity } = this.props;
      const entity = {
        ...examQABankEntity,
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
    this.props.history.push('/entity/exam-qa-bank');
  };

  render() {
    const { examQABankEntity, exams, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="btbApp.examExamQaBank.home.createOrEditLabel">
              <Translate contentKey="btbApp.examExamQaBank.home.createOrEditLabel">Create or edit a ExamQABank</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : examQABankEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="exam-qa-bank-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="idQABankLabel" for="idQABank">
                    <Translate contentKey="btbApp.examExamQaBank.idQABank">Id QA Bank</Translate>
                  </Label>
                  <AvField id="exam-qa-bank-idQABank" type="text" name="idQABank" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/exam-qa-bank" replace color="info">
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
  exams: storeState.exam.entities,
  examQABankEntity: storeState.examQABank.entity,
  loading: storeState.examQABank.loading,
  updating: storeState.examQABank.updating,
  updateSuccess: storeState.examQABank.updateSuccess
});

const mapDispatchToProps = {
  getExams,
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
)(ExamQABankUpdate);
