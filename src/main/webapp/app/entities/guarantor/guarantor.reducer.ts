import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGuarantor, defaultValue } from 'app/shared/model/guarantor.model';

export const ACTION_TYPES = {
  FETCH_GUARANTOR_LIST: 'guarantor/FETCH_GUARANTOR_LIST',
  FETCH_GUARANTOR: 'guarantor/FETCH_GUARANTOR',
  CREATE_GUARANTOR: 'guarantor/CREATE_GUARANTOR',
  UPDATE_GUARANTOR: 'guarantor/UPDATE_GUARANTOR',
  PARTIAL_UPDATE_GUARANTOR: 'guarantor/PARTIAL_UPDATE_GUARANTOR',
  DELETE_GUARANTOR: 'guarantor/DELETE_GUARANTOR',
  SET_BLOB: 'guarantor/SET_BLOB',
  RESET: 'guarantor/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGuarantor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type GuarantorState = Readonly<typeof initialState>;

// Reducer

export default (state: GuarantorState = initialState, action): GuarantorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GUARANTOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GUARANTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GUARANTOR):
    case REQUEST(ACTION_TYPES.UPDATE_GUARANTOR):
    case REQUEST(ACTION_TYPES.DELETE_GUARANTOR):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_GUARANTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GUARANTOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GUARANTOR):
    case FAILURE(ACTION_TYPES.CREATE_GUARANTOR):
    case FAILURE(ACTION_TYPES.UPDATE_GUARANTOR):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_GUARANTOR):
    case FAILURE(ACTION_TYPES.DELETE_GUARANTOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GUARANTOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GUARANTOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GUARANTOR):
    case SUCCESS(ACTION_TYPES.UPDATE_GUARANTOR):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_GUARANTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GUARANTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/guarantors';

// Actions

export const getEntities: ICrudGetAllAction<IGuarantor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GUARANTOR_LIST,
  payload: axios.get<IGuarantor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IGuarantor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GUARANTOR,
    payload: axios.get<IGuarantor>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGuarantor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GUARANTOR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGuarantor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GUARANTOR,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IGuarantor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_GUARANTOR,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGuarantor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GUARANTOR,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
