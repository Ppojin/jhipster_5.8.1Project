import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IExamStudent, defaultValue } from 'app/shared/model/exam/exam-student.model';

export const ACTION_TYPES = {
  FETCH_EXAMSTUDENT_LIST: 'examStudent/FETCH_EXAMSTUDENT_LIST',
  FETCH_EXAMSTUDENT: 'examStudent/FETCH_EXAMSTUDENT',
  CREATE_EXAMSTUDENT: 'examStudent/CREATE_EXAMSTUDENT',
  UPDATE_EXAMSTUDENT: 'examStudent/UPDATE_EXAMSTUDENT',
  DELETE_EXAMSTUDENT: 'examStudent/DELETE_EXAMSTUDENT',
  RESET: 'examStudent/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExamStudent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ExamStudentState = Readonly<typeof initialState>;

// Reducer

export default (state: ExamStudentState = initialState, action): ExamStudentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXAMSTUDENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXAMSTUDENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXAMSTUDENT):
    case REQUEST(ACTION_TYPES.UPDATE_EXAMSTUDENT):
    case REQUEST(ACTION_TYPES.DELETE_EXAMSTUDENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXAMSTUDENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXAMSTUDENT):
    case FAILURE(ACTION_TYPES.CREATE_EXAMSTUDENT):
    case FAILURE(ACTION_TYPES.UPDATE_EXAMSTUDENT):
    case FAILURE(ACTION_TYPES.DELETE_EXAMSTUDENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXAMSTUDENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXAMSTUDENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXAMSTUDENT):
    case SUCCESS(ACTION_TYPES.UPDATE_EXAMSTUDENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXAMSTUDENT):
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

const apiUrl = 'exam/api/exam-students';

// Actions

export const getEntities: ICrudGetAllAction<IExamStudent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXAMSTUDENT_LIST,
  payload: axios.get<IExamStudent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IExamStudent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXAMSTUDENT,
    payload: axios.get<IExamStudent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExamStudent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXAMSTUDENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExamStudent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXAMSTUDENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExamStudent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXAMSTUDENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
