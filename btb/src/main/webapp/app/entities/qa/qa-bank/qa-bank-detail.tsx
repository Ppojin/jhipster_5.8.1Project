import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './qa-bank.reducer';
import { IQABank } from 'app/shared/model/qa/qa-bank.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQABankDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class QABankDetail extends React.Component<IQABankDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { qABankEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="btbApp.qaQABank.detail.title">QABank</Translate> [<b>{qABankEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="idQABank">
                <Translate contentKey="btbApp.qaQABank.idQABank">Id QA Bank</Translate>
              </span>
            </dt>
            <dd>{qABankEntity.idQABank}</dd>
            <dt>
              <span id="title">
                <Translate contentKey="btbApp.qaQABank.title">Title</Translate>
              </span>
            </dt>
            <dd>{qABankEntity.title}</dd>
            <dt>
              <span id="contents">
                <Translate contentKey="btbApp.qaQABank.contents">Contents</Translate>
              </span>
            </dt>
            <dd>{qABankEntity.contents}</dd>
            <dt>
              <span id="gitUrl">
                <Translate contentKey="btbApp.qaQABank.gitUrl">Git Url</Translate>
              </span>
            </dt>
            <dd>{qABankEntity.gitUrl}</dd>
            <dt>
              <span id="category">
                <Translate contentKey="btbApp.qaQABank.category">Category</Translate>
              </span>
            </dt>
            <dd>{qABankEntity.category}</dd>
          </dl>
          <Button tag={Link} to="/entity/qa-bank" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/qa-bank/${qABankEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ qABank }: IRootState) => ({
  qABankEntity: qABank.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QABankDetail);
