import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";

export default class SecureStore {
  async get(key) {
    if (!key) return null;
    try {
      let data = await RNSecureKeyStore.get(key);
      let jsonData;
      try {
        jsonData = JSON.parse(data);
      } catch (e) {}
      if (!jsonData) jsonData = data;
      return jsonData;
    } catch (error) {
      return null;
    }
  }
  async set(key, data) {
    if (!key) return null;
    if (!data) data = "";
    if (typeof data === "string" || data instanceof String) {
    } else {
      try {
        data = JSON.stringify(data);
      } catch (e) {
        return null;
      }
    }
    try {
      let result = await RNSecureKeyStore.set(key, data, {
        accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY
      });
      if (result) return data;
      else return null;
    } catch (error) {
      return null;
    }
  }
  async delete(key) {
    if (!key) return false;
    try {
      let data = await RNSecureKeyStore.remove(key);
      if (data) return true;
      else return false;
    } catch (error) {
      return false;
    }
  }
}
