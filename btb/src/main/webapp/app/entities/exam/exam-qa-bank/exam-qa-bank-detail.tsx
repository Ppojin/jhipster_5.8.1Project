import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './exam-qa-bank.reducer';
import { IExamQABank } from 'app/shared/model/exam/exam-qa-bank.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExamQABankDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExamQABankDetail extends React.Component<IExamQABankDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { examQABankEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="btbApp.examExamQaBank.detail.title">ExamQABank</Translate> [<b>{examQABankEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="idQABank">
                <Translate contentKey="btbApp.examExamQaBank.idQABank">Id QA Bank</Translate>
              </span>
            </dt>
            <dd>{examQABankEntity.idQABank}</dd>
          </dl>
          <Button tag={Link} to="/entity/exam-qa-bank" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/exam-qa-bank/${examQABankEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ examQABank }: IRootState) => ({
  examQABankEntity: examQABank.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamQABankDetail);
