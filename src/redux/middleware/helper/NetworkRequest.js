import axios from "axios";
import { store } from "store"
import Action from 'action'
import Util from 'util'

export default class NetworkRequest {
  static Method = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete"
  };
  constructor(host) {
    this.createInstance(host);
    this.request = this.request.bind(this);
  }
  setHandleResponse(handler) {
    this.handleSuccessResponse = handler;
  }
  setHandleError(handler) {
    this.handleErrorResponse = handler;
  }
  createInstance(host) {
    let _instance = axios.create({
      baseURL: host,
      timeout: 30000,
      responseType: "json",
      data: {},
      headers: {
        "Content-Type": "application/json",
        // common: {
        //   "Content-Type": "application/json"
        // },
        // get: {
        //   "Content-Type": "application/json"
        // },
        // post: {
        //   "Content-Type": "application/json"
        // },
        // put: {
        //   "Content-Type": "application/json"
        // },
        // delete: {
        //   "Content-Type": "application/json"
        // }
      }
    });
    // // Add a request interceptor
    // _instance.interceptors.request.use(
    //   config => {
    //     // Do something before request is sent
    //     console.log("interceptors-request: " + JSON.stringify({
    //       method: config.method,
    //       host: config.baseURL,
    //       url: config.url,
    //       headers: config.headers,
    //       body: { ...config.data, ...config.params }
    //     }));
    //     return config;
    //   },
    //   function (error) {
    //     // Do something with request error
    //     console.log("interceptors-request-error: " + error);
    //     return Promise.reject(error);
    //   }
    // );

    // // Add a response interceptor
    // _instance.interceptors.response.use(function (response) {
    //   console.log("interceptors-response: " + JSON.stringify(response))
    //   return response;
    // }, function (error) {
    //   console.log("interceptors-response-error: " + error);
    //   return Promise.reject(error);
    // });
    this.instance = _instance;
  }

  createRequestOption(method, url, params, header, moreOption) {
    let option = { method: method, url: url };
    if (params) {
      if (method == NetworkRequest.Method.POST) {
        option = { ...option, data: params };
      } else {
        option = { ...option, params: params };
      }
    }

    if (header) option = { ...option, headers: { ...header } };
    if (moreOption) option = { ...option, ...moreOption };

    console.log("createRequestOption: " + JSON.stringify(option))
    return option;
  }

  createErrorResponse = (status, message) => {
    if (status == 0) {
      status = 501;
      message = "";
      // console.log("createErrorResponse: " + JSON.stringify(status))
    }
    if (!status || status === 500) status = 500;

    if (this.handleErrorResponse)
      return {
        status: status,
        ...this.handleErrorResponse(status, message)
      };

    return {
      status: status,
      message: message,
      data: { code: status, message: message }
    }
  }

  /**Dispatch Action Error token when 401 */
  errorToken = () => {
    const storeState = store.getState()
    const { expiredToken } = storeState.popular_errors
    if (!expiredToken) {
      store.dispatch({ type: Action.ERROR_TOKEN_EXPIRED, payload: true })
    }
  }

  expiredPassword = () => {
    const storeState = store.getState()
    const { expiredPassword } = storeState.popular_errors
    if (!expiredPassword) {
      store.dispatch({
        type: Action.ERROR_PASSWORD_EXPIRED,
        payload: {
          expiredPassword: true,
          expiredPasswordType: Util.Constant.WARNING_PASSWORD_TYPE.EXPIRED
        }
      })
    }
  }

  createSuccessResponse(status, message, response) {
    let result = { status: status, message: message, data: response };
    if (response) {
      if (response.code === 401) {
        this.errorToken()
        return null
      } else if (response.code === 423) {
        this.expiredPassword()
        return null
      } else {
        if (this.handleSuccessResponse)
          return { ...result, ...this.handleSuccessResponse(response) };
        else return result;
      }
    } else {
      if (this.handleSuccessResponse)
        return { ...result, ...this.handleSuccessResponse(response) };
      else return result;
    }

    // if (this.handleSuccessResponse)
    //   return { ...result, ...this.handleSuccessResponse(response) };
    // else return result;
  }

  makeRequest(option) {
    let self = this;
    return self.instance
      .post(option.url, JSON.stringify(option.data), option)
      .then(response => {
        if (response.data == undefined || response.data == null)
          return Promise.reject(self.createErrorResponse(500));
        return Promise.resolve(
          self.createSuccessResponse(
            response.status,
            response.statusText,
            response.data
          )
        );
      })
      .catch(error => {
        if (error.response) {
          console.log("makeRequest-error-response: " + JSON.stringify(error.response))
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.data) {
            return Promise.resolve(
              self.createSuccessResponse(
                error.response.status,
                (error.response.statusText) ? error.response.statusText : "",
                error.response.data
              )
            );
          } else {
            return Promise.reject(
              self.createErrorResponse(error.response.status)
            );
          }

        } else if (error.request) {
          console.log("makeRequest-error-request: " + JSON.stringify(error.request))
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          return Promise.reject(
            self.createErrorResponse(error.request.status)
          );
        } else {
          console.log(error);
          // Something happened in setting up the request that triggered an Error
          return Promise.reject(
            self.createErrorResponse(500, error.message)
          );
        }
      });
  }

  async request(url, header, params, moreOption) {
    const method = NetworkRequest.Method.POST
    let option = await this.createRequestOption(
      method,
      url,
      params,
      header,
      moreOption
    );
    return await this.makeRequest(option);
  }
}
