import Action from "action";
import Network from "middleware/helper/Network";

export const updateEsignObj = data => ({
    type: Action.UPDATE_ESIGN_OBJECT,
    payload: data
});

//Step
//1:Tóm tắt 
//2:Xem hợp đồng
//3:Xác nhận
//4:Hoàn tất
export const updateEsignStep = step => ({
    type: Action.UPDATE_ESIGN_STEP,
    payload: step
})

export const updateStatusMonthly = value => ({
    type: Action.UPDATE_ESIGN_STATUS_MONTHLY_DUE,
    payload: value
})

export const updateStatusChassis = value => ({
    type: Action.UPDATE_ESIGN_STATUS_CHASSIS,
    payload: value
})

export const updateStatusEnginer = value => ({
    type: Action.UPDATE_ESIGN_STATUS_ENGINER,
    payload: value
})

export const updateStatusBankUser = value => ({
    type: Action.UPDATE_ESIGN_STATUS_BANK_USER,
    payload: value
})

export const updateStatusBankAcc = value => ({
    type: Action.UPDATE_ESIGN_STATUS_BANK_ACCOUNT,
    payload: value
})

export const updateStatusBankName = value => ({
    type: Action.UPDATE_ESIGN_STATUS_BANK_NAME,
    payload: value
})

export const saveContractBase64 = strBase64 => ({
    type: Action.UPDATE_ESIGN_BASE64_FILE,
    payload: strBase64
})

export const saveUserAgree = value => ({
    type: Action.UPDATE_ESIGN_USER_AGREEMENT,
    payload: value
})