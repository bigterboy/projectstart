import Action from "action";
import Network from "middleware/helper/Network";

export const updateSuccessfull = data => ({
  type: Action.UPDATE_SUCCESS,
  payload: data
});

export const updateFail = error => ({
  type: Action.UPDATE_ERROR,
  payload: { error: error }
});

export const saveUserToRedux = data => ({
  type: Action.SAVE_DATA_USER,
  payload: data
});

export const updateInforUser = (uuid, fullName, email, objectVersion) => {
  return async (dispatch, state) => {
    try {
      let result = await Network.updateInforUser(
        uuid,
        fullName,
        email,
        objectVersion
      );
      dispatch(updateSuccessfull(result));
      if (result.code === 200) {
        dispatch(saveUserToRedux(result.payload));
      }
    } catch (error) {
      dispatch(updateFail(error));
    }
  };
};

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
