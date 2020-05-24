import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IExamQABank } from 'app/shared/model/exam/exam-qa-bank.model';
import { getEntities as getExamQaBanks } from 'app/entities/exam/exam-qa-bank/exam-qa-bank.reducer';
import { getEntity, updateEntity, createEntity, reset } from './exam.reducer';
import { IExam } from 'app/shared/model/exam/exam.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExamUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExamUpdateState {
  isNew: boolean;
  idsexamQABank: any[];
}

export class ExamUpdate extends React.Component<IExamUpdateProps, IExamUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsexamQABank: [],
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

    this.props.getExamQaBanks();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { examEntity } = this.props;
      const entity = {
        ...examEntity,
        ...values,
        examQABanks: mapIdList(values.examQABanks)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/exam');
  };

  render() {
    const { examEntity, examQABanks, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="btbApp.examExam.home.createOrEditLabel">
              <Translate contentKey="btbApp.examExam.home.createOrEditLabel">Create or edit a Exam</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : examEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="exam-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="idExamLabel" for="idExam">
                    <Translate contentKey="btbApp.examExam.idExam">Id Exam</Translate>
                  </Label>
                  <AvField
                    id="exam-idExam"
                    type="text"
                    name="idExam"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="btbApp.examExam.title">Title</Translate>
                  </Label>
                  <AvField
                    id="exam-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel">
                    <Translate contentKey="btbApp.examExam.level">Level</Translate>
                  </Label>
                  <AvInput
                    id="exam-level"
                    type="select"
                    className="form-control"
                    name="level"
                    value={(!isNew && examEntity.level) || 'ONE'}
                  >
                    <option value="ONE">
                      <Translate contentKey="btbApp.Level.ONE" />
                    </option>
                    <option value="TWO">
                      <Translate contentKey="btbApp.Level.TWO" />
                    </option>
                    <option value="THREE">
                      <Translate contentKey="btbApp.Level.THREE" />
                    </option>
                    <option value="FOUR">
                      <Translate contentKey="btbApp.Level.FOUR" />
                    </option>
                    <option value="FIVE">
                      <Translate contentKey="btbApp.Level.FIVE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    <Translate contentKey="btbApp.examExam.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="exam-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.examEntity.startDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="endDate">
                    <Translate contentKey="btbApp.examExam.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="exam-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.examEntity.endDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="examQABanks">
                    <Translate contentKey="btbApp.examExam.examQABank">Exam QA Bank</Translate>
                  </Label>
                  <AvInput
                    id="exam-examQABank"
                    type="select"
                    multiple
                    className="form-control"
                    name="examQABanks"
                    value={examEntity.examQABanks && examEntity.examQABanks.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {examQABanks
                      ? examQABanks.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/exam" replace color="info">
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
  examQABanks: storeState.examQABank.entities,
  examEntity: storeState.exam.entity,
  loading: storeState.exam.loading,
  updating: storeState.exam.updating,
  updateSuccess: storeState.exam.updateSuccess
});

const mapDispatchToProps = {
  getExamQaBanks,
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
)(ExamUpdate);
