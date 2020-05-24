import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExamResult, defaultValue } from 'app/shared/model/exam/exam-result.model';

export const ACTION_TYPES = {
  FETCH_EXAMRESULT_LIST: 'examResult/FETCH_EXAMRESULT_LIST',
  FETCH_EXAMRESULT: 'examResult/FETCH_EXAMRESULT',
  CREATE_EXAMRESULT: 'examResult/CREATE_EXAMRESULT',
  UPDATE_EXAMRESULT: 'examResult/UPDATE_EXAMRESULT',
  DELETE_EXAMRESULT: 'examResult/DELETE_EXAMRESULT',
  SET_BLOB: 'examResult/SET_BLOB',
  RESET: 'examResult/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExamResult>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ExamResultState = Readonly<typeof initialState>;

// Reducer

export default (state: ExamResultState = initialState, action): ExamResultState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXAMRESULT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXAMRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXAMRESULT):
    case REQUEST(ACTION_TYPES.UPDATE_EXAMRESULT):
    case REQUEST(ACTION_TYPES.DELETE_EXAMRESULT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXAMRESULT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXAMRESULT):
    case FAILURE(ACTION_TYPES.CREATE_EXAMRESULT):
    case FAILURE(ACTION_TYPES.UPDATE_EXAMRESULT):
    case FAILURE(ACTION_TYPES.DELETE_EXAMRESULT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXAMRESULT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXAMRESULT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXAMRESULT):
    case SUCCESS(ACTION_TYPES.UPDATE_EXAMRESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXAMRESULT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'exam/api/exam-results';

// Actions

export const getEntities: ICrudGetAllAction<IExamResult> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EXAMRESULT_LIST,
    payload: axios.get<IExamResult>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IExamResult> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXAMRESULT,
    payload: axios.get<IExamResult>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExamResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXAMRESULT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExamResult> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXAMRESULT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExamResult> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXAMRESULT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
