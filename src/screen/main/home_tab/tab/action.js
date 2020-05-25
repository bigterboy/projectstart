import Action from "action";
import Network from "middleware/helper/Network";

export const logout = () => ({ type: Action.LOGOUT });

export const saveUserToRedux = data => ({
  type: Action.SAVE_DATA_USER,
  payload: data
});

export const saveAvatarBase64 = data => ({
  type: Action.SAVE_AVATAR_BASE_64,
  payload: data
});

export const saveImageBase64URL = (url) => {
  return async (dispatch, state) => {
    try {
      let result = await Network.fileDownload(
        url
      );
      //dispatch(updateSuccessfull(result));
      if (result.code === 200) {
        dispatch(saveAvatarBase64(result.payload.data));
      }
    } catch (error) {
      //dispatch(updateFail(error));
      console.log("ERROR DOWNLOAD IMAGE AVATAR BASE 64: " + error)
    }
  };
};

export const updateNotificationIcon = (value) => ({ 
  type: Action.UPDATE_READ_ALL_NOTIFICATION ,
  payload: value
});

