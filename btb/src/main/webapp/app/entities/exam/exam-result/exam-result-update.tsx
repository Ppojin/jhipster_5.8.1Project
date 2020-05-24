import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './exam-result.reducer';
import { IExamResult } from 'app/shared/model/exam/exam-result.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IExamResultUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IExamResultUpdateState {
  isNew: boolean;
}

export class ExamResultUpdate extends React.Component<IExamResultUpdateProps, IExamResultUpdateState> {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { examResultEntity } = this.props;
      const entity = {
        ...examResultEntity,
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
    this.props.history.push('/entity/exam-result');
  };

  render() {
    const { examResultEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { result, resultContentType } = examResultEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="btbApp.examExamResult.home.createOrEditLabel">
              <Translate contentKey="btbApp.examExamResult.home.createOrEditLabel">Create or edit a ExamResult</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : examResultEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="exam-result-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="idExcerciseResultLabel" for="idExcerciseResult">
                    <Translate contentKey="btbApp.examExamResult.idExcerciseResult">Id Excercise Result</Translate>
                  </Label>
                  <AvField
                    id="exam-result-idExcerciseResult"
                    type="text"
                    name="idExcerciseResult"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="scoreLabel" for="score">
                    <Translate contentKey="btbApp.examExamResult.score">Score</Translate>
                  </Label>
                  <AvField id="exam-result-score" type="string" className="form-control" name="score" />
                </AvGroup>
                <AvGroup>
                  <Label id="gitUrlLabel" for="gitUrl">
                    <Translate contentKey="btbApp.examExamResult.gitUrl">Git Url</Translate>
                  </Label>
                  <AvField id="exam-result-gitUrl" type="text" name="gitUrl" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="startDate">
                    <Translate contentKey="btbApp.examExamResult.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="exam-result-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.examResultEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="endDate">
                    <Translate contentKey="btbApp.examExamResult.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="exam-result-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.examResultEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="resultLabel" for="result">
                      <Translate contentKey="btbApp.examExamResult.result">Result</Translate>
                    </Label>
                    <br />
                    {result ? (
                      <div>
                        <a onClick={openFile(resultContentType, result)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {resultContentType}, {byteSize(result)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('result')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_result" type="file" onChange={this.onBlobChange(false, 'result')} />
                    <AvInput type="hidden" name="result" value={result} />
                  </AvGroup>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/exam-result" replace color="info">
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
  examResultEntity: storeState.examResult.entity,
  loading: storeState.examResult.loading,
  updating: storeState.examResult.updating,
  updateSuccess: storeState.examResult.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamResultUpdate);
