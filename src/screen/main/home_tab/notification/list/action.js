import Action from "action";
import Network from "middleware/helper/Network";

export const updateNotificationIcon = value => ({
  type: Action.UPDATE_READ_ALL_NOTIFICATION,
  payload: value
});
