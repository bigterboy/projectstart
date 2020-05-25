import SecureStore from "./SecureStore";
const store = new SecureStore();

const TOKEN_KEY = "LOGIN_TOKEN";
const USER_ACCOUNT = "USER_ACCOUNT";
const USER_BIOMETRIC = "USER_BIOMETRIC";
const USER_ACCOUNT_PROFILE = "USER_ACCOUNT_PROFILE";
const USER_NAME = "USER_NAME";
const FCM_TOKEN = "FCM_TOKEN";
const LIST_BANKS = "LIST_BANKS";
const LIST_PROVINCES = "LIST_PROVINCES"
const LINK_TICKET = "LINK_TICKET"
const LIST_NEAR_STORES = "LIST_NEAR_STORES"


const getToken = async () => {
  return store.get(TOKEN_KEY);
};
const saveToken = async token => {
  return store.set(TOKEN_KEY, token);
};
const deleteToken = async () => {
  return store.delete(TOKEN_KEY);
};

const getUser = async () => {
  return store.get(USER_ACCOUNT);
};
const saveUser = async data => {
  return store.set(USER_ACCOUNT, data);
};
//User name for logging again still there don't delete
const getUserName = async => {
  return store.get(USER_NAME);
};
const saveUserName = async data => {
  return store.set(USER_NAME, data);
};
const deleteUser = async () => {
  return store.delete(USER_ACCOUNT);
};

//Only user profile
const getUserProfile = async () => {
  return store.get(USER_ACCOUNT_PROFILE);
};

//User Biometric Info
const getUserBiometric = async () => {
  return store.get(USER_BIOMETRIC);
};
const saveUserBiometric = async data => {
  return store.set(USER_BIOMETRIC, data);
};
const deleteUserBiometric = async () => {
  return store.delete(USER_BIOMETRIC);
};

//Fcm Token
const getFcmToken = async () => {
  return store.get(FCM_TOKEN);
};
const saveFcmToken = async strFcmToken => {
  return store.set(FCM_TOKEN, strFcmToken);
};
const deleteFcmToken = async () => {
  return store.delete(FCM_TOKEN);
};

//List banks
const getBanks = async () => {
  return store.get(LIST_BANKS);
};
const saveBanks = async arrBanks => {
  return store.set(LIST_BANKS, arrBanks);
};
const deleteBanks = async () => {
  return store.delete(LIST_BANKS);
};

//List Provinces
const getProvinces = async () => {
  return store.get(LIST_PROVINCES);
};
const saveProvinces = async arrProvinces => {
  return store.set(LIST_PROVINCES, arrProvinces);
};

//Link Ticket
const getLinkTicket = async () => {
  return store.get(LINK_TICKET);
};
const saveLinkTicket = async urlLink => {
  return store.set(LINK_TICKET, urlLink);
};

//Near Stores List
const getListStores = async () => {
  return store.get(LIST_NEAR_STORES);
};
const saveListStores = async arrStores => {
  return store.set(LIST_NEAR_STORES, arrStores);
};

export default {
  getToken: getToken,
  saveToken: saveToken,
  deleteToken: deleteToken,
  getUser: getUser,
  saveUser: saveUser,
  deleteUser: deleteUser,
  getUserBiometric: getUserBiometric,
  saveUserBiometric: saveUserBiometric,
  deleteUserBiometric: deleteUserBiometric,
  getUserProfile: getUserProfile,
  saveUserName: saveUserName,
  getUserName: getUserName,

  saveFcmToken: saveFcmToken,
  getFcmToken: getFcmToken,
  deleteFcmToken: deleteFcmToken,

  getBanks: getBanks,
  saveBanks: saveBanks,
  deleteBanks: deleteBanks,

  getProvinces: getProvinces,
  saveProvinces: saveProvinces,

  getLinkTicket: getLinkTicket,
  saveLinkTicket: saveLinkTicket,

  getListStores: getListStores,
  saveListStores: saveListStores

};
