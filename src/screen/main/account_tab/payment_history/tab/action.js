import Action from "action";
import Network from "middleware/helper/Network";


/**
 * <Function: call api get all history of Contract >
 * @param customerUuid id customer
 * @param contractCode id of contract
 * @param latestPaymentDate null
 * @param loanType: type of loan
 */
export const historyByContract = (customerUuid, contractCode, latestPaymentDate, loanType) => {
    return async (dispatch, state) => {
      try {
        let result = await Network.historyByContract(
            customerUuid,
            contractCode,
            "",
            loanType,
        );
        dispatch((result));
      } catch (error) {
        dispatch(updateFail(error));
      }
    };
  };