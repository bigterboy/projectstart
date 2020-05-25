import Action from "action";
import Network from "middleware/helper/Network";

/**
 * <Function: dispatch action login success>
 * @param data data login
 */
export const login = data => ({
  type: Action.LOGIN_SUCCESS,
  payload: data
});

/**
 * <Function: save user to redux for easy way to use>
 * @param data of user
 */
export const saveUserToRedux = data => ({
  type: Action.SAVE_DATA_USER,
  payload: data
});

export const saveImageBase64URL = url => {
  return async (dispatch, state) => {
    try {
      let result = await Network.fileDownload(url);
      //dispatch(updateSuccessfull(result));
      if (result.code === 200) {
        dispatch(saveAvatarBase64(result.payload.data));
      }
    } catch (error) {
      //dispatch(updateFail(error));
      console.log("ERROR DOWNLOAD IMAGE AVATAR BASE 64: " + error);
    }
  };
};

export const saveAvatarBase64 = data => ({
    type: Action.SAVE_AVATAR_BASE_64,
    payload: data
  });