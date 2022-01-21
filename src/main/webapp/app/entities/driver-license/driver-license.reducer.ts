import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDriverLicense, defaultValue } from 'app/shared/model/driver-license.model';

export const ACTION_TYPES = {
  FETCH_DRIVERLICENSE_LIST: 'driverLicense/FETCH_DRIVERLICENSE_LIST',
  FETCH_DRIVERLICENSE: 'driverLicense/FETCH_DRIVERLICENSE',
  CREATE_DRIVERLICENSE: 'driverLicense/CREATE_DRIVERLICENSE',
  UPDATE_DRIVERLICENSE: 'driverLicense/UPDATE_DRIVERLICENSE',
  PARTIAL_UPDATE_DRIVERLICENSE: 'driverLicense/PARTIAL_UPDATE_DRIVERLICENSE',
  DELETE_DRIVERLICENSE: 'driverLicense/DELETE_DRIVERLICENSE',
  RESET: 'driverLicense/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDriverLicense>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type DriverLicenseState = Readonly<typeof initialState>;

// Reducer

export default (state: DriverLicenseState = initialState, action): DriverLicenseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRIVERLICENSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRIVERLICENSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DRIVERLICENSE):
    case REQUEST(ACTION_TYPES.UPDATE_DRIVERLICENSE):
    case REQUEST(ACTION_TYPES.DELETE_DRIVERLICENSE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_DRIVERLICENSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DRIVERLICENSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRIVERLICENSE):
    case FAILURE(ACTION_TYPES.CREATE_DRIVERLICENSE):
    case FAILURE(ACTION_TYPES.UPDATE_DRIVERLICENSE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_DRIVERLICENSE):
    case FAILURE(ACTION_TYPES.DELETE_DRIVERLICENSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVERLICENSE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRIVERLICENSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRIVERLICENSE):
    case SUCCESS(ACTION_TYPES.UPDATE_DRIVERLICENSE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_DRIVERLICENSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRIVERLICENSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/driver-licenses';

// Actions

export const getEntities: ICrudGetAllAction<IDriverLicense> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRIVERLICENSE_LIST,
  payload: axios.get<IDriverLicense>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IDriverLicense> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRIVERLICENSE,
    payload: axios.get<IDriverLicense>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDriverLicense> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRIVERLICENSE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDriverLicense> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRIVERLICENSE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IDriverLicense> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_DRIVERLICENSE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDriverLicense> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRIVERLICENSE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
