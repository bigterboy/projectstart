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

export const saveContractBase64 = strBase64 => ({
    type: Action.UPDATE_ESIGN_BASE64_FILE,
    payload: strBase64
})

export const saveUserAgree = value => ({
    type: Action.UPDATE_ESIGN_USER_AGREEMENT,
    payload: value
})
