import axios from 'axios';
import Advert from '../models/Advert';
const API_URL = `http://localhost:3001/apiv1`;

const getRequest = (url, cancelTokenSource) => {
    return axios.get(url, { cancelToken: cancelTokenSource.token })
    .then( res => res.data )
    .catch( error => handleRequestError(error));
};

const postRequest = (url, data, cancelTokenSource) => {
    return axios.post(url, data, { cancelToken: cancelTokenSource.token })    
    .then( res => res.data)
    .catch( error => handleRequestError(error));
};

const putRequest = (url, data, cancelTokenSource) => {
    return axios.put(url, data, { cancelToken: cancelTokenSource.token })
    .then( res => res.data)
    .catch( error => handleRequestError(error));
};

const handleRequestError = error => {
    if (axios.isCancel(error)) {
        return false;
    }
};

const listAdverts = async ({name, price, tag, selling}, {adsPerPage, page}, cancelTokenSource) => {
    let queryParams = '';
    if (name && name.length) queryParams += (`${getQueryParamToken(queryParams)}nombre=${name}`); 
    if (price && price.length) queryParams += (`${getQueryParamToken(queryParams)}precio=${price}`); 
    if (tag && tag.length) queryParams += (`${getQueryParamToken(queryParams)}tag=${tag}`); 
    if (selling && selling.length) queryParams += (`${getQueryParamToken(queryParams)}venta=${selling}`);

    queryParams += `${getQueryParamToken(queryParams)}limite=${adsPerPage}`;
    queryParams += page > 1 ? (`${getQueryParamToken(queryParams)}skip=${--page * adsPerPage}`) : '';

    const res = await getRequest(`${API_URL}/anuncios${queryParams}`, cancelTokenSource);

    if ( !res ) return;

    res.results = res.results.map( advert => new Advert(advert));

    return res;
};

const getQueryParamToken = queryParams => queryParams.length === 0 ? '?' : '&';
const getAdvertById = async (id, cancelTokenSource) => {
    const res = await getRequest(`${API_URL}/anuncios/${id}`, cancelTokenSource);
    if ( res )
        res.result = new Advert(res.result);

    return res;
};

const createAdvert = async (_advert, cancelTokenSource) => {
    const res = await postRequest(`${API_URL}/anuncios/`, _advert, cancelTokenSource);
    if ( !res ) return { succes: false, result: null } ;
    res.result = new Advert(res.result);
    return res;
};

const updateAdvert = async (_advert, cancelTokenSource) => {
    const res = await putRequest(`${API_URL}/anuncios/${_advert.id}`, _advert, cancelTokenSource);
     if ( !res ) return { succes: false, result: null } ;
    res.result = new Advert(res.result);
    return res;
};

const getTags = async cancelTokenSource => {
    const res = await getRequest(`${API_URL}/tags`, cancelTokenSource);
    if ( !res ) return ;
    return res.results;
};

export {
    listAdverts,
    getAdvertById,
    createAdvert,
    updateAdvert,
    getTags
};