import Network from 'network/NetworkRequest';
const netRequest = new Network();

//Trong file này mình dùng để xư lý lỗi riêng cho từng api
const NEWS_HOME = async () => {
  try {
    return await netRequest.request('POST', 'news/home', {
      payload: {
        limit: 0,
        type: 0,
      },
    });
  } catch (error) {
    console.log('ERROR TRONG INDEX NETWORK', error);
    return error;
  }
};

const PROMOTION_HOME = async () => {
  try {
    return await netRequest.request('POST', 'promotion/home', {
      payload: {
        limit: 0,
      },
    });
  } catch (error) {
    console.log('ERROR TRONG INDEX NETWORK', error);
    return error;
  }
};

export default {
  NEWS_HOME: NEWS_HOME,
  PROMOTION_HOME: PROMOTION_HOME,
};
