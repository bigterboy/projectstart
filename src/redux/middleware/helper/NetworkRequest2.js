import axios from "axios";
export default class NetworkRequest2 {
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
    let _host = host;
    this.host = _host;
  }
  createErrorResponse(status, message) {
    if (status == 0) {
      status = 501;
      message = "No internet connection!";
    }
    if (!status || status === 500) status = 500;
    if (!message) message = "Something went wrong!";
    if (this.handleErrorResponse)
      return {
        status: status,
        ...this.handleErrorResponse(status, message)
      };
    return { status: status, message: message };
  }

  createSuccessResponse(status, message, response) {
    let result = {
      status: status,
      message: message,
      data: response
    };
    if (this.handleSuccessResponse)
      return {
        ...result,
        ...this.handleSuccessResponse(response)
      };
    else return result;
  }

  async request(url, headers, params) {
    return await fetch(this.host + url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .catch(error => {
        // console.error("REQUEST_ERROR", {
        //   url: url,
        //   headers: headers,
        //   params: params,
        //   error: error
        // });
        return Promise.reject({ message: 501 });
      });
  }
}
