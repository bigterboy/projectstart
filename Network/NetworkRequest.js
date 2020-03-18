const axios = require('axios').default;

export default class NetworkRequest {
  static Method = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
  };

  static CONFIG = {
    'x-environment': 'APP',
    'Content-Type': 'application/json',
  };

  request = (method, url, data) => {
    const options = {
      method: method,
      baseURL: 'http://113.161.84.22/dev/api/v1/',
      headers: {
        'x-environment': 'APP',
        'Content-Type': 'application/json',
      },
      url: url,
      data: data,
    };

    // //Add a response interceptor
    // axios.interceptors.response.use(
    //   function(response) {
    //     // Any status code that lie within the range of 2xx cause this function to trigger
    //     // Do something with response data
    //     if (response.data.code !== 200) {
    //       console.log('CO VO DAY KHONG V');
    //       return Promise.reject(response.data.code);
    //     }
    //     return response;
    //   },
    //   function(error) {
    //     // Any status codes that falls outside the range of 2xx cause this function to trigger
    //     // Do something with response error
    //     return Promise.reject(error);
    //   },
    // );

    //Trong file này mình dùng để xư lý lỗi chung cho mọi api
    // VD: Lỗi 400, 401, 502 ...
    return new Promise(function(resolve, reject) {
      axios(options)
        .then(response => {
          console.log(
            'DATA RESPONE trong network: ',
            response,
            response.data.code,
          );
          return resolve(response);
        })
        .catch(error => {
          console.log('CATCH ERROR123', error.response);
          return reject(error.response);
        });
    });
  };

  handleError = error => {
    // switch (error.response.status) {
    //   case 400:
    //     return 'Bad request!';
    //   case 401:
    //     return 'Unauthorized!';
    //   case 403:
    //     return 'Unauthorized!';
    //   default:
    //     return;
    // }
    console.log('VO DAY KHONG');
  };
}
