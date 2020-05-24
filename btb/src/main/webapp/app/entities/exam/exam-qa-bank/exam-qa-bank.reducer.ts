import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IExamQABank, defaultValue } from 'app/shared/model/exam/exam-qa-bank.model';

export const ACTION_TYPES = {
  FETCH_EXAMQABANK_LIST: 'examQABank/FETCH_EXAMQABANK_LIST',
  FETCH_EXAMQABANK: 'examQABank/FETCH_EXAMQABANK',
  CREATE_EXAMQABANK: 'examQABank/CREATE_EXAMQABANK',
  UPDATE_EXAMQABANK: 'examQABank/UPDATE_EXAMQABANK',
  DELETE_EXAMQABANK: 'examQABank/DELETE_EXAMQABANK',
  RESET: 'examQABank/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExamQABank>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ExamQABankState = Readonly<typeof initialState>;

// Reducer

export default (state: ExamQABankState = initialState, action): ExamQABankState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXAMQABANK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXAMQABANK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXAMQABANK):
    case REQUEST(ACTION_TYPES.UPDATE_EXAMQABANK):
    case REQUEST(ACTION_TYPES.DELETE_EXAMQABANK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXAMQABANK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXAMQABANK):
    case FAILURE(ACTION_TYPES.CREATE_EXAMQABANK):
    case FAILURE(ACTION_TYPES.UPDATE_EXAMQABANK):
    case FAILURE(ACTION_TYPES.DELETE_EXAMQABANK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXAMQABANK_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXAMQABANK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXAMQABANK):
    case SUCCESS(ACTION_TYPES.UPDATE_EXAMQABANK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXAMQABANK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'exam/api/exam-qa-banks';

// Actions

export const getEntities: ICrudGetAllAction<IExamQABank> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EXAMQABANK_LIST,
    payload: axios.get<IExamQABank>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IExamQABank> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXAMQABANK,
    payload: axios.get<IExamQABank>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExamQABank> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXAMQABANK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExamQABank> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXAMQABANK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExamQABank> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXAMQABANK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
