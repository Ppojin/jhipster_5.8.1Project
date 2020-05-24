import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './exam-result.reducer';
import { IExamResult } from 'app/shared/model/exam/exam-result.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IExamResultProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IExamResultState = IPaginationBaseState;

export class ExamResult extends React.Component<IExamResultProps, IExamResultState> {
  state: IExamResultState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { examResultList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="exam-result-heading">
          <Translate contentKey="btbApp.examExamResult.home.title">Exam Results</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="btbApp.examExamResult.home.createLabel">Create new Exam Result</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('idExcerciseResult')}>
                  <Translate contentKey="btbApp.examExamResult.idExcerciseResult">Id Excercise Result</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('score')}>
                  <Translate contentKey="btbApp.examExamResult.score">Score</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('gitUrl')}>
                  <Translate contentKey="btbApp.examExamResult.gitUrl">Git Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('startDate')}>
                  <Translate contentKey="btbApp.examExamResult.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('endDate')}>
                  <Translate contentKey="btbApp.examExamResult.endDate">End Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('result')}>
                  <Translate contentKey="btbApp.examExamResult.result">Result</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {examResultList.map((examResult, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${examResult.id}`} color="link" size="sm">
                      {examResult.id}
                    </Button>
                  </td>
                  <td>{examResult.idExcerciseResult}</td>
                  <td>{examResult.score}</td>
                  <td>{examResult.gitUrl}</td>
                  <td>
                    <TextFormat type="date" value={examResult.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={examResult.endDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {examResult.result ? (
                      <div>
                        <a onClick={openFile(examResult.resultContentType, examResult.result)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                          &nbsp;
                        </a>
                        <span>
                          {examResult.resultContentType}, {byteSize(examResult.result)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${examResult.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${examResult.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${examResult.id}/delete`} color="danger" size="sm">
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
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ examResult }: IRootState) => ({
  examResultList: examResult.entities,
  totalItems: examResult.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamResult);
