import $ from "jquery";
import {AuthError, NotFoundError, ServerError, ValidationError} from "./requestErrors";

const Api = {

  // Nest the error types so we don't have to have multiple imports everywhere
  ValidationError,
  NotFoundError,
  AuthError,
  ServerError,

  /**
   *
   * @param   {string} method
   * @param   {string} url
   * @param   {object} data
   * @returns {Promise<object>}
   */
  async request(method, url, data = {}) {
    let response;

    try {
      response = await $.ajax({
        data, method, url,
        headers: {},
        dataType: 'json'
      });

    } catch (e) {
      response = e.responseJSON || {
        code: e.status,
        status: 'error',
        message: 'REQUEST ERROR',
        data: {}
      };
    }

    if (response.status === 'success') return response;

    if (response.code === 422) throw new Api.ValidationError(response);
    if (response.code === 404) throw new Api.NotFoundError(response);
    if (response.code === 401) throw new Api.AuthError(response);
    throw new Api.ServerError(response);
  },

  /**
   * @param   {string} url
   * @param   {object} params
   * @returns {Promise<object>}
   */
  async get(url, params) {
    return await Api.request('get', url, params);
  },

  /**
   * @param   {string} url
   * @param   {object} data
   * @returns {Promise<object>}
   */
  async post(url, data) {
    return await Api.request('post', url, data);
  },

  /**
   * @param   {string} url
   * @param   {object} data
   * @returns {Promise<object>}
   */
  async put(url, data) {
    return await Api.request('put', url, data);
  },

  /**
   * @param   {string} url
   * @param   {object} data
   * @returns {Promise<object>}
   */
  async patch(url, data) {
    return await Api.request('patch', url, data);
  },

  /**
   * @param   {string} url
   * @param   {object} params
   * @returns {Promise<object>}
   */
  async delete(url, params) {
    return await Api.request('delete', url, params);
  },
};

export default Api;
