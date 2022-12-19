/* eslint-disable no-param-reassign */
import Axios from 'axios';
import Cookies from 'js-cookie';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API_URL = process.env.API_URL || publicRuntimeConfig.API_URL;

const instance = Axios.create({
  baseURL: typeof window !== 'undefined' ? API_URL : process.env.API_NODE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.headers.Authorization = Cookies.get('token');
    const AcceptLanguage = window.localStorage.getItem('Accept-Language');
    if (AcceptLanguage) {
      config.headers['Accept-Language'] = AcceptLanguage;
    }
  }
  return config;
});

export default instance;
