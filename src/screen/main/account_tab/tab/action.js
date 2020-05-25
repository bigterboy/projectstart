import Action from "action";
import Network from "middleware/helper/Network";

/**
 * <Function: dispatch action logout>
 */
export const logout = () => ({
  type: Action.LOGOUT
});

/**
 * <Function: clean data user when logout>
 */
export const cleanDataUserRedux = () => ({
  type: Action.CLEAN_DATA_ALL_USER_REDUX
},
{
  type: Action.UPDATE_READ_ALL_NOTIFICATION,
  payload: false
},
{
  type: Action.CLEAR_DATA_USER,
}
);
