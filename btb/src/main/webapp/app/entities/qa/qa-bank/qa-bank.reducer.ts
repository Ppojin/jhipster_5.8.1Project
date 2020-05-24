import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IQABank, defaultValue } from 'app/shared/model/qa/qa-bank.model';

export const ACTION_TYPES = {
  FETCH_QABANK_LIST: 'qABank/FETCH_QABANK_LIST',
  FETCH_QABANK: 'qABank/FETCH_QABANK',
  CREATE_QABANK: 'qABank/CREATE_QABANK',
  UPDATE_QABANK: 'qABank/UPDATE_QABANK',
  DELETE_QABANK: 'qABank/DELETE_QABANK',
  RESET: 'qABank/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IQABank>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type QABankState = Readonly<typeof initialState>;

// Reducer

export default (state: QABankState = initialState, action): QABankState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_QABANK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_QABANK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_QABANK):
    case REQUEST(ACTION_TYPES.UPDATE_QABANK):
    case REQUEST(ACTION_TYPES.DELETE_QABANK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_QABANK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_QABANK):
    case FAILURE(ACTION_TYPES.CREATE_QABANK):
    case FAILURE(ACTION_TYPES.UPDATE_QABANK):
    case FAILURE(ACTION_TYPES.DELETE_QABANK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_QABANK_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_QABANK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_QABANK):
    case SUCCESS(ACTION_TYPES.UPDATE_QABANK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_QABANK):
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

const apiUrl = 'qa/api/qa-banks';

// Actions

export const getEntities: ICrudGetAllAction<IQABank> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_QABANK_LIST,
    payload: axios.get<IQABank>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IQABank> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_QABANK,
    payload: axios.get<IQABank>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IQABank> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_QABANK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IQABank> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_QABANK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IQABank> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_QABANK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
