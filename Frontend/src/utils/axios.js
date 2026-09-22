//centeralized API setup

//axios is a library we used to get api requests
import axios from 'axios';
// qs is basically used to convert javascript objects into url query string
import qs from 'qs';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
    ,
    //withcredentials allows the browser to send cookies with the api requests, its useful for authentications, cookies...
    withCredentials: true,
    //this controls how query parameter are converted into the url
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

