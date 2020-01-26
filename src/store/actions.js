import * as Types from "./types";
import * as API from '../services/APIService';

export const setUser = user => ({
    type: Types.SET_USER,
    user
});

export const setFilter = filter => ({
    type: Types.SET_FILTER,
    filter
});

export const fetchAdverts = (filters, paginationFilters, source) => (
    async (dispatch, getState) => {
        dispatch(fetchAdvertsRequest());
        try {
            const adverts = await API.listAdverts(filters, paginationFilters, source);
            dispatch(fetchAdvertsSuccess(adverts));
        } catch (error) {
            dispatch(fetchAdvertsFailure(error));
        }
    }
);

export const fetchAdvert = (id, source) => (
    async (dispatch, getState) => {
        const { currentAdvert } = getState(); 
        if (Object.entries(currentAdvert).length === 0 || currentAdvert.result.id !== id ) {
            dispatch(fetchAdvertRequest());
            try {
                const advert = await API.getAdvertById(id, source);
                
                if (advert.success) dispatch(fetchAdvertSuccess(advert));
                else dispatch(fetchAdvertFailure('Anuncio no encontrado'));            
            } catch (error) {
                dispatch(fetchAdvertFailure(error));
            }
        }
    }
);

export const createAdvert = (advert, source) => {
    return async function (dispatch, getState) {
      dispatch(createAdvertRequest(advert));
      try {
        const response = await API.createAdvert(advert, source);
        dispatch(createAdvertSuccess(response));
      } catch (error) {
        dispatch(createAdvertFailure(error));
      }
    }
};

export const updateAdvert = (advert, source) => {
    return async function (dispatch, getState) {
      dispatch(updateAdvertRequest(advert));
      try {
        const response = await API.updateAdvert(advert, source);
        dispatch(updateAdvertSuccess(response));
      } catch (error) {
        dispatch(updateAdvertFailure(error));
      }
    }
};
  
export const fetchAdvertsRequest = () => ({
    type: Types.FETCH_ADVERTS_REQUEST
});

export const fetchAdvertsSuccess = adverts => ({
    type: Types.FETCH_ADVERTS_SUCCESS,
    adverts
});

export const fetchAdvertsFailure = error => ({
    type: Types.FETCH_ADVERTS_FAILURE,
    error
});

export const fetchAdvertRequest = () => ({
    type: Types.FETCH_ADVERT_REQUEST
});

export const fetchAdvertSuccess = advert => ({
    type: Types.FETCH_ADVERT_SUCCESS,
    advert
});

export const fetchAdvertFailure = error => ({
    type: Types.FETCH_ADVERT_FAILURE,
    error
});

export const createAdvertRequest = () => ({
    type: Types.CREATE_ADVERT_REQUEST,
});

export const createAdvertSuccess = advert => ({
    type: Types.CREATE_ADVERT_SUCCESS,
    advert
});

export const createAdvertFailure = error => ({
    type: Types.CREATE_ADVERT_FAILURE,
    error
});

export const updateAdvertRequest = () => ({
    type: Types.UPDATE_ADVERT_REQUEST,
});

export const updateAdvertSuccess = advert => ({
    type: Types.UPDATE_ADVERT_SUCCESS,
    advert
});

export const updateAdvertFailure = error => ({
    type: Types.UPDATE_ADVERT_FAILURE,
    error
});
