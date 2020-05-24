import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './exam.reducer';
import { IExam } from 'app/shared/model/exam/exam.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExamDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExamDetail extends React.Component<IExamDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { examEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="btbApp.examExam.detail.title">Exam</Translate> [<b>{examEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="idExam">
                <Translate contentKey="btbApp.examExam.idExam">Id Exam</Translate>
              </span>
            </dt>
            <dd>{examEntity.idExam}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="btbApp.examExam.title">Title</Translate>
              </span>
            </dt>
            <dd>{examEntity.title}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="btbApp.examExam.level">Level</Translate>
              </span>
            </dt>
            <dd>{examEntity.level}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="btbApp.examExam.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={examEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="btbApp.examExam.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={examEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="btbApp.examExam.examQABank">Exam QA Bank</Translate>
            </dt>
            <dd>
              {examEntity.examQABanks
                ? examEntity.examQABanks.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === examEntity.examQABanks.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/exam" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/exam/${examEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ exam }: IRootState) => ({
  examEntity: exam.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamDetail);
