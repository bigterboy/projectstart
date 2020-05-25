import LocalizedStrings from "react-native-localization";

const data = {
  default: {
    app_loading: "Loading...",
    login_button_forgot: "Forgotten?",
    login_button_login: "Login",
    login_button_language: "Unknown",
    login_button_register: "Register",
    login_text_or: "Or",
    login_hint_user_name: "User name",
    login_hint_password: "Password",
    login_fingerprint_cancel: "Cancel",
    login_fingerprint_guide: "Scan your fingerprint\nto login",
    login_message_empty_user_name: "Please enter your user name",
    login_message_empty_password: "Please enter your password",
    message_title_notify: "Notification",
    modal_button_ok_default: "Ok",
    modal_button_cancel_default: "Cancel",
    modal_title_default: "Confirmation",
    home_button_logout: "Logout",
    home_logout_question: "Do you want to logout this account?",
    app_exit_question: "Do you want to exit app?",
    hello: "hello {0}",
    //common
    common_version_app: "Phiên bản ứng dụng: ",
    common_all: "Tất cả",
    common_re_loading: "Tải lại",
    common_view_all: "Xem tất cả",
    common_yes: "Có",
    common_no: "Không",
    common_date: "Ngày",
    common_month: "Tháng",
    common_view_detail: "Xem chi tiết",
    common_province: "Tỉnh / Thành phố",
    common_district: "Quận, huyện",
    common_signed: "Đã ký",
    common_waiting: "Phê duyệt",
    common_otp_status: "Mã xác thực sẽ hết hiệu lực trong vòng ",
    common_otp_not_receive: "Chưa nhận được OTP ",
    common_otp_timeout: "Mã xác thực đã hết hiệu lực. ",
    common_otp_resend: "Gửi lại?",
    common_tooltip_validate_01: "Độ dài tối thiểu 6 ký tự",
    common_tooltip_validate_02: "Bao gồm ký tự chữ và số",
    common_tooltip_validate_03: "Có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt",
    common_error_time_out: "Mạng Internet đang chậm. Cảm phiền bạn đăng nhập lại lần nữa.",
    common_error_contract_file_not_found: "File hợp đồng không tồn tại.\nVui lòng thử lại sau.",
    common_error_contract_esign_file: "Không tải được file hợp đồng.\nVui lòng thử lại sau.",
    common_error_contract_adjustment_file: "Không tải được file phụ lục hợp đồng.\nVui lòng thử lại sau.",

    common_warning_setting_touch_id: "Vui lòng đăng nhập và thiết lập nhận diện vân tay trong cài đặt.",
    common_warning_setting_face_id: "Vui lòng đăng nhập và thiết lập nhận diện khuôn mặt trong cài đặt.",
    common_warning_email_format: "Vui lòng nhập đúng định dạng Email",
    common_send: "Gửi",
    common_confirm: "Xác nhận",
    common_continue: "Tiếp tục",
    common_bank_select: "Chọn ngân hàng",
    common_bank_search: "Tìm ngân hàng",
    common_second: "giây",
    common_minute: "phút",
    common_hour: "giờ",
    common_otp_verify_timeout: "Mã xác thực đã hết hiệu lực.\nVui lòng gửi lại",
    common_adjustment_item_button: "Ký phụ lục ngay",
    common_register: "Đăng ký",
    common_register_now: "Đăng ký ngay",

    common_tab_home: "Trang chủ",
    common_tab_loan: "Khoản vay",
    common_tab_card: "Thẻ",
    common_tab_promotion: "Ưu đãi",
    common_tab_account: "Tài khoản",
    common_error_try_again: "Đã có lỗi xảy ra. Quý khách vui lòng thử lại.",
    common_error_promotion_not_exist: "Ưu đãi Quý khách đang xem đã hết hạn \nhoặc không tồn tại.",
    common_error_new_not_exist: "Tin tức Quý khách đang xem đã hết hạn \nhoặc không tồn tại.",

    //popup token
    common_expired_token_message: "Phiên đăng nhập của bạn đã hết hạn.\nVui lòng đăng nhập lại tài khoản.",
    common_expired_token_button: "Đồng ý",
    common_button_ok: "Đồng ý",
    common_button_no: "Không đồng ý",
    common_save: "Lưu",
    common_take_photo: "Chụp ảnh",
    common_choose_from_library: "Chọn từ hình ảnh",
    common_cancel: "Hủy",
    common_data_null: "Không có dữ liệu",

    //Warning Time out sign esign and adjustment
    common_warning_time_up_sign_esign: "Hết thời gian ký hợp đồng.\nThời gian hiệu lực từ {0} đến {1}",
    common_warning_time_up_sign_adjustment: "Hết thời gian ký phụ lục hợp đồng.\nThời gian hiệu lực từ {0} đến {1}",
    common_warning_card_feature_no_support: "Phiên bản hiện tại chưa hỗ trợ chức năng này.",
    common_warning_no_notification: "Hiện tại Quý khách chưa nhận được tin thông báo nào.",
    common_warning_no_internet_connection: "Không có kết nối mạng! \nXin Quý khách vui lòng kiểm tra lại kết nối",

    //Warning before delete contract
    common_warning_delete_contract: "Hệ thống sẽ thực hiện xóa hợp đồng này.\nQuý khách có đồng ý không?",

    //forgot enter contract
    auth_forgot_enter_contract_header: "Quên mật khẩu",
    auth_forgot_enter_contract_guide_01:
      "HD SAISON chưa xác định được tài khoản liên kết với Số CMND/CCCD do Quý khách cung cấp, vui lòng cung cấp thêm thông tin ",
    auth_forgot_enter_contract_guide_02: "Số hợp đồng ",
    auth_forgot_enter_contract_guide_03: "để tiếp tục bước khôi phục mật khẩu.",
    auth_forgot_enter_contract_input_id: "Số CMND/CCCD",
    auth_forgot_enter_contract_input_contract: "Số hợp đồng",
    auth_forgot_enter_contract_button_confirm: "Xác nhận",
    //forgot enter id
    auth_forgot_enter_id_header: "Quên mật khẩu",
    auth_forgot_enter_id_input_id: "Số CMND/CCCD",
    auth_forgot_enter_id_guide: "Vui lòng xác nhận thông tin bên dưới.",
    auth_forgot_enter_id_button_confirm: "Xác nhận",
    auth_forgot_enter_id_error_number_characters:
      "Số CMND/CCCD phải có 9 hoặc 12 số",
    auth_forgot_enter_id_user_no_register:
      "Quý khách chưa đăng ký Tài khoản với \nHD SAISON, vui lòng đăng ký Tài khoản \nđể sử dụng dịch vụ.",
    auth_forgot_enter_id_error_null: "Số CMND/CCCD không được để trống",
    auth_forgot_enter_contract_error_null: "Số hợp đồng không được để trống",
    //forgot enter Otp
    auth_forgot_enter_otp_header: "Nhập mã xác thực",
    auth_forgot_enter_otp_guide_part_1:
      "Mã xác thực đã được gửi đến số điện thoại ",
    auth_forgot_enter_otp_guide_part_2: ". Vui lòng nhập vào ô dưới đây.",
    auth_forgot_enter_otp_button_confirm: "Xác nhận",
    //forgot enter password
    auth_forgot_enter_password_header: "Đặt lại mật khẩu",
    auth_forgot_enter_password_input_pass: "Mật khẩu mới",
    auth_forgot_enter_password_input_pass_again: "Xác nhận lại mật khẩu mới",
    auth_forgot_enter_password_button_confirm: "Xác nhận",
    //forgot complete
    auth_forgot_complete_nav: "Đặt lại mật khẩu thành công",
    auth_forgot_complete_status: "Chúc mừng \nQuý khách đã đổi mật khẩu thành công",
    auth_forgot_complete_sub_status: "Tên đăng nhập của quý khách là ",
    auth_forgot_complete_button_continue_sign: "Tiếp tục ký hợp đồng ",

    //modal warn phone
    auth_modal_warn_guide:
      "Mã xác thực sẽ được gửi đến số điện thoại ******5146 mà bạn đăng ký với HD SAISON để thiết lập lại mật khẩu.",
    auth_modal_warn_guide_01_01: "Mã xác thực để đăng ký tài khoản sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_02: "Mã xác thực để khôi phục mật khẩu sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_03: "Mã xác thực để ký hợp đồng sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_04: "Mã xác thực để ký Thoả thuận điều chỉnh thông tin sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_02: " Quý khách đã đăng ký.",
    auth_modal_warn_question:
      "Quý khách có muốn nhận mã xác thực qua số điện thoại nêu trên không?",

    auth_modal_warn_button_confirm: "Nhận mã xác thực",
    auth_modal_warn_button_change_phone: "Đã đổi số điện thoại",
    auth_modal_call_button_call_center: "Gọi tổng đài",
    auth_modal_call_guide_1: "Quý khách vui lòng liên hệ tổng đài",
    //auth_modal_call_guide_2: " 1900 558854",
    auth_modal_call_guide_2_1: "1900",
    auth_modal_call_guide_2_2: "558854",
    auth_modal_call_guide_3: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước khôi phục mật khẩu.",
    modal_call_guide_register: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước đăng ký tài khoản.",
    modal_call_guide_forgot: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước khôi phục mật khẩu.",
    modal_call_guide_esigned: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước ký hợp đồng trực tuyến.",
    modal_call_guide_adjustment: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước ký Thỏa thuận điều chỉnh thông tin.",

    auth_modal_call_guide_4: " để được tư vấn và hỗ trợ.",
    //auth modal guide contract
    auth_modal_guide_contract_title: "Số hợp đồng",
    auth_modal_guide_contract_detail: "Số hợp đồng là số...",
    //auth modal guide id
    auth_modal_guide_id_title: "Số chứng minh nhân dân / Căn cước công dân",
    auth_modal_guide_id_detail: "Số chứng minh nhân dân là số...",
    //auth register enter contract
    auth_register_enter_contract_header: "Đăng ký",
    auth_register_enter_contract_guide: "Vui lòng nhập thông tin để đăng ký tài khoản",
    auth_register_enter_contract_input_contract: "Số hợp đồng",
    auth_register_enter_contract_input_id: "Số CMND/CCCD",
    auth_register_enter_contract_button_register: "Đăng ký",
    auth_register_enter_contract_question_account: "Đã có tài khoản? ",
    auth_register_enter_contract_button_login: "Đăng nhập ngay",
    auth_register_enter_contract_error_still_not_register_online: "HD SAISON rất tiếc chưa thể tạo tài khoản cho Quý khách. Lý do: Quý khách chưa đăng ký sử dụng dịch vụ điện tử.\n\nQuý khách vẫn có thể sử dụng ứng dụng di động để đăng ký vay và cập nhật các thông tin khuyến mãi mới nhất.",
    auth_register_enter_contract_back_to_home: "Quay về màn hình chính",
    //auth register enter otp
    auth_register_enter_otp_header: "Đăng ký",
    auth_register_enter_otp_guide_part_1:
      "Mã xác thực đã được gửi đến số điện thoại ",
    auth_register_enter_otp_guide_part_2: ". Vui lòng nhập vào ô dưới đây.",
    auth_register_enter_otp_button_confirm: "Xác nhận",
    auth_register_enter_otp_back_to_main: "Đồng ý",
    //auth register enter password
    auth_register_enter_password_header: "Đăng ký",
    auth_register_enter_password_title:
      "Chúc mừng \nQuý khách đã đăng ký tài khoản thành công",
    auth_register_enter_password_user_name: "Tên đăng nhập của Quý khách là ",
    auth_register_enter_password_guide:
      "Vui lòng cài đặt mật khẩu cho tài khoản \ncủa Quý khách.",
    auth_register_enter_password_input_pass: "Mật khẩu mới",
    auth_register_enter_password_input_pass_again: "Xác nhận lại mật khẩu mới",
    auth_register_enter_password_button_confirm: "Xác nhận",
    //auth register success
    auth_register_success_title:
      "Chúc mừng \nQuý khách đã đăng ký tài khoản thành công",
    auth_register_success_description_face_id:
      "Để đăng nhập dễ dàng hơn, Quý khách có muốn cài đặt tính năng đăng nhập bằng nhận diện khuôn mặt?",
    auth_register_success_description_touch_id:
      "Để đăng nhập dễ dàng hơn, Quý khách có muốn cài đặt tính năng đăng nhập bằng nhận vân tay?",
    auth_register_success_button_confirm: "Xác nhận",
    auth_register_success_button_cancel: "Bỏ qua",

    //auth register with phone
    auth_register_with_phone_enter_phone_nav: "Đăng nhập",
    auth_register_with_phone_enter_phone: "Số điện thoại",
    auth_register_with_phone_enter_phone_guide: "Vui lòng nhập số điện thoại Quý khách \nđang sử dụng",
    auth_register_with_phone_error_number_characters: "Số điện thoại phải có 10 chữ số.",
    auth_register_with_phone_button_continue: "Tiếp tục",
    auth_register_with_phone_enter_otp_nav: "Nhập mã xác thực",

    //auth login
    auth_login_header: "Đăng nhập",
    auth_login_guide: "Đăng nhập để tiếp tục",
    auth_login_button_login: "Đăng nhập",
    auth_login_input_user_name: "Tên đăng nhập",
    auth_login_input_password: "Mật khẩu",
    auth_login_forgot: "Quên tên đăng nhập hoặc mật khẩu?",
    auth_login_username_error_blank: "Tên đăng nhập không được trống",
    auth_login_password_error_blank: "Mật khẩu không được trống",
    auth_login_error_incorrect: "Tên đăng nhập hoặc mật khẩu không chính xác",
    auth_login_error_too_much: "Tài khoản bị tạm khoá do Quý khách nhập sai\nMật khẩu nhiều lần liên tiếp. Quý khách vui lòng đăng nhập lại sau",
    //component
    component_contract_item_sign_now: "Ký hợp đồng ngay",
    component_contract_item_sign_sub_esign: "Ký thoả thuận",
    component_contract_item_wait: "Phê duyệt",
    component_contract_item_state_signed: "Đã ký",
    component_contract_item_state_waiting: "Phê duyệt",
    component_contract_item_pay_guild: "Hướng dẫn thanh toán",
    component_contract_item_status_esign:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận sản phẩm.",
    component_contract_item_status_sub_esign:
      "Thông tin trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin.",
    component_contract_item_expire_date: "Ngày hết hạn: ",
    component_contract_item_signed_date: "Ngày ký:",
    component_contract_item_contract_code: "Số hợp đồng: ",
    component_modal_remind_sign_now: "Ký hợp đồng ngay",
    component_modal_remind_pay_now: "Thanh toán ngay",
    component_modal_buy_ticket_buy: "Đồng ý",
    component_modal_buy_ticket_title: "Các bước đặt vé máy bay trả góp",
    component_modal_buy_ticket_step: "Bước",
    component_modal_buy_ticket_step_01:
      "HD SAISON chuyển Quý khách đến trang điện tử của Vietjet Air.",
    component_modal_buy_ticket_step_02:
      "Chọn vé trên trang điện tử của Vietjet Air.",
    component_modal_buy_ticket_step_03:
      'Tại bước thanh toán, chọn phương thức thanh toán là',
    component_modal_buy_ticket_step_03_highlight: "\"Trả góp với HD SAISON\".",
    component_modal_buy_ticket_step_04:
      "Nhân viên HD SAISON liên lạc Quý khách để xác nhận thông tin.",
    component_modal_buy_ticket_step_05:
      "Ký hợp đồng tín dụng và nhận mã xác nhận đặt vé.",
    component_modal_buy_ticket_bottom: "HD SAISON và Vietjet Air hợp tác để\ncung cấp các tiện ích mua trả góp vé máy bay\ncho Quý khách hàng.",
    component_modal_change_password_title:
      "Thay đổi mật khẩu để bảo vệ tài khoản của bạn.",
    component_modal_change_password_message:
      "Mật khẩu đăng nhập tài khoản của Quý khách sắp hết hạn hiệu lực, Quý khách vui lòng thay đổi mật khẩu",
    component_modal_change_password_message_expire:
      "Mật khẩu đăng nhập tài khoản của Quý khách đã hết hạn hiệu lực, Quý khách vui lòng thay đổi mật khẩu",
    component_modal_change_password_button: "Đổi mật khẩu",
    component_modal_change_password_do_later: "Để sau",
    component_pie_chart_term: "kỳ",
    component_history_list_date: "Ngày thanh toán",
    component_history_list_amount: "Số tiền",

    component_loan_view_title: "Đăng ký vay với",
    component_loan_view_money: "Tiền mặt",
    component_loan_view_bike: "Xe/Điện máy",
    component_loan_view_plane_ticket: "Vé máy bay",

    //Modal Serial No (Số khung số máy)
    component_modal_serial_no_title: "Chưa thể ký Hợp đồng do thiếu thông tin \nSố khung/số máy.",
    component_modal_serial_no_des:
      "Quý khách vui lòng liên hệ nhân viên HDSAISON tại cửa hàng để được hỗ trợ cập nhật thông tin và tiếp tục ký Hợp đồng điện tử.",
    component_modal_serial_no_1: "Số khung",
    component_modal_serial_no_2: "Số máy",
    component_modal_serial_no_placeholder_1: "Nhập số khung",
    component_modal_serial_no_placeholder_2: "Nhập số máy",

    //Modal Adjustment
    component_modal_adjustment_title: "Thông báo điều chỉnh thông tin",
    component_modal_adjustment_message:
      "Thông tin {0} trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin.",
    component_modal_adjustment_message_CL:
      "Thông tin {0} trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin để hoàn tất hồ sơ và nhận tiền giải ngân.",
    component_modal_adjustment_contract_prefix: "Số hợp đồng: ",
    component_modal_adjustment_button_sign: "Ký thỏa thuận điều chỉnh thông tin",

    //Modal Waiting
    component_modal_waiting_title:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận sản phẩm.",
    component_modal_waiting_title_CL:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận tiền giải ngân.",

    //Modal Remind Payment
    component_modal_remind_pay_title: "Quý khách có khoản vay sắp đến hạn thanh toán. Vui lòng thanh toán trước ngày đến hạn.",
    component_modal_remind_pay_due_date: "Ngày đến hạn thanh toán",
    component_modal_remind_pay_due_amount: "Số tiền cần thanh toán",

    //Promotion List
    component_promotion_rate: "Lãi suất ưu đãi",
    promotion_tab_all_no_data: "Hiện tại Quý khách chưa có ưu đãi nào.",


    //Remind waiting contract
    component_remind_view_status: "Quý khách đang có {0} khoản vay đã được duyệt. Kích hoạt ngay để hoàn tất hồ sơ.",
    component_remind_view_status_Adjustment: "Quý khách đang có {0} hợp đồng điện tử đã ký chưa chính xác. Ký thỏa thuận để điều chỉnh thông tin.",

    //main account tab
    main_account_tab_nav: "Cài đặt tài khoản",
    main_account_tab_change_pass: "Đổi mật khẩu",
    main_account_tab_fingerprint: "Kích hoạt chức năng nhận diện \nvân tay",
    main_account_tab_face_id: "Kích hoạt chức năng nhận diện \nkhuôn mặt",
    main_account_tab_card_management: "Quản lý thẻ",
    main_account_tab_payment_history: "Lịch sử thanh toán",
    main_account_tab_policy: "Điều khoản và Điều kiện sử dụng\nDịch vụ Điện tử",
    main_account_tab_policy_short: "Điều khoản và Điều kiện sử...",
    main_account_tab_condition: "Bản điều khoản và điều kiện chung",
    main_account_tab_condition_short: "Bản điều khoản và điều...",
    main_account_tab_fab: "Câu hỏi thường gặp",
    main_account_tab_logout: "Đăng xuất",

    //Message for successful change information user
    account_profile_change_infor_success_message:
      "Chúc mừng\nQuý khách đã cập nhật\nthông tin cá nhân thành công",
    account_profile_confirm_success_message: "Xác nhận",

    //Message for successful change password
    account_profile_change_password_success_line1_message:
      "Chúc mừng\nQuý khách đã đổi mật khẩu thành công",
    account_profile_change_password_success_line2_message: "Tên đăng nhập của Quý khách là",


    //Message for change information account
    account_profile_change_error_fullName_message: "Họ và tên không hợp lệ",
    account_profile_change_error_fullName_null_message: "Họ và tên không được để trống",
    account_profile_change_error_email_null_message: "Email không được để trống",
    account_profile_change_error_format_email_message: "Email không hợp lệ.",
    account_profile_change_error_nouppercase_email_message: "Email không được có kí tự hoa",
    account_profile_change_error_email_message: "Email không được có khoảng trắng",
    account_profile_change_error_length_email_message: "Email phải có ít nhất 4 kí tự",

    account_profile_change_error_phoneNumber_null_message: "Số điện thoại không được để trống",
    account_profile_change_error_phoneNumber_fomat_message: "Số điện thoại không đúng định dạng",
    account_profile_change_error_phoneNumber_not_correct_message: "Số điện thoại không tồn tại",
    account_profile_change_error_phoneNumber_length_message: "Số điện thoại phải có 10 chữ số",
    account_profile_change_error_CMND_null_message: "Số CMND không được để trống",
    account_profile_change_error_CMND_fomat_message: "Số CMND không đúng định dạng",
    account_profile_change_error_CMND_lengh_message: "Số CMND phải có 9 chữ số hoặc 12 chữ số",
    account_profile_change_error_address_null_message: "Địa chỉ không được để trống",


    account_profile__message_error_empty_input_current_pass: "Mật khẩu hiện tại không được để trống.",
    account_profile__message_error_empty_input_new_pass: "Mật khẩu mới không được để trống.",
    account_profile__message_error_empty_input_re_pass: "Xác nhận lại mật khẩu mới không được để trống.",



    //Message error for change password account
    account_profile__message_error_input_current_pass:
      "Mật khẩu hiện tại phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile__message_error_input_new_pass:
      "Mật khẩu mới phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile__message_error_input_re_pass:
      "Mật khẩu nhập lại phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile_change_password_message: "Nhập mật khẩu không hợp lệ.",

    account_profile_same_password_message: "Mật khẩu mới và xác nhận lại mật khẩu mới không trùng.",
    account_profile_newpassword_must_different_current_message:
      "Mật khẩu mới phải khác mật khẩu hiện tại.",
    //home tab
    promotion_tab_promotion_detail_nav: "Ưu đãi",
    home_tab_group_header_promotion: "Ưu đãi dành cho Quý khách",
    home_tab_group_header_promotion_new: "Ưu đãi mới",
    promotion_tab_promotion_register_nav: "Đăng ký nhận ưu đãi",
    promotion_tab_promotion_detail_event_nav: "Khuyến mãi",
    home_tab_group_header_event: "Khuyến mãi",
    home_tab_group_header_news: "Tin tức",
    home_tab_group_header_guild: "Hướng dẫn thanh toán",
    home_tab_contract_waiting_nav: "Hợp đồng đang đợi ký",
    home_tab_contract_adjustment_nav: "Phụ lục đang đợi ký",
    promotion_tab_promotion_detail_reg_now: "Đăng ký ngay",
    promotion_tab_without_login: "Quý khách chưa đăng nhập",
    promotion_tab_without_login_announcement: "Quý khách vui lòng đăng nhập hoặc đăng ký để nhận ưu đãi dành riêng cho quý khách",

    home_tab_guild_store_nav: "Cửa hàng gần bạn",
    home_tab_guild_store_province: "Chọn Tỉnh / Thành phố",
    home_tab_guild_store_province_search: "Tìm Tỉnh / Thành phố",
    home_tab_guild_store_district: "Chọn quận, huyện",
    home_tab_guild_store_district_search: "Tìm quận, huyện",

    home_tab_news_list_nav: "Tin tức",
    home_tab_guild_payment_nav: "Hướng dẫn thanh toán",

    //loan tab
    loan_tab_register_request_guess_check: "Quý khách vui lòng kiểm tra lại thông tin\ntrước khi đăng ký.",
    loan_tab_register_for_consult: "Thông tin tạm tính chỉ mang tính chất tham khảo.",
    loan_tab_register_loan_nav: "Đăng ký vay",
    loan_tab_register_loan_userinfo: "Thông tin khách hàng",
    loan_tab_register_loan_loaninfo: "Thông tin khoản vay",
    loan_tab_register_loan_purpose: "Mục đích vay:",
    loan_tab_register_loan_product: "Sản phẩm vay (không bắt buộc)",
    loan_tab_register_loan_percent_pay_first: "Phần trăm trả trước",
    loan_tab_register_loan_select_production: "Sản phẩm",
    loan_tab_register_loan_amount: "Số tiền vay:",
    loan_tab_register_price_product_amount: "Giá sản phẩm:",
    loan_tab_register_loan_term: "Thời hạn vay:",
    loan_tab_register_loan_fullname: "Họ và tên",
    loan_tab_register_loan_phone: "Số điện thoại",
    loan_tab_register_loan_idcard: "CMND/CCCD",
    loan_tab_register_loan_address: "Địa chỉ",
    loan_tab_register_loan_month: "tháng",
    loan_tab_register_loan_please_select_product: "Vui lòng chọn sản phẩm",
    loan_tab_register_loan_confirm: "Xác nhận",
    loan_tab_register_loan_returnMain: "Màn hình chính",
    loan_tab_register_loan_return_promotion_tab: "Xem ưu đãi khác",
    loan_tab_register_loan_complete_status:
      "Đơn đăng ký vay của quý khách đã được gởi đi thành công. Chúng tôi sẽ liên hệ Quý khách trong thời gián sớm nhất để hoàn tất hồ sơ.",
    loan_tab_register_loan: "Đăng ký",
    loan_tab_register_loan_finish: "Thông tin đăng ký vay của Quý khách đã được gửi đến HD SAISON. Chúng tôi sẽ liên hệ Quý khách trong thời gian sớm nhất để hoàn tất hồ sơ.",
    loan_tab_register_loan_from_promotion_finish: "Thông tin đăng ký của Quý khách đã được gởi đến HD SAISON. Chúng tôi sẽ liên hệ đến Quý khách trong thời gian sớm nhất.",
    loan_tab_register_loan_fill_info_error_name_blank: "Quý khách vui lòng nhập Họ và tên.",
    loan_tab_register_loan_fill_info_error_phone_blank: "Quý khách vui lòng nhập Số điện thoại.",
    loan_tab_register_loan_fill_info_error_address_blank: "Quý khách vui lòng \nchọn Địa điểm làm hợp đồng.",

    loan_tab_manager_loan_nav: "Quản lý khoản vay",
    loan_tab_manager_loan_waiting: "Hợp đồng đợi ký",
    loan_tab_manager_loan_due: "Hợp đồng đến hạn thanh toán",
    loan_tab_manager_loan_current: "Hợp đồng hiện tại",
    loan_tab_manager_loan_empty_status:
      "Hiện tại Quý khách chưa có khoản vay tại \nHD SAISON",

    loan_tab_detail_loan_contract_id: "Số hợp đồng: ",
    loan_tab_detail_loan_pay_amount_month: "Số tiền thanh toán hàng tháng",
    loan_tab_detail_loan_pay_date: "Ngày thanh toán hàng tháng",
    loan_tab_detail_loan_insurance: "Bảo hiểm khoản vay",
    loan_tab_detail_loan_contract: "Hợp đồng khoản vay",
    loan_tab_detail_loan_remind: "Nhắc thanh toán",
    loan_tab_detail_loan_term: "Kỳ thanh toán",
    loan_tab_detail_loan_history: "Lịch sử thanh toán",
    loan_tab_detail_loan_guild: "Hướng dẫn thanh toán",
    loan_tab_detail_loan_finish: "Ngày kết thúc",
    loan_tab_detail_loan_remind_pay_on_message: "Quý khách muốn bật chức năng \nnhắc thanh toán cho hợp đồng này.",
    loan_tab_detail_loan_remind_pay_off_message: "Quý khách muốn tắt chức năng \nnhắc thanh toán cho hợp đồng này.",

    loan_tab_pay_history_nav: "Lịch sử thanh toán",

    loan_tab_detail_contract_nav: "Hợp đồng khoản vay",
    loan_tab_detail_contract_tab_1: "Hợp đồng tín dụng",
    loan_tab_detail_contract_tab_2: "Thoả thuận điều chỉnh thông tin",

    loan_tab_add_info_nav: "Thêm hợp đồng",
    loan_tab_add_info_status:
      "Quý khách vui lòng nhập chính xác \n số hợp đồng và số CMND/CCCD mới nhất.",
    loan_tab_add_info_contract_no: "Số hợp đồng",
    loan_tab_add_info_id_no: "Số CMND/CCCD",
    loan_tab_add_info_button_next: "Tiếp tục",

    loan_tab_add_confirm_nav: "Thêm hợp đồng",
    loan_tab_add_confirm_status:
      "Quý khách vui lòng kiểm tra thông tin khoản vay trước khi thêm vào chức năng \n Quản lý khoản vay.",
    loan_tab_add_confirm_state: "Trạng thái",
    loan_tab_add_confirm_contract_no: "Số hợp đồng",
    loan_tab_add_confirm_loan_product: "Sản phẩm vay",
    loan_tab_add_confirm_series_no: "Số series",
    loan_tab_add_confirm_loan_amount: "Số tiền vay",
    loan_tab_add_confirm_interest_rate: "Lãi suất hàng tháng",
    loan_tab_add_confirm_number_terms: "Thời hạn vay",
    loan_tab_add_confirm_pay_month_amount: "Số tiền thanh toán hàng tháng",
    loan_tab_add_confirm_first_date_pay: "Ngày thanh toán đầu tiên",
    loan_tab_add_confirm_last_date_pay: "Ngày thanh toán cuối cùng",
    loan_tab_add_confirm_pay_month_date: "Ngày thanh toán hàng tháng",
    loan_tab_add_confirm_loan_insurance: "Bảo hiểm khoản vay",
    loan_tab_add_confirm_send_fee: "Phí chuyển tiền",
    loan_tab_add_confirm_bank_account_user: "Chủ tài khoản",
    loan_tab_add_confirm_bank_account_no: "Số tài khoản",
    loan_tab_add_confirm_bank_name: "Tên ngân hàng",
    loan_tab_add_confirm_button_complete: "Hoàn tất",

    loan_tab_current_contract_nav: "Hợp đồng hiện tại",
    loan_tab_component_tooltip_text:
      "Đây là khoản vay vừa được thêm vào quản lý. Nếu không đúng khoản vay của bạn, vuốt sáng trái để xoá khỏi danh mục quản lý khoản vay.",

    loan_tab_esign_tab_nav: "Ký hợp đồng trực tuyến",
    loan_tab_esign_tab_nav_step_01: "Bước 1: Tóm tắt khoản vay",
    loan_tab_esign_tab_nav_step_02: "Bước 2: Xem thông tin hợp đồng",
    loan_tab_esign_tab_nav_step_03: "Bước 3: Xác nhận ký hợp đồng",
    loan_tab_esign_tab_nav_step_04: "Bước 4: Hoàn tất ký hợp đồng",
    loan_tab_esign_overview: "Tóm tắt",
    loan_tab_esign_overview_loan_info: "Thông tin khoản vay",
    loan_tab_esign_overview_account_info: "Thông tin tài khoản",
    loan_tab_esign_overview_select_first_due: "Quý khách vui lòng chọn ngày thanh toán hàng tháng",
    loan_tab_esign_overview_first_due_date: "Ngày thanh toán đầu tiên: ",
    loan_tab_esign_overview_frame_no: "Số khung",
    loan_tab_esign_overview_frame_no_placeholder: "Nhập số khung",
    loan_tab_esign_overview_elect_no: "Số máy",
    loan_tab_esign_overview_elect_no_placeholder: "Nhập số máy",
    loan_tab_esign_overview_error_monthly_due: "Quý khách vui lòng chọn \nngày thanh toán hàng tháng.",
    loan_tab_esign_overview_error_bank_info: "Quý khách vui lòng nhập đầy đủ \nthông tin tài khoản ngân hàng.",
    loan_tab_esign_overview_error_chassis_engineer: "Quý khách vui lòng nhập đầy đủ \nsố khung và số máy.",
    loan_tab_esign_overview_product_price: "Giá sản phẩm",
    loan_tab_esign_overview_product: "Sản phẩm",
    loan_tab_esign_overview_warning_empty_field: "Quý khách vui lòng nhập đầy đủ \nnhững thông tin cần thiết.",

    loan_tab_esign_contract: "Xem hợp đồng",
    loan_tab_esign_sign: "Xác nhận",
    loan_tab_esign_complete: "Hoàn tất",
    loan_tab_esign_button_sign: "Ký hợp đồng",
    loan_tab_esign_button_accept: "Xác nhận",
    loan_tab_esign_button_continue: "Tiếp tục",
    loan_tab_esign_button_loan_manager: "Quản lý khoản vay",
    loan_tab_esign_contract_document_agree:
      "Tôi đã đọc, hiểu và đồng ý với toàn bộ nội dung trên.",
    loan_tab_esign_policy_title: "Điều Khoản Và Điều Kiện Sử DỤng Hợp Đồng Trực Tuyến.",
    loan_tab_esign_complete_status_part_ED_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_ED_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_ED_3: "Quý khách vui lòng liên hệ nhân viên của",
    loan_tab_esign_complete_status_part_ED_4: "HD SAISON tại cửa hàng để hoàn tất hồ sơ và nhận sản phẩm.",

    loan_tab_esign_complete_status_part_CL_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_CL_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_CL_3: "HD SAISON sẽ giải ngân số tiền vay ",
    loan_tab_esign_complete_status_part_CL_4: "vào tài khoản ",
    loan_tab_esign_complete_status_part_CL_5: " của Quý khách ",
    loan_tab_esign_complete_status_part_CL_6: "tại ngân hàng ",
    loan_tab_esign_complete_status_part_CL_7: "trong tối đa ",
    loan_tab_esign_complete_status_part_CL_8: "2 ngày ",
    loan_tab_esign_complete_status_part_CL_9: "làm việc.",

    loan_tab_esign_complete_status_part_MC_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_MC_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_MC_3: "Quý khách vui lòng liên hệ nhân viên của",
    loan_tab_esign_complete_status_part_MC_4: "HD SAISON tại cửa hàng để hoàn tất hồ sơ và nhận sản phẩm.",

    loan_tab_esign_enter_otp_guild: "Mã xác thực để ký hợp đồng đã được gửi đến số điện thoại",
    loan_tab_esign_sub_enter_otp_guild: "Mã xác thực để ký Thỏa thuận điều chỉnh thông tin đã được gửi đến số điện thoại",

    loan_tab_esign_sign_status: "Quý khách vui lòng đăng nhập lại để tiếp tục \nKý hợp đồng điện tử.",
    loan_aler_contract_cannot_delete: "Hợp đồng ký điện tử không được quyền xoá.",
    loan_aler_contract_customer_cannot_delete: "Khách hàng không thể xóa số hợp đồng dùng đăng ký tài khoản",

    //Esign PLHD
    loan_tab_esign_sub_tab_nav: "Thoả thuận điều chỉnh thông tin",
    loan_tab_esign_sub_tab_nav_step_01: "Bước 1: Tóm tắt thông tin điều chỉnh",
    loan_tab_esign_sub_tab_nav_step_02: "Bước 2: Xem thoả thuận",
    loan_tab_esign_sub_tab_nav_step_03: "Bước 3: Xác nhận ký thoả thuận",
    loan_tab_esign_sub_tab_nav_step_04: "Bước 4: Hoàn tất ký thoả thuận",
    loan_tab_esign_sub_overview: "Tóm tắt",
    loan_tab_esign_sub_contract: "Xem thoả thuận",
    loan_tab_esign_sub_sign: "Xác nhận",
    loan_tab_esign_sub_complete: "Hoàn tất",
    loan_tab_esign_sub_overview_name_info: "Họ và tên",
    loan_tab_esign_sub_overview_id_info: "Số CMND/CCCD",
    loan_tab_esign_sub_overview_old_info: "Thông tin cũ",
    loan_tab_esign_sub_overview_new_info: "Thông tin mới",
    loan_tab_esign_sub_complete_status: "Quý khách đã hoàn tất điều chỉnh \nthông tin.",
    loan_tab_esign_sub_sign_status: "Quý khách vui lòng đăng nhập lại để tiếp tục \nký Thỏa thuận điều chỉnh thông tin.",

    loan_tab_login_phone_can_not_use_title: "Chưa thể sử dụng chức năng này",
    loan_tab_login_phone_can_not_use_message:
      "Quý khách vui lòng thực hiện đăng ký bằng \nthông tin hợp đồng đã có với HD SAISON để \ncó thể sử dụng chức năng này.",
    loan_tab_login_phone_button_sign_up: "Đăng ký",

    loan_mangement_contract_mail_confirm_text: "Quý khách vui lòng nhập email để nhận chứng từ điện tử đã ký",
    loan_mangement_contract_mail_successful_text: "Chứng từ điện tử đã được gửi đến email của Quý khách.",

    //Modal required change password
    modal_required_change_password_title: "Thay đổi mật khẩu để bảo vệ tài khoản của Quý khách.",
    modal_required_change_password_message_expired: "Mật khẩu đăng nhập tài khoản của Quý khách đã hết hiệu lực. Quý khách vui lòng thay đổi mật khẩu.",
    modal_required_change_password_message_remind: "Mật khẩu đăng nhập tài khoản của Quý khách sắp hết hiệu lực. Quý khách vui lòng thay đổi mật khẩu.",

    //Modal Register Option
    modal_register_option_title: "Quý khách đã có hợp đồng vay với \nHD SAISON?",
    modal_register_option_message:
      "Đăng ký với thông tin hợp đồng đã có sẽ giúp \nQuý khách trải nghiệm đầy đủ các chức năng \ncủa ứng dụng.",
    modal_register_option_button_have_contract: "Đã có hợp đồng",
    modal_register_option_button_no_contract: "Chưa có hợp đồng",

    //Modal Warning Phone
    modal_warning_phone_title: "Mã xác thực sẽ được gửi đến số điện thoại",
    modal_warning_phone_message: "Quý khách có muốn nhận mã xác thực \nqua số điện thoại nêu trên không?",
    modal_warning_phone_button_receive: "Nhận mã xác thực",
    modal_warning_phone_button_after: "Để sau",

    home_tab_notification_list_nav: "Thông báo",

    modal_warning_forgot_password_expired_title: "Quý khách có muốn đặt lại mật khẩu?",
    modal_warning_forgot_password_expired_message: "Vì lý do bảo mật, ứng dụng sẽ thực hiện đăng xuất tài khoản của Quý khách, sau đó chuyển đến màn hình đặt lại mật khẩu để tạo mật khẩu mới.",
    modal_warning_forgot_password_expired_agree: "Đồng ý",
    modal_warning_forgot_password_expired_decide: "Không đồng ý",
  },
  en: {
    app_loading: "Loading...",
    login_button_forgot: "Forgot password?",
    login_button_login: "Login",
    login_button_language: "Tiếng Việt",
    login_button_register: "Register",
    login_text_or: "Or",
    login_hint_user_name: "User name",
    login_hint_password: "Password",
    login_fingerprint_cancel: "Cancel",
    login_fingerprint_guide: "Scan your fingerprint\nto login",
    login_message_empty_user_name: "Please enter your user name",
    login_message_empty_password: "Please enter your password",
    message_title_notify: "Notification",
    modal_button_ok_default: "Ok",
    modal_button_cancel_default: "Cancel",
    modal_title_default: "Confirmation",
    home_button_logout: "Logout",
    home_logout_question: "Do you want to logout this account?",
    app_exit_question: "Do you want to exit app?",
    hello: "hello {0}",
    //common
    common_version_app: "Phiên bản ứng dụng: ",
    common_all: "Tất cả",
    common_re_loading: "Tải lại",
    common_view_all: "Xem tất cả",
    common_yes: "Có",
    common_no: "Không",
    common_date: "Ngày",
    common_month: "Tháng",
    common_view_detail: "Xem chi tiết",
    common_province: "Tỉnh / Thành phố",
    common_district: "Quận, huyện",
    common_signed: "Đã ký",
    common_waiting: "Phê duyệt",
    common_otp_status: "Mã xác thực sẽ hết hiệu lực trong vòng ",
    common_otp_not_receive: "Chưa nhận được OTP ",
    common_otp_timeout: "Mã xác thực đã hết hiệu lực. ",
    common_otp_resend: "Gửi lại?",
    common_tooltip_validate_01: "Độ dài tối thiểu 6 ký tự",
    common_tooltip_validate_02: "Bao gồm ký tự chữ và số",
    common_tooltip_validate_03: "Có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt",
    common_error_time_out: "Mạng Internet đang chậm. Cảm phiền bạn đăng nhập lại lần nữa.",
    common_error_contract_file_not_found: "File hợp đồng không tồn tại.\nVui lòng thử lại sau.",
    common_error_contract_esign_file: "Không tải được file hợp đồng.\nVui lòng thử lại sau.",
    common_error_contract_adjustment_file: "Không tải được file phụ lục hợp đồng.\nVui lòng thử lại sau.",

    common_warning_setting_touch_id: "Vui lòng đăng nhập và thiết lập nhận diện vân tay trong cài đặt.",
    common_warning_setting_face_id: "Vui lòng đăng nhập và thiết lập nhận diện khuôn mặt trong cài đặt.",
    common_warning_email_format: "Vui lòng nhập đúng định dạng Email",
    common_send: "Gửi",
    common_confirm: "Xác nhận",
    common_continue: "Tiếp tục",
    common_bank_select: "Chọn ngân hàng",
    common_bank_search: "Tìm ngân hàng",
    common_second: "giây",
    common_minute: "phút",
    common_hour: "giờ",
    common_otp_verify_timeout: "Mã xác thực đã hết hiệu lực.\nVui lòng gửi lại",
    common_adjustment_item_button: "Ký phụ lục ngay",
    common_register: "Đăng ký",
    common_register_now: "Đăng ký ngay",

    common_tab_home: "Trang chủ",
    common_tab_loan: "Khoản vay",
    common_tab_card: "Thẻ",
    common_tab_promotion: "Ưu đãi",
    common_tab_account: "Tài khoản",
    common_error_try_again: "Đã có lỗi xảy ra. Quý khách vui lòng thử lại.",
    common_error_promotion_not_exist: "Ưu đãi Quý khách đang xem đã hết hạn \nhoặc không tồn tại.",
    common_error_new_not_exist: "Tin tức Quý khách đang xem đã hết hạn \nhoặc không tồn tại.",

    //popup token
    common_expired_token_message: "Phiên đăng nhập của bạn đã hết hạn.\nVui lòng đăng nhập lại tài khoản.",
    common_expired_token_button: "Đồng ý",
    common_button_ok: "Đồng ý",
    common_button_no: "Không đồng ý",
    common_save: "Lưu",
    common_take_photo: "Chụp ảnh",
    common_choose_from_library: "Chọn từ hình ảnh",
    common_cancel: "Hủy",
    common_data_null: "Không có dữ liệu",

    //Warning Time out sign esign and adjustment
    common_warning_time_up_sign_esign: "Hết thời gian ký hợp đồng.\nThời gian hiệu lực từ {0} đến {1}",
    common_warning_time_up_sign_adjustment: "Hết thời gian ký phụ lục hợp đồng.\nThời gian hiệu lực từ {0} đến {1}",
    common_warning_card_feature_no_support: "Phiên bản hiện tại chưa hỗ trợ chức năng này.",
    common_warning_no_notification: "Hiện tại Quý khách chưa nhận được tin thông báo nào.",
    common_warning_no_internet_connection: "Không có kết nối mạng! \nXin Quý khách vui lòng kiểm tra lại kết nối",

    //Warning before delete contract
    common_warning_delete_contract: "Hệ thống sẽ thực hiện xóa hợp đồng này.\nQuý khách có đồng ý không?",

    //forgot enter contract
    auth_forgot_enter_contract_header: "Quên mật khẩu",
    auth_forgot_enter_contract_guide_01:
      "HD SAISON chưa xác định được tài khoản liên kết với Số CMND/CCCD do Quý khách cung cấp, vui lòng cung cấp thêm thông tin ",
    auth_forgot_enter_contract_guide_02: "Số hợp đồng ",
    auth_forgot_enter_contract_guide_03: "để tiếp tục bước khôi phục mật khẩu.",
    auth_forgot_enter_contract_input_id: "Số CMND/CCCD",
    auth_forgot_enter_contract_input_contract: "Số hợp đồng",
    auth_forgot_enter_contract_button_confirm: "Xác nhận",
    //forgot enter id
    auth_forgot_enter_id_header: "Quên mật khẩu",
    auth_forgot_enter_id_input_id: "Số CMND/CCCD",
    auth_forgot_enter_id_guide: "Vui lòng xác nhận thông tin bên dưới.",
    auth_forgot_enter_id_button_confirm: "Xác nhận",
    auth_forgot_enter_id_error_number_characters:
      "Số CMND/CCCD phải có 9 hoặc 12 số",
    auth_forgot_enter_id_user_no_register:
      "Quý khách chưa đăng ký Tài khoản với \nHD SAISON, vui lòng đăng ký Tài khoản \nđể sử dụng dịch vụ.",
    auth_forgot_enter_id_error_null: "Số CMND/CCCD không được để trống",
    auth_forgot_enter_contract_error_null: "Số hợp đồng không được để trống",
    //forgot enter Otp
    auth_forgot_enter_otp_header: "Nhập mã xác thực",
    auth_forgot_enter_otp_guide_part_1:
      "Mã xác thực đã được gửi đến số điện thoại ",
    auth_forgot_enter_otp_guide_part_2: ". Vui lòng nhập vào ô dưới đây.",
    auth_forgot_enter_otp_button_confirm: "Xác nhận",
    //forgot enter password
    auth_forgot_enter_password_header: "Đặt lại mật khẩu",
    auth_forgot_enter_password_input_pass: "Mật khẩu mới",
    auth_forgot_enter_password_input_pass_again: "Xác nhận lại mật khẩu mới",
    auth_forgot_enter_password_button_confirm: "Xác nhận",
    //forgot complete
    auth_forgot_complete_nav: "Đặt lại mật khẩu thành công",
    auth_forgot_complete_status: "Chúc mừng \nQuý khách đã đổi mật khẩu thành công",
    auth_forgot_complete_sub_status: "Tên đăng nhập của quý khách là ",
    auth_forgot_complete_button_continue_sign: "Tiếp tục ký hợp đồng ",

    //modal warn phone
    auth_modal_warn_guide:
      "Mã xác thực sẽ được gửi đến số điện thoại ******5146 mà bạn đăng ký với HD SAISON để thiết lập lại mật khẩu.",
    auth_modal_warn_guide_01_01: "Mã xác thực để đăng ký tài khoản sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_02: "Mã xác thực để khôi phục mật khẩu sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_03: "Mã xác thực để ký hợp đồng sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_04: "Mã xác thực để ký Thoả thuận điều chỉnh thông tin sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_02: " Quý khách đã đăng ký.",
    auth_modal_warn_question:
      "Quý khách có muốn nhận mã xác thực qua số điện thoại nêu trên không?",
    auth_modal_warn_button_confirm: "Nhận mã xác thực",
    auth_modal_warn_button_change_phone: "Đã đổi số điện thoại",
    auth_modal_call_button_call_center: "Gọi tổng đài",
    auth_modal_call_guide_1: "Quý khách vui lòng liên hệ tổng đài",
    //auth_modal_call_guide_2: " 1900 558854",
    auth_modal_call_guide_2_1: "1900",
    auth_modal_call_guide_2_2: "558854",
    auth_modal_call_guide_3: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước khôi phục mật khẩu.",
    modal_call_guide_register: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước đăng ký tài khoản.",
    modal_call_guide_forgot: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước khôi phục mật khẩu.",
    modal_call_guide_esigned: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước ký hợp đồng trực tuyến.",
    modal_call_guide_adjustment: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước ký Thỏa thuận điều chỉnh thông tin.",

    auth_modal_call_guide_4: " để được tư vấn và hỗ trợ.",
    //auth modal guide contract
    auth_modal_guide_contract_title: "Số hợp đồng",
    auth_modal_guide_contract_detail: "Số hợp đồng là số...",
    //auth modal guide id
    auth_modal_guide_id_title: "Số chứng minh nhân dân / Căn cước công dân",
    auth_modal_guide_id_detail: "Số chứng minh nhân dân là số...",
    //auth register enter contract
    auth_register_enter_contract_header: "Đăng ký",
    auth_register_enter_contract_guide: "Vui lòng nhập thông tin để đăng ký tài khoản",
    auth_register_enter_contract_input_contract: "Số hợp đồng",
    auth_register_enter_contract_input_id: "Số CMND/CCCD",
    auth_register_enter_contract_button_register: "Đăng ký",
    auth_register_enter_contract_question_account: "Đã có tài khoản? ",
    auth_register_enter_contract_button_login: "Đăng nhập ngay",
    auth_register_enter_contract_error_still_not_register_online: "HD SAISON rất tiếc chưa thể tạo tài khoản cho Quý khách. Lý do: Quý khách chưa đăng ký sử dụng dịch vụ điện tử.\n\nQuý khách vẫn có thể sử dụng ứng dụng di động để đăng ký vay và cập nhật các thông tin khuyến mãi mới nhất.",

    auth_register_enter_contract_back_to_home: "Quay về màn hình chính",
    //auth register enter otp
    auth_register_enter_otp_header: "Đăng ký",
    auth_register_enter_otp_guide_part_1:
      "Mã xác thực đã được gửi đến số điện thoại ",
    auth_register_enter_otp_guide_part_2: ". Vui lòng nhập vào ô dưới đây.",
    auth_register_enter_otp_button_confirm: "Xác nhận",
    auth_register_enter_otp_back_to_main: "Đồng ý",
    //auth register enter password
    auth_register_enter_password_header: "Đăng ký",
    auth_register_enter_password_title:
      "Chúc mừng \nQuý khách đã đăng ký tài khoản thành công",
    auth_register_enter_password_user_name: "Tên đăng nhập của Quý khách là ",
    auth_register_enter_password_guide:
      "Vui lòng cài đặt mật khẩu cho tài khoản \ncủa Quý khách.",
    auth_register_enter_password_input_pass: "Mật khẩu mới",
    auth_register_enter_password_input_pass_again: "Xác nhận lại mật khẩu mới",
    auth_register_enter_password_button_confirm: "Xác nhận",
    //auth register success
    auth_register_success_title:
      "Chúc mừng \nQuý khách đã đăng ký tài khoản thành công",
    auth_register_success_description_face_id:
      "Để đăng nhập dễ dàng hơn, Quý khách có muốn cài đặt tính năng đăng nhập bằng nhận diện khuôn mặt?",
    auth_register_success_description_touch_id:
      "Để đăng nhập dễ dàng hơn, Quý khách có muốn cài đặt tính năng đăng nhập bằng nhận vân tay?",
    auth_register_success_button_confirm: "Xác nhận",
    auth_register_success_button_cancel: "Bỏ qua",

    //auth register with phone
    auth_register_with_phone_enter_phone_nav: "Đăng nhập",
    auth_register_with_phone_enter_phone: "Số điện thoại",
    auth_register_with_phone_enter_phone_guide: "Vui lòng nhập số điện thoại Quý khách \nđang sử dụng",
    auth_register_with_phone_error_number_characters: "Số điện thoại phải có 10 chữ số.",
    auth_register_with_phone_button_continue: "Tiếp tục",
    auth_register_with_phone_enter_otp_nav: "Nhập mã xác thực",

    //auth login
    auth_login_header: "Đăng nhập",
    auth_login_guide: "Đăng nhập để tiếp tục",
    auth_login_button_login: "Đăng nhập",
    auth_login_input_user_name: "Tên đăng nhập",
    auth_login_input_password: "Mật khẩu",
    auth_login_forgot: "Quên tên đăng nhập hoặc mật khẩu?",
    auth_login_username_error_blank: "Tên đăng nhập không được trống",
    auth_login_password_error_blank: "Mật khẩu không được trống",
    auth_login_error_incorrect: "Tên đăng nhập hoặc mật khẩu không chính xác",
    auth_login_error_too_much: "Tài khoản bị tạm khoá do Quý khách nhập sai\nMật khẩu nhiều lần liên tiếp. Quý khách vui lòng đăng nhập lại sau",

    //component
    component_contract_item_sign_now: "Ký hợp đồng ngay",
    component_contract_item_sign_sub_esign: "Ký thoả thuận",
    component_contract_item_wait: "Phê duyệt",
    component_contract_item_state_signed: "Đã ký",
    component_contract_item_state_waiting: "Phê duyệt",
    component_contract_item_pay_guild: "Hướng dẫn thanh toán",
    component_contract_item_status_esign:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận sản phẩm.",
    component_contract_item_status_sub_esign:
      "Thông tin trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin.",
    component_contract_item_expire_date: "Ngày hết hạn: ",
    component_contract_item_signed_date: "Ngày ký:",
    component_contract_item_contract_code: "Số hợp đồng: ",
    component_modal_remind_sign_now: "Ký hợp đồng ngay",
    component_modal_remind_pay_now: "Thanh toán ngay",
    component_modal_buy_ticket_buy: "Đồng ý",
    component_modal_buy_ticket_title: "Các bước đặt vé máy bay trả góp",
    component_modal_buy_ticket_step: "Bước",
    component_modal_buy_ticket_step_01:
      "HD SAISON chuyển Quý khách đến trang điện tử của Vietjet Air.",
    component_modal_buy_ticket_step_02:
      "Chọn vé trên trang điện tử của Vietjet Air.",
    component_modal_buy_ticket_step_03:
      'Tại bước thanh toán, chọn phương thức thanh toán là',
    component_modal_buy_ticket_step_03_highlight: "\"Trả góp với HD SAISON\".",
    component_modal_buy_ticket_step_04:
      "Nhân viên HD SAISON liên lạc Quý khách để xác nhận thông tin.",
    component_modal_buy_ticket_step_05:
      "Ký hợp đồng tín dụng và nhận mã xác nhận đặt vé.",
    component_modal_buy_ticket_bottom: "HD SAISON và Vietjet Air hợp tác để\ncung cấp các tiện ích mua trả góp vé máy bay\ncho Quý khách hàng.",
    component_modal_change_password_title:
      "Thay đổi mật khẩu để bảo vệ tài khoản của bạn.",
    component_modal_change_password_message:
      "Mật khẩu đăng nhập tài khoản của Quý khách sắp hết hạn hiệu lực, Quý khách vui lòng thay đổi mật khẩu",
    component_modal_change_password_message_expire:
      "Mật khẩu đăng nhập tài khoản của Quý khách đã hết hạn hiệu lực, Quý khách vui lòng thay đổi mật khẩu",
    component_modal_change_password_button: "Đổi mật khẩu",
    component_modal_change_password_do_later: "Để sau",
    component_pie_chart_term: "kỳ",
    component_history_list_date: "Ngày thanh toán",
    component_history_list_amount: "Số tiền",

    component_loan_view_title: "Đăng ký vay với",
    component_loan_view_money: "Tiền mặt",
    component_loan_view_bike: "Xe/Điện máy",
    component_loan_view_plane_ticket: "Vé máy bay",

    //Modal Serial No (Số khung số máy)
    component_modal_serial_no_title: "Chưa thể ký Hợp đồng do thiếu thông tin \nSố khung/số máy.",
    component_modal_serial_no_des:
      "Quý khách vui lòng liên hệ nhân viên HDSAISON tại cửa hàng để được hỗ trợ cập nhật thông tin và tiếp tục ký Hợp đồng điện tử.",
    component_modal_serial_no_1: "Số khung",
    component_modal_serial_no_2: "Số máy",
    component_modal_serial_no_placeholder_1: "Nhập số khung",
    component_modal_serial_no_placeholder_2: "Nhập số máy",

    //Modal Adjustment
    component_modal_adjustment_title: "Thông báo điều chỉnh thông tin",
    component_modal_adjustment_message:
      "Thông tin {0} trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin.",
    component_modal_adjustment_message_CL:
      "Thông tin {0} trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin để hoàn tất hồ sơ và nhận tiền giải ngân.",
    component_modal_adjustment_contract_prefix: "Số hợp đồng: ",
    component_modal_adjustment_button_sign: "Ký thỏa thuận điều chỉnh thông tin",

    //Modal Waiting
    component_modal_waiting_title:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận sản phẩm.",
    component_modal_waiting_title_CL:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận tiền giải ngân.",

    //Modal Remind Payment
    component_modal_remind_pay_title: "Quý khách có khoản vay sắp đến hạn thanh toán. Vui lòng thanh toán trước ngày đến hạn.",
    component_modal_remind_pay_due_date: "Ngày đến hạn thanh toán",
    component_modal_remind_pay_due_amount: "Số tiền cần thanh toán",

    //Promotion List
    component_promotion_rate: "Lãi suất ưu đãi",
    promotion_tab_all_no_data: "Hiện tại Quý khách chưa có ưu đãi nào.",

    //Remind waiting contract
    component_remind_view_status: "Quý khách đang có {0} khoản vay đã được duyệt. Kích hoạt ngay để hoàn tất hồ sơ.",
    component_remind_view_status_Adjustment: "Quý khách đang có {0} hợp đồng điện tử đã ký chưa chính xác. Ký thỏa thuận để điều chỉnh thông tin.",

    //main account tab
    main_account_tab_nav: "Cài đặt tài khoản",
    main_account_tab_change_pass: "Đổi mật khẩu",
    main_account_tab_fingerprint: "Kích hoạt chức năng nhận diện \nvân tay",
    main_account_tab_face_id: "Kích hoạt chức năng nhận diện \nkhuôn mặt",
    main_account_tab_card_management: "Quản lý thẻ",
    main_account_tab_payment_history: "Lịch sử thanh toán",
    main_account_tab_policy: "Điều khoản và Điều kiện sử dụng\nDịch vụ Điện tử",
    main_account_tab_policy_short: "Điều khoản và Điều kiện sử...",
    main_account_tab_condition: "Bản điều khoản và điều kiện chung",
    main_account_tab_condition_short: "Bản điều khoản và điều...",
    main_account_tab_fab: "Câu hỏi thường gặp",
    main_account_tab_logout: "Đăng xuất",

    //Message for successful change information user
    account_profile_change_infor_success_message:
      "Chúc mừng\nQuý khách đã cập nhật\nthông tin cá nhân thành công",
    account_profile_confirm_success_message: "Xác nhận",

    //Message for successful change password
    account_profile_change_password_success_line1_message:
      "Chúc mừng\nQuý khách đã đổi mật khẩu thành công",
    account_profile_change_password_success_line2_message: "Tên đăng nhập của Quý khách là",


    //Message for change information account
    account_profile_change_error_fullName_message: "Họ và tên không hợp lệ",
    account_profile_change_error_fullName_null_message: "Họ và tên không được để trống",
    account_profile_change_error_email_null_message: "Email không được để trống",
    account_profile_change_error_format_email_message: "Email không hợp lệ.",
    account_profile_change_error_nouppercase_email_message: "Email không được có kí tự hoa",
    account_profile_change_error_email_message: "Email không được có khoảng trắng",
    account_profile_change_error_length_email_message: "Email phải có ít nhất 4 kí tự",

    account_profile_change_error_phoneNumber_null_message: "Số điện thoại không được để trống",
    account_profile_change_error_phoneNumber_fomat_message: "Số điện thoại không đúng định dạng",
    account_profile_change_error_phoneNumber_not_correct_message: "Số điện thoại không tồn tại",
    account_profile_change_error_phoneNumber_length_message: "Số điện thoại phải có 10 chữ số",
    account_profile_change_error_CMND_null_message: "Số CMND không được để trống",
    account_profile_change_error_CMND_fomat_message: "Số CMND không đúng định dạng",
    account_profile_change_error_CMND_lengh_message: "Số CMND phải có 9 chữ số hoặc 12 chữ số",
    account_profile_change_error_address_null_message: "Địa chỉ không được để trống",


    account_profile__message_error_empty_input_current_pass: "Mật khẩu hiện tại không được để trống.",
    account_profile__message_error_empty_input_new_pass: "Mật khẩu mới không được để trống.",
    account_profile__message_error_empty_input_re_pass: "Xác nhận lại mật khẩu mới không được để trống.",



    //Message error for change password account
    account_profile__message_error_input_current_pass:
      "Mật khẩu hiện tại phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile__message_error_input_new_pass:
      "Mật khẩu mới phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile__message_error_input_re_pass:
      "Mật khẩu nhập lại phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile_change_password_message: "Nhập mật khẩu không hợp lệ.",

    account_profile_same_password_message: "Mật khẩu mới và xác nhận lại mật khẩu mới không trùng.",
    account_profile_newpassword_must_different_current_message:
      "Mật khẩu mới phải khác mật khẩu hiện tại.",

    //home tab
    promotion_tab_promotion_detail_nav: "Ưu đãi",
    home_tab_group_header_promotion: "Ưu đãi dành cho Quý khách",
    home_tab_group_header_promotion_new: "Ưu đãi mới",
    promotion_tab_promotion_register_nav: "Đăng ký nhận ưu đãi",
    promotion_tab_promotion_detail_event_nav: "Khuyến mãi",
    home_tab_group_header_event: "Khuyến mãi",
    home_tab_group_header_news: "Tin tức",
    home_tab_group_header_guild: "Hướng dẫn thanh toán",
    home_tab_contract_waiting_nav: "Hợp đồng đang đợi ký",
    home_tab_contract_adjustment_nav: "Phụ lục đang đợi ký",
    promotion_tab_promotion_detail_reg_now: "Đăng ký ngay",
    promotion_tab_without_login: "Quý khách chưa đăng nhập",
    promotion_tab_without_login_announcement: "Quý khách vui lòng đăng nhập hoặc đăng ký để nhận ưu đãi dành riêng cho quý khách",

    home_tab_guild_store_nav: "Cửa hàng gần bạn",
    home_tab_guild_store_province: "Chọn Tỉnh / Thành phố",
    home_tab_guild_store_province_search: "Tìm Tỉnh / Thành phố",
    home_tab_guild_store_district: "Chọn quận, huyện",
    home_tab_guild_store_district_search: "Tìm quận, huyện",

    home_tab_news_list_nav: "Tin tức",
    home_tab_guild_payment_nav: "Hướng dẫn thanh toán",

    //loan tab
    loan_tab_register_request_guess_check: "Quý khách vui lòng kiểm tra lại thông tin\ntrước khi đăng ký.",
    loan_tab_register_for_consult: "Thông tin tạm tính chỉ mang tính chất tham khảo",
    loan_tab_register_loan_nav: "Đăng ký vay",
    loan_tab_register_loan_userinfo: "Thông tin khách hàng",
    loan_tab_register_loan_loaninfo: "Thông tin khoản vay",
    loan_tab_register_loan_purpose: "Mục đích vay:",
    loan_tab_register_loan_product: "Sản phẩm vay (không bắt buộc)",
    loan_tab_register_loan_percent_pay_first: "Phần trăm trả trước",
    loan_tab_register_loan_select_production: "Sản phẩm",
    loan_tab_register_loan_amount: "Số tiền vay:",
    loan_tab_register_price_product_amount: "Giá sản phẩm:",
    loan_tab_register_loan_term: "Thời hạn vay:",
    loan_tab_register_loan_fullname: "Họ và tên",
    loan_tab_register_loan_phone: "Số điện thoại",
    loan_tab_register_loan_idcard: "CMND/CCCD",
    loan_tab_register_loan_address: "Địa chỉ",
    loan_tab_register_loan_month: "tháng",
    loan_tab_register_loan_please_select_product: "Vui lòng chọn sản phẩm",
    loan_tab_register_loan_confirm: "Xác nhận",
    loan_tab_register_loan_returnMain: "Màn hình chính",
    loan_tab_register_loan_return_promotion_tab: "Xem ưu đãi khác",
    loan_tab_register_loan_complete_status:
      "Đơn đăng ký vay của quý khách đã được gởi đi thành công. Chúng tôi sẽ liên hệ Quý khách trong thời gián sớm nhất để hoàn tất hồ sơ.",
    loan_tab_register_loan: "Đăng ký",
    loan_tab_register_loan_finish: "Thông tin đăng ký vay của Quý khách đã được gửi đến HD SAISON. Chúng tôi sẽ liên hệ Quý khách trong thời gian sớm nhất để hoàn tất hồ sơ.",
    loan_tab_register_loan_from_promotion_finish: "Thông tin đăng ký của Quý khách đã được gởi đến HD SAISON. Chúng tôi sẽ liên hệ đến Quý khách trong thời gian sớm nhất.",
    loan_tab_register_loan_fill_info_error_name_blank: "Quý khách vui lòng nhập Họ và tên.",
    loan_tab_register_loan_fill_info_error_phone_blank: "Quý khách vui lòng nhập Số điện thoại.",
    loan_tab_register_loan_fill_info_error_address_blank: "Quý khách vui lòng \nchọn Địa điểm làm hợp đồng.",

    loan_tab_manager_loan_nav: "Quản lý khoản vay",
    loan_tab_manager_loan_waiting: "Hợp đồng đợi ký",
    loan_tab_manager_loan_due: "Hợp đồng đến hạn thanh toán",
    loan_tab_manager_loan_current: "Hợp đồng hiện tại",
    loan_tab_manager_loan_empty_status:
      "Hiện tại Quý khách chưa có khoản vay tại \nHD SAISON",

    loan_tab_detail_loan_contract_id: "Số hợp đồng: ",
    loan_tab_detail_loan_pay_amount_month: "Số tiền thanh toán hàng tháng",
    loan_tab_detail_loan_pay_date: "Ngày thanh toán hàng tháng",
    loan_tab_detail_loan_insurance: "Bảo hiểm khoản vay",
    loan_tab_detail_loan_contract: "Hợp đồng khoản vay",
    loan_tab_detail_loan_remind: "Nhắc thanh toán",
    loan_tab_detail_loan_term: "Kỳ thanh toán",
    loan_tab_detail_loan_history: "Lịch sử thanh toán",
    loan_tab_detail_loan_guild: "Hướng dẫn thanh toán",
    loan_tab_detail_loan_finish: "Ngày kết thúc",
    loan_tab_detail_loan_remind_pay_on_message: "Quý khách muốn bật chức năng \nnhắc thanh toán cho hợp đồng này.",
    loan_tab_detail_loan_remind_pay_off_message: "Quý khách muốn tắt chức năng \nnhắc thanh toán cho hợp đồng này.",

    loan_tab_pay_history_nav: "Lịch sử thanh toán",

    loan_tab_detail_contract_nav: "Hợp đồng khoản vay",
    loan_tab_detail_contract_tab_1: "Hợp đồng tín dụng",
    loan_tab_detail_contract_tab_2: "Thoả thuận điều chỉnh thông tin",

    loan_tab_add_info_nav: "Thêm hợp đồng",
    loan_tab_add_info_status:
      "Quý khách vui lòng nhập chính xác \n số hợp đồng và số CMND/CCCD mới nhất.",
    loan_tab_add_info_contract_no: "Số hợp đồng",
    loan_tab_add_info_id_no: "Số CMND/CCCD",
    loan_tab_add_info_button_next: "Tiếp tục",

    loan_tab_add_confirm_nav: "Thêm hợp đồng",
    loan_tab_add_confirm_status:
      "Quý khách vui lòng kiểm tra thông tin khoản vay trước khi thêm vào chức năng \n Quản lý khoản vay.",
    loan_tab_add_confirm_state: "Trạng thái",
    loan_tab_add_confirm_contract_no: "Số hợp đồng",
    loan_tab_add_confirm_loan_product: "Sản phẩm vay",
    loan_tab_add_confirm_series_no: "Số series",
    loan_tab_add_confirm_loan_amount: "Số tiền vay",
    loan_tab_add_confirm_interest_rate: "Lãi suất hàng tháng",
    loan_tab_add_confirm_number_terms: "Thời hạn vay",
    loan_tab_add_confirm_pay_month_amount: "Số tiền thanh toán hàng tháng",
    loan_tab_add_confirm_first_date_pay: "Ngày thanh toán đầu tiên",
    loan_tab_add_confirm_last_date_pay: "Ngày thanh toán cuối cùng",
    loan_tab_add_confirm_pay_month_date: "Ngày thanh toán hàng tháng",
    loan_tab_add_confirm_loan_insurance: "Bảo hiểm khoản vay",
    loan_tab_add_confirm_send_fee: "Phí chuyển tiền",
    loan_tab_add_confirm_bank_account_user: "Chủ tài khoản",
    loan_tab_add_confirm_bank_account_no: "Số tài khoản",
    loan_tab_add_confirm_bank_name: "Tên ngân hàng",
    loan_tab_add_confirm_button_complete: "Hoàn tất",

    loan_tab_current_contract_nav: "Hợp đồng hiện tại",
    loan_tab_component_tooltip_text:
      "Đây là khoản vay vừa được thêm vào quản lý. Nếu không đúng khoản vay của bạn, vuốt sáng trái để xoá khỏi danh mục quản lý khoản vay.",

    loan_tab_esign_tab_nav: "Ký hợp đồng trực tuyến",
    loan_tab_esign_tab_nav_step_01: "Bước 1: Tóm tắt khoản vay",
    loan_tab_esign_tab_nav_step_02: "Bước 2: Xem thông tin hợp đồng",
    loan_tab_esign_tab_nav_step_03: "Bước 3: Xác nhận ký hợp đồng",
    loan_tab_esign_tab_nav_step_04: "Bước 4: Hoàn tất ký hợp đồng",
    loan_tab_esign_overview: "Tóm tắt",
    loan_tab_esign_overview_loan_info: "Thông tin khoản vay",
    loan_tab_esign_overview_account_info: "Thông tin tài khoản",
    loan_tab_esign_overview_select_first_due: "Quý khách vui lòng chọn ngày thanh toán hàng tháng",
    loan_tab_esign_overview_first_due_date: "Ngày thanh toán đầu tiên: ",
    loan_tab_esign_overview_frame_no: "Số khung",
    loan_tab_esign_overview_frame_no_placeholder: "Nhập số khung",
    loan_tab_esign_overview_elect_no: "Số máy",
    loan_tab_esign_overview_elect_no_placeholder: "Nhập số máy",
    loan_tab_esign_overview_error_monthly_due: "Quý khách vui lòng chọn \nngày thanh toán hàng tháng.",
    loan_tab_esign_overview_error_bank_info: "Quý khách vui lòng nhập đầy đủ \nthông tin tài khoản ngân hàng.",
    loan_tab_esign_overview_error_chassis_engineer: "Quý khách vui lòng nhập đầy đủ \nsố khung và số máy.",
    loan_tab_esign_overview_product_price: "Giá sản phẩm",
    loan_tab_esign_overview_product: "Sản phẩm",
    loan_tab_esign_overview_warning_empty_field: "Quý khách vui lòng nhập đầy đủ \nnhững thông tin cần thiết.",

    loan_tab_esign_contract: "Xem hợp đồng",
    loan_tab_esign_sign: "Xác nhận",
    loan_tab_esign_complete: "Hoàn tất",
    loan_tab_esign_button_sign: "Ký hợp đồng",
    loan_tab_esign_button_accept: "Xác nhận",
    loan_tab_esign_button_continue: "Tiếp tục",
    loan_tab_esign_button_loan_manager: "Quản lý khoản vay",
    loan_tab_esign_contract_document_agree:
      "Tôi đã đọc, hiểu và đồng ý với toàn bộ nội dung trên.",
    loan_tab_esign_policy_title: "Điều Khoản Và Điều Kiện Sử DỤng Hợp Đồng Trực Tuyến.",
    loan_tab_esign_complete_status_part_ED_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_ED_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_ED_3: "Quý khách vui lòng liên hệ nhân viên của",
    loan_tab_esign_complete_status_part_ED_4: "HD SAISON tại cửa hàng để hoàn tất hồ sơ và nhận sản phẩm.",

    loan_tab_esign_complete_status_part_CL_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_CL_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_CL_3: "HD SAISON sẽ giải ngân số tiền vay ",
    loan_tab_esign_complete_status_part_CL_4: "vào tài khoản ",
    loan_tab_esign_complete_status_part_CL_5: " của Quý khách ",
    loan_tab_esign_complete_status_part_CL_6: "tại ngân hàng ",
    loan_tab_esign_complete_status_part_CL_7: "trong tối đa ",
    loan_tab_esign_complete_status_part_CL_8: "2 ngày ",
    loan_tab_esign_complete_status_part_CL_9: "làm việc.",

    loan_tab_esign_complete_status_part_MC_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_MC_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_MC_3: "Quý khách vui lòng liên hệ nhân viên của",
    loan_tab_esign_complete_status_part_MC_4: "HD SAISON tại cửa hàng để hoàn tất hồ sơ và nhận sản phẩm.",
    
    loan_tab_esign_enter_otp_guild: "Mã xác thực để ký hợp đồng đã được gửi đến số điện thoại",
    loan_tab_esign_sub_enter_otp_guild: "Mã xác thực để ký Thỏa thuận điều chỉnh thông tin đã được gửi đến số điện thoại",

    loan_tab_esign_sign_status: "Quý khách vui lòng đăng nhập lại để tiếp tục \nký Hợp đồng điện tử.",
    loan_aler_contract_cannot_delete: "Hợp đồng ký điện tử không được quyền xoá.",
    loan_aler_contract_customer_cannot_delete: "Khách hàng không thể xóa số hợp đồng dùng đăng ký tài khoản",

    //Esign PLHD
    loan_tab_esign_sub_tab_nav: "Thoả thuận điều chỉnh thông tin",
    loan_tab_esign_sub_tab_nav_step_01: "Bước 1: Tóm tắt thông tin điều chỉnh",
    loan_tab_esign_sub_tab_nav_step_02: "Bước 2: Xem thoả thuận",
    loan_tab_esign_sub_tab_nav_step_03: "Bước 3: Xác nhận ký thoả thuận",
    loan_tab_esign_sub_tab_nav_step_04: "Bước 4: Hoàn tất ký thoả thuận",
    loan_tab_esign_sub_overview: "Tóm tắt",
    loan_tab_esign_sub_contract: "Xem thoả thuận",
    loan_tab_esign_sub_sign: "Xác nhận",
    loan_tab_esign_sub_complete: "Hoàn tất",
    loan_tab_esign_sub_overview_name_info: "Họ và tên",
    loan_tab_esign_sub_overview_id_info: "Số CMND/CCCD",
    loan_tab_esign_sub_overview_old_info: "Thông tin cũ",
    loan_tab_esign_sub_overview_new_info: "Thông tin mới",
    loan_tab_esign_sub_complete_status: "Quý khách đã hoàn tất điều chỉnh \nthông tin.",
    loan_tab_esign_sub_sign_status: "Quý khách vui lòng đăng nhập lại để tiếp tục \nký Thỏa thuận điều chỉnh thông tin.",

    loan_tab_login_phone_can_not_use_title: "Chưa thể sử dụng chức năng này",
    loan_tab_login_phone_can_not_use_message:
      "Quý khách vui lòng thực hiện đăng ký bằng \nthông tin hợp đồng đã có với HD SAISON để \ncó thể sử dụng chức năng này.",
    loan_tab_login_phone_button_sign_up: "Đăng ký",

    loan_mangement_contract_mail_confirm_text: "Quý khách vui lòng nhập email để nhận chứng từ điện tử đã ký",
    loan_mangement_contract_mail_successful_text: "Chứng từ điện tử đã được gửi đến email của Quý khách.",

    //Modal required change password
    modal_required_change_password_title: "Thay đổi mật khẩu để bảo vệ tài khoản của Quý khách.",
    modal_required_change_password_message_expired: "Mật khẩu đăng nhập tài khoản của Quý khách đã hết hiệu lực. Quý khách vui lòng thay đổi mật khẩu.",
    modal_required_change_password_message_remind: "Mật khẩu đăng nhập tài khoản của Quý khách sắp hết hiệu lực. Quý khách vui lòng thay đổi mật khẩu.",

    modal_register_option_title: "Quý khách đã có hợp đồng vay với \nHD SAISON?",
    modal_register_option_message:
      "Đăng ký với thông tin hợp đồng đã có sẽ giúp \nQuý khách trải nghiệm đầy đủ các chức năng \ncủa ứng dụng.",
    modal_register_option_button_have_contract: "Đã có hợp đồng",
    modal_register_option_button_no_contract: "Chưa có hợp đồng",

    //Modal Warning Phone
    modal_warning_phone_title: "Mã xác thực sẽ được gửi đến số điện thoại",
    modal_warning_phone_message: "Quý khách có muốn nhận mã xác thực \nqua số điện thoại nêu trên không?",
    modal_warning_phone_button_receive: "Nhận mã xác thực",
    modal_warning_phone_button_after: "Để sau",

    home_tab_notification_list_nav: "Thông báo",

    modal_warning_forgot_password_expired_title: "Quý khách có muốn đặt lại mật khẩu?",
    modal_warning_forgot_password_expired_message: "Vì lý do bảo mật, ứng dụng sẽ thực hiện đăng xuất tài khoản của Quý khách, sau đó chuyển đến màn hình đặt lại mật khẩu để tạo mật khẩu mới.",
    modal_warning_forgot_password_expired_agree: "Đồng ý",
    modal_warning_forgot_password_expired_decide: "Không đồng ý",
  },
  vi: {
    app_loading: "Đang xử lý...",
    login_button_forgot: "Quên mật khẩu?",
    login_button_login: "Đăng nhập",
    login_button_language: "English",
    login_button_register: "Đăng ký",
    login_text_or: "Hoặc",
    login_hint_user_name: "Tên đăng nhập",
    login_hint_password: "mật khẩu",
    login_fingerprint_cancel: "Huỷ bỏ",
    login_fingerprint_guide: "Quét vân tay để\nđăng nhập",
    login_message_empty_user_name: "Vui lòng điền tên đăng nhập",
    login_message_empty_password: "Vui lòng điền mật khẩu",
    message_title_notify: "Thông báo",
    modal_button_ok_default: "Đồng ý",
    modal_button_cancel_default: "Hủy bỏ",
    modal_title_default: "Xác nhận",
    home_button_logout: "Đăng xuất",
    home_logout_question: "Bạn có muốn đăng xuất khỏi tài khoản?",
    app_exit_question: "Quý khách có muốn thoát ứng dụng?",
    hello: "hello {0}",
    //common
    common_version_app: "Phiên bản: ",
    common_all: "Tất cả",
    common_re_loading: "Tải lại",
    common_view_all: "Xem tất cả",
    common_yes: "Có",
    common_no: "Không",
    common_date: "Ngày",
    common_month: "Tháng",
    common_view_detail: "Xem chi tiết",
    common_province: "Tỉnh / Thành phố",
    common_district: "Quận, huyện",
    common_signed: "Đã ký",
    common_waiting: "Phê duyệt",
    common_otp_status: "Mã xác thực sẽ hết hiệu lực trong vòng ",
    common_otp_not_receive: "Chưa nhận được OTP ",
    common_otp_timeout: "Mã xác thực đã hết hiệu lực. ",
    common_otp_resend: "Gửi lại?",
    common_tooltip_validate_01: "Độ dài tối thiểu 6 ký tự",
    common_tooltip_validate_02: "Bao gồm ký tự chữ và số",
    common_tooltip_validate_03: "Có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt",
    common_error_time_out: "Mạng Internet đang chậm. Cảm phiền bạn đăng nhập lại lần nữa.",
    common_error_contract_file_not_found: "File hợp đồng không tồn tại.\nVui lòng thử lại sau.",
    common_error_contract_esign_file: "Không tải được file hợp đồng.\nVui lòng thử lại sau.",
    common_error_contract_adjustment_file: "Không tải được file phụ lục hợp đồng.\nVui lòng thử lại sau.",

    common_warning_setting_touch_id: "Vui lòng đăng nhập và thiết lập nhận diện vân tay trong cài đặt.",
    common_warning_setting_face_id: "Vui lòng đăng nhập và thiết lập nhận diện khuôn mặt trong cài đặt.",
    common_warning_email_format: "Vui lòng nhập đúng định dạng Email",
    common_send: "Gửi",
    common_confirm: "Xác nhận",
    common_continue: "Tiếp tục",
    common_bank_select: "Chọn ngân hàng",
    common_bank_search: "Tìm ngân hàng",
    common_second: "giây",
    common_minute: "phút",
    common_hour: "giờ",
    common_otp_verify_timeout: "Mã xác thực đã hết hiệu lực.\nVui lòng gửi lại",
    common_adjustment_item_button: "Ký phụ lục ngay",
    common_register: "Đăng ký",
    common_register_now: "Đăng ký ngay",

    common_tab_home: "Trang chủ",
    common_tab_loan: "Khoản vay",
    common_tab_card: "Thẻ",
    common_tab_promotion: "Ưu đãi",
    common_tab_account: "Tài khoản",
    common_error_try_again: "Đã có lỗi xảy ra. Quý khách vui lòng thử lại.",
    common_error_promotion_not_exist: "Ưu đãi Quý khách đang xem đã hết hạn \nhoặc không tồn tại.",
    common_error_new_not_exist: "Tin tức Quý khách đang xem đã hết hạn \nhoặc không tồn tại.",

    //popup token
    common_expired_token_message: "Phiên đăng nhập của bạn đã hết hạn.\nVui lòng đăng nhập lại tài khoản.",
    common_expired_token_button: "Đồng ý",
    common_button_ok: "Đồng ý",
    common_button_no: "Không đồng ý",
    common_save: "Lưu",
    common_take_photo: "Chụp ảnh",
    common_choose_from_library: "Chọn từ hình ảnh",
    common_cancel: "Hủy",
    common_data_null: "Không có dữ liệu",

    //Warning Time out sign esign and adjustment
    common_warning_time_up_sign_esign: "Hết thời gian ký hợp đồng.\nThời gian hiệu lực từ {0} đến {1}",
    common_warning_time_up_sign_adjustment: "Hết thời gian ký phụ lục hợp đồng.\nThời gian hiệu lực từ {0} đến {1}",
    common_warning_card_feature_no_support: "Phiên bản hiện tại chưa hỗ trợ chức năng này.",
    common_warning_no_notification: "Hiện tại Quý khách chưa nhận được tin thông báo nào.",
    common_warning_no_internet_connection: "Không có kết nối mạng! \nXin Quý khách vui lòng kiểm tra lại kết nối",

    //Warning before delete contract
    common_warning_delete_contract: "Hệ thống sẽ thực hiện xóa hợp đồng này.\nQuý khách có đồng ý không?",

    //forgot enter contract
    auth_forgot_enter_contract_header: "Quên mật khẩu",
    auth_forgot_enter_contract_guide_01:
      "HD SAISON chưa xác định được tài khoản liên kết với Số CMND/CCCD do Quý khách cung cấp, vui lòng cung cấp thêm thông tin ",
    auth_forgot_enter_contract_guide_02: "Số hợp đồng ",
    auth_forgot_enter_contract_guide_03: "để tiếp tục bước khôi phục mật khẩu.",
    auth_forgot_enter_contract_input_id: "Số CMND/CCCD",
    auth_forgot_enter_contract_input_contract: "Số hợp đồng",
    auth_forgot_enter_contract_button_confirm: "Xác nhận",
    //forgot enter id
    auth_forgot_enter_id_header: "Quên mật khẩu",
    auth_forgot_enter_id_input_id: "Số CMND/CCCD",
    auth_forgot_enter_id_guide: "Vui lòng xác nhận thông tin bên dưới.",
    auth_forgot_enter_id_button_confirm: "Xác nhận",
    auth_forgot_enter_id_error_number_characters:
      "Số CMND/CCCD phải có 9 hoặc 12 số",
    auth_forgot_enter_id_user_no_register:
      "Quý khách chưa đăng ký Tài khoản với \nHD SAISON, vui lòng đăng ký Tài khoản \nđể sử dụng dịch vụ.",
    auth_forgot_enter_id_error_null: "Số CMND/CCCD không được để trống",
    auth_forgot_enter_contract_error_null: "Số hợp đồng không được để trống",
    //forgot enter Otp
    auth_forgot_enter_otp_header: "Nhập mã xác thực",
    auth_forgot_enter_otp_guide_part_1:
      "Mã xác thực đã được gửi đến số điện thoại ",
    auth_forgot_enter_otp_guide_part_2: ". Vui lòng nhập vào ô dưới đây.",
    auth_forgot_enter_otp_button_confirm: "Xác nhận",
    //forgot enter password
    auth_forgot_enter_password_header: "Đặt lại mật khẩu",
    auth_forgot_enter_password_input_pass: "Mật khẩu mới",
    auth_forgot_enter_password_input_pass_again: "Xác nhận lại mật khẩu mới",
    auth_forgot_enter_password_button_confirm: "Xác nhận",
    //forgot complete
    auth_forgot_complete_nav: "Đặt lại mật khẩu thành công",
    auth_forgot_complete_status: "Chúc mừng \nQuý khách đã đổi mật khẩu thành công",
    auth_forgot_complete_sub_status: "Tên đăng nhập của quý khách là ",
    auth_forgot_complete_button_continue_sign: "Tiếp tục ký hợp đồng ",

    //modal warn phone
    auth_modal_warn_guide:
      "Mã xác thực sẽ được gửi đến số điện thoại ******5146 mà bạn đăng ký với HD SAISON để thiết lập lại mật khẩu.",
    auth_modal_warn_guide_01_01: "Mã xác thực để đăng ký tài khoản sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_02: "Mã xác thực để khôi phục mật khẩu sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_03: "Mã xác thực để ký hợp đồng sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_01_04: "Mã xác thực để ký Thoả thuận điều chỉnh thông tin sẽ được gửi đến số điện thoại ",
    auth_modal_warn_guide_02: " Quý khách đã đăng ký.",
    auth_modal_warn_question:
      "Quý khách có muốn nhận mã xác thực qua số điện thoại nêu trên không?",
    auth_modal_warn_button_confirm: "Nhận mã xác thực",
    auth_modal_warn_button_change_phone: "Đã đổi số điện thoại",
    auth_modal_call_button_call_center: "Gọi tổng đài",
    auth_modal_call_guide_1: "Quý khách vui lòng liên hệ tổng đài",
    //auth_modal_call_guide_2: " 1900 558854",
    auth_modal_call_guide_2_1: "1900",
    auth_modal_call_guide_2_2: "558854",
    auth_modal_call_guide_3: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước khôi phục mật khẩu.",
    modal_call_guide_register: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước đăng ký tài khoản.",
    modal_call_guide_forgot: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước khôi phục mật khẩu.",
    modal_call_guide_esigned: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước ký hợp đồng trực tuyến.",
    modal_call_guide_adjustment: " để cập nhật số điện thoại mới, sau đó thực hiện lại bước ký Thỏa thuận điều chỉnh thông tin.",

    auth_modal_call_guide_4: " để được tư vấn và hỗ trợ.",
    //auth modal guide contract
    auth_modal_guide_contract_title: "Số hợp đồng",
    auth_modal_guide_contract_detail: "Số hợp đồng là số...",
    //auth modal guide id
    auth_modal_guide_id_title: "Số chứng minh nhân dân / Căn cước công dân",
    auth_modal_guide_id_detail: "Số chứng minh nhân dân là số...",
    //auth register enter contract
    auth_register_enter_contract_header: "Đăng ký",
    auth_register_enter_contract_guide: "Vui lòng nhập thông tin để đăng ký tài khoản",
    auth_register_enter_contract_input_contract: "Số hợp đồng",
    auth_register_enter_contract_input_id: "Số CMND/CCCD",
    auth_register_enter_contract_button_register: "Đăng ký",
    auth_register_enter_contract_question_account: "Đã có tài khoản? ",
    auth_register_enter_contract_button_login: "Đăng nhập ngay",
    auth_register_enter_contract_error_still_not_register_online: "HD SAISON rất tiếc chưa thể tạo tài khoản cho Quý khách. Lý do: Quý khách chưa đăng ký sử dụng dịch vụ điện tử.\n\nQuý khách vẫn có thể sử dụng ứng dụng di động để đăng ký vay và cập nhật các thông tin khuyến mãi mới nhất.",
    auth_register_enter_contract_back_to_home: "Quay về màn hình chính",
    //auth register enter otp
    auth_register_enter_otp_header: "Đăng ký",
    auth_register_enter_otp_guide_part_1:
      "Mã xác thực đã được gửi đến số điện thoại ",
    auth_register_enter_otp_guide_part_2: ". Vui lòng nhập vào ô dưới đây.",
    auth_register_enter_otp_button_confirm: "Xác nhận",
    auth_register_enter_otp_back_to_main: "Đồng ý",
    //auth register enter password
    auth_register_enter_password_header: "Đăng ký",
    auth_register_enter_password_title:
      "Chúc mừng \nQuý khách đã đăng ký tài khoản thành công",
    auth_register_enter_password_user_name: "Tên đăng nhập của Quý khách là ",
    auth_register_enter_password_guide:
      "Vui lòng cài đặt mật khẩu cho tài khoản \ncủa Quý khách.",
    auth_register_enter_password_input_pass: "Mật khẩu mới",
    auth_register_enter_password_input_pass_again: "Xác nhận lại mật khẩu mới",
    auth_register_enter_password_button_confirm: "Xác nhận",
    //auth register success
    auth_register_success_title:
      "Chúc mừng \nQuý khách đã đăng ký tài khoản thành công",
    auth_register_success_description_face_id:
      "Để đăng nhập dễ dàng hơn, Quý khách có muốn cài đặt tính năng đăng nhập bằng nhận diện khuôn mặt?",
    auth_register_success_description_touch_id:
      "Để đăng nhập dễ dàng hơn, Quý khách có muốn cài đặt tính năng đăng nhập bằng nhận vân tay?",
    auth_register_success_button_confirm: "Xác nhận",
    auth_register_success_button_cancel: "Bỏ qua",

    //auth register with phone
    auth_register_with_phone_enter_phone_nav: "Đăng nhập",
    auth_register_with_phone_enter_phone: "Số điện thoại",
    auth_register_with_phone_enter_phone_guide: "Vui lòng nhập số điện thoại Quý khách \nđang sử dụng",
    auth_register_with_phone_error_number_characters: "Số điện thoại phải có 10 chữ số.",
    auth_register_with_phone_button_continue: "Tiếp tục",
    auth_register_with_phone_enter_otp_nav: "Nhập mã xác thực",

    //auth login
    auth_login_header: "Đăng nhập",
    auth_login_guide: "Đăng nhập để tiếp tục",
    auth_login_button_login: "Đăng nhập",
    auth_login_input_user_name: "Tên đăng nhập",
    auth_login_input_password: "Mật khẩu",
    auth_login_forgot: "Quên tên đăng nhập hoặc mật khẩu?",
    auth_login_username_error_blank: "Tên đăng nhập không được trống",
    auth_login_password_error_blank: "Mật khẩu không được trống",
    auth_login_error_incorrect: "Tên đăng nhập hoặc mật khẩu không chính xác",
    auth_login_error_too_much: "Tài khoản bị tạm khoá do Quý khách nhập sai\nMật khẩu nhiều lần liên tiếp. Quý khách vui lòng đăng nhập lại sau",

    //component
    component_contract_item_sign_now: "Ký hợp đồng ngay",
    component_contract_item_sign_sub_esign: "Ký thoả thuận",
    component_contract_item_wait: "Phê duyệt",
    component_contract_item_state_signed: "Đã ký",
    component_contract_item_state_waiting: "Phê duyệt",
    component_contract_item_pay_guild: "Hướng dẫn thanh toán",
    component_contract_item_status_esign:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận sản phẩm.",
    component_contract_item_status_sub_esign:
      "Thông tin trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin.",
    component_contract_item_expire_date: "Ngày hết hạn: ",
    component_contract_item_signed_date: "Ngày ký:",
    component_contract_item_contract_code: "Số hợp đồng: ",
    component_modal_remind_sign_now: "Ký hợp đồng ngay",
    component_modal_remind_pay_now: "Thanh toán ngay",
    component_modal_buy_ticket_buy: "Đồng ý",
    component_modal_buy_ticket_title: "Các bước đặt vé máy bay trả góp",
    component_modal_buy_ticket_step: "Bước",
    component_modal_buy_ticket_step_01:
      "HD SAISON chuyển Quý khách đến trang điện tử của Vietjet Air.",
    component_modal_buy_ticket_step_02:
      "Chọn vé trên trang điện tử của Vietjet Air.",
    component_modal_buy_ticket_step_03:
      'Tại bước thanh toán, chọn phương thức thanh toán là',
    component_modal_buy_ticket_step_03_highlight: "\"Trả góp với HD SAISON\".",
    component_modal_buy_ticket_step_04:
      "Nhân viên HD SAISON liên lạc Quý khách để xác nhận thông tin.",
    component_modal_buy_ticket_step_05:
      "Ký hợp đồng tín dụng và nhận mã xác nhận đặt vé.",
    component_modal_buy_ticket_bottom: "HD SAISON và Vietjet Air hợp tác để\ncung cấp các tiện ích mua trả góp vé máy bay\ncho Quý khách hàng.",
    component_modal_change_password_title:
      "Thay đổi mật khẩu để bảo vệ tài khoản của bạn.",
    component_modal_change_password_message:
      "Mật khẩu đăng nhập tài khoản của Quý khách sắp hết hạn hiệu lực, Quý khách vui lòng thay đổi mật khẩu",
    component_modal_change_password_message_expire:
      "Mật khẩu đăng nhập tài khoản của Quý khách đã hết hạn hiệu lực, Quý khách vui lòng thay đổi mật khẩu",
    component_modal_change_password_button: "Đổi mật khẩu",
    component_modal_change_password_do_later: "Để sau",
    component_pie_chart_term: "kỳ",
    component_history_list_date: "Ngày thanh toán",
    component_history_list_amount: "Số tiền",

    component_loan_view_title: "Đăng ký vay với",
    component_loan_view_money: "Tiền mặt",
    component_loan_view_bike: "Xe/Điện máy",
    component_loan_view_plane_ticket: "Vé máy bay",

    //Modal Serial No (Số khung số máy)
    component_modal_serial_no_title: "Chưa thể ký Hợp đồng do thiếu thông tin \nSố khung/số máy.",
    component_modal_serial_no_des:
      "Quý khách vui lòng liên hệ nhân viên HDSAISON tại cửa hàng để được hỗ trợ cập nhật thông tin và tiếp tục ký Hợp đồng điện tử.",
    component_modal_serial_no_1: "Số khung",
    component_modal_serial_no_2: "Số máy",
    component_modal_serial_no_placeholder_1: "Nhập số khung",
    component_modal_serial_no_placeholder_2: "Nhập số máy",

    //Modal Adjustment
    component_modal_adjustment_title: "Thông báo điều chỉnh thông tin",
    component_modal_adjustment_message:
      "Thông tin {0} trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin.",
    component_modal_adjustment_message_CL:
      "Thông tin {0} trên Hợp đồng điện tử Quý khách đã ký chưa chính xác. Vui lòng ký Thoả thuận điều chỉnh thông tin để hoàn tất hồ sơ và nhận tiền giải ngân.",
    component_modal_adjustment_contract_prefix: "Số hợp đồng: ",
    component_modal_adjustment_button_sign: "Ký thỏa thuận điều chỉnh thông tin",

    //Modal Waiting
    component_modal_waiting_title:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận sản phẩm.",
    component_modal_waiting_title_CL:
      "Khoản vay của Quý khách đã được HD SAISON phê duyệt. Vui lòng ký hợp đồng điện tử để hoàn tất hồ sơ và nhận tiền giải ngân.",

    //Modal Remind Payment
    component_modal_remind_pay_title: "Quý khách có khoản vay sắp đến hạn thanh toán. Vui lòng thanh toán trước ngày đến hạn.",
    component_modal_remind_pay_due_date: "Ngày đến hạn thanh toán",
    component_modal_remind_pay_due_amount: "Số tiền cần thanh toán",

    //Promotion List
    component_promotion_rate: "Lãi suất ưu đãi",
    promotion_tab_all_no_data: "Hiện tại Quý khách chưa có ưu đãi nào.",

    //Remind waiting contract
    component_remind_view_status: "Quý khách đang có {0} khoản vay đã được duyệt. Kích hoạt ngay để hoàn tất hồ sơ.",
    component_remind_view_status_Adjustment: "Quý khách đang có {0} hợp đồng điện tử đã ký chưa chính xác. Ký thỏa thuận để điều chỉnh thông tin.",

    //main account tab
    main_account_tab_nav: "Cài đặt tài khoản",
    main_account_tab_change_pass: "Đổi mật khẩu",
    main_account_tab_fingerprint: "Kích hoạt chức năng nhận diện \nvân tay",
    main_account_tab_face_id: "Kích hoạt chức năng nhận diện \nkhuôn mặt",
    main_account_tab_card_management: "Quản lý thẻ",
    main_account_tab_payment_history: "Lịch sử thanh toán",
    main_account_tab_policy: "Điều khoản và Điều kiện sử dụng\nDịch vụ Điện tử",
    main_account_tab_policy_short: "Điều khoản và Điều kiện sử...",
    main_account_tab_condition: "Bản điều khoản và điều kiện chung",
    main_account_tab_condition_short: "Bản điều khoản và điều...",
    main_account_tab_fab: "Câu hỏi thường gặp",
    main_account_tab_logout: "Đăng xuất",

    //Message for successful change information user
    account_profile_change_infor_success_message:
      "Chúc mừng\nQuý khách đã cập nhật\nthông tin cá nhân thành công",
    account_profile_confirm_success_message: "Xác nhận",

    //Message for successful change password
    account_profile_change_password_success_line1_message:
      "Chúc mừng\nQuý khách đã đổi mật khẩu thành công",
    account_profile_change_password_success_line2_message: "Tên đăng nhập của Quý khách là",


    //Message for change information account
    account_profile_change_error_fullName_message: "Họ và tên không hợp lệ",
    account_profile_change_error_fullName_null_message: "Họ và tên không được để trống",
    account_profile_change_error_email_null_message: "Email không được để trống",
    account_profile_change_error_format_email_message: "Email không hợp lệ.",
    account_profile_change_error_nouppercase_email_message: "Email không được có kí tự hoa",
    account_profile_change_error_email_message: "Email không được có khoảng trắng",
    account_profile_change_error_length_email_message: "Email phải có ít nhất 4 kí tự",

    account_profile_change_error_phoneNumber_null_message: "Số điện thoại không được để trống",
    account_profile_change_error_phoneNumber_fomat_message: "Số điện thoại không đúng định dạng",
    account_profile_change_error_phoneNumber_not_correct_message: "Số điện thoại không tồn tại",
    account_profile_change_error_phoneNumber_length_message: "Số điện thoại phải có 10 chữ số",
    account_profile_change_error_CMND_null_message: "Số CMND không được để trống",
    account_profile_change_error_CMND_fomat_message: "Số CMND không đúng định dạng",
    account_profile_change_error_CMND_lengh_message: "Số CMND phải có 9 chữ số hoặc 12 chữ số",
    account_profile_change_error_address_null_message: "Địa chỉ không được để trống",


    account_profile__message_error_empty_input_current_pass: "Mật khẩu hiện tại không được để trống.",
    account_profile__message_error_empty_input_new_pass: "Mật khẩu mới không được để trống.",
    account_profile__message_error_empty_input_re_pass: "Xác nhận lại mật khẩu mới không được để trống.",



    //Message error for change password account
    account_profile__message_error_input_current_pass:
      "Mật khẩu hiện tại phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile__message_error_input_new_pass:
      "Mật khẩu mới phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile__message_error_input_re_pass:
      "Mật khẩu nhập lại phải có ít nhất 6 kí tự bao gồm chữ và số, có chứa chữ hoa và chữ thường hoặc các ký tự đặc biệt.",
    account_profile_change_password_message: "Nhập mật khẩu không hợp lệ.",

    account_profile_same_password_message: "Mật khẩu mới và xác nhận lại mật khẩu mới không trùng.",
    account_profile_newpassword_must_different_current_message:
      "Mật khẩu mới phải khác mật khẩu hiện tại.",

    //home tab
    promotion_tab_promotion_detail_nav: "Ưu đãi",
    home_tab_group_header_promotion: "Ưu đãi dành cho Quý khách",
    home_tab_group_header_promotion_new: "Ưu đãi mới",
    promotion_tab_promotion_register_nav: "Đăng ký nhận ưu đãi",
    promotion_tab_promotion_detail_event_nav: "Khuyến mãi",
    home_tab_group_header_event: "Khuyến mãi",
    home_tab_group_header_news: "Tin tức",
    home_tab_group_header_guild: "Hướng dẫn thanh toán",
    home_tab_contract_waiting_nav: "Hợp đồng đang đợi ký",
    home_tab_contract_adjustment_nav: "Phụ lục đang đợi ký",
    promotion_tab_promotion_detail_reg_now: "Đăng ký ngay",
    promotion_tab_without_login: "Quý khách chưa đăng nhập",
    promotion_tab_without_login_announcement: "Quý khách vui lòng đăng nhập hoặc đăng ký để nhận ưu đãi dành riêng cho quý khách",

    home_tab_guild_store_nav: "Cửa hàng gần bạn",
    home_tab_guild_store_province: "Chọn Tỉnh / Thành phố",
    home_tab_guild_store_province_search: "Tìm Tỉnh / Thành phố",
    home_tab_guild_store_district: "Chọn quận, huyện",
    home_tab_guild_store_district_search: "Tìm quận, huyện",

    home_tab_news_list_nav: "Tin tức",
    home_tab_guild_payment_nav: "Hướng dẫn thanh toán",

    //loan tab
    loan_tab_register_request_guess_check: "Quý khách vui lòng kiểm tra lại thông tin\ntrước khi đăng ký.",
    loan_tab_register_for_consult: "Thông tin tạm tính chỉ mang tính chất tham khảo",
    loan_tab_register_loan_nav: "Đăng ký vay",
    loan_tab_register_loan_userinfo: "Thông tin khách hàng",
    loan_tab_register_loan_loaninfo: "Thông tin khoản vay",
    loan_tab_register_loan_purpose: "Mục đích vay:",
    loan_tab_register_loan_product: "Sản phẩm vay (không bắt buộc)",
    loan_tab_register_loan_percent_pay_first: "Phần trăm trả trước",
    loan_tab_register_loan_select_production: "Sản phẩm",
    loan_tab_register_loan_amount: "Số tiền vay:",
    loan_tab_register_price_product_amount: "Giá sản phẩm:",
    loan_tab_register_loan_term: "Thời hạn vay:",
    loan_tab_register_loan_fullname: "Họ và tên",
    loan_tab_register_loan_phone: "Số điện thoại",
    loan_tab_register_loan_idcard: "CMND/CCCD",
    loan_tab_register_loan_address: "Địa chỉ",
    loan_tab_register_loan_month: "tháng",
    loan_tab_register_loan_please_select_product: "Vui lòng chọn sản phẩm",
    loan_tab_register_loan_confirm: "Xác nhận",
    loan_tab_register_loan_returnMain: "Màn hình chính",
    loan_tab_register_loan_return_promotion_tab: "Xem ưu đãi khác",
    loan_tab_register_loan_complete_status:
      "Đơn đăng ký vay của quý khách đã được gởi đi thành công. Chúng tôi sẽ liên hệ Quý khách trong thời gián sớm nhất để hoàn tất hồ sơ.",
    loan_tab_register_loan: "Đăng ký",
    loan_tab_register_loan_finish: "Thông tin đăng ký vay của Quý khách đã được gửi đến HD SAISON. Chúng tôi sẽ liên hệ Quý khách trong thời gian sớm nhất để hoàn tất hồ sơ.",
    loan_tab_register_loan_from_promotion_finish: "Thông tin đăng ký của Quý khách đã được gởi đến HD SAISON. Chúng tôi sẽ liên hệ đến Quý khách trong thời gian sớm nhất.",
    loan_tab_register_loan_fill_info_error_name_blank: "Quý khách vui lòng nhập Họ và tên.",
    loan_tab_register_loan_fill_info_error_phone_blank: "Quý khách vui lòng nhập Số điện thoại.",
    loan_tab_register_loan_fill_info_error_address_blank: "Quý khách vui lòng \nchọn Địa điểm làm hợp đồng.",

    loan_tab_manager_loan_nav: "Quản lý khoản vay",
    loan_tab_manager_loan_waiting: "Hợp đồng đợi ký",
    loan_tab_manager_loan_due: "Hợp đồng đến hạn thanh toán",
    loan_tab_manager_loan_current: "Hợp đồng hiện tại",
    loan_tab_manager_loan_empty_status:
      "Hiện tại Quý khách chưa có khoản vay tại \nHD SAISON",

    loan_tab_detail_loan_contract_id: "Số hợp đồng: ",
    loan_tab_detail_loan_pay_amount_month: "Số tiền thanh toán hàng tháng",
    loan_tab_detail_loan_pay_date: "Ngày thanh toán hàng tháng",
    loan_tab_detail_loan_insurance: "Bảo hiểm khoản vay",
    loan_tab_detail_loan_contract: "Hợp đồng khoản vay",
    loan_tab_detail_loan_remind: "Nhắc thanh toán",
    loan_tab_detail_loan_term: "Kỳ thanh toán",
    loan_tab_detail_loan_history: "Lịch sử thanh toán",
    loan_tab_detail_loan_guild: "Hướng dẫn thanh toán",
    loan_tab_detail_loan_finish: "Ngày kết thúc",
    loan_tab_detail_loan_remind_pay_on_message: "Quý khách muốn bật chức năng \nnhắc thanh toán cho hợp đồng này.",
    loan_tab_detail_loan_remind_pay_off_message: "Quý khách muốn tắt chức năng \nnhắc thanh toán cho hợp đồng này.",

    loan_tab_pay_history_nav: "Lịch sử thanh toán",

    loan_tab_detail_contract_nav: "Hợp đồng khoản vay",
    loan_tab_detail_contract_tab_1: "Hợp đồng tín dụng",
    loan_tab_detail_contract_tab_2: "Thoả thuận điều chỉnh thông tin",

    loan_tab_add_info_nav: "Thêm hợp đồng",
    loan_tab_add_info_status:
      "Quý khách vui lòng nhập chính xác \n số hợp đồng và số CMND/CCCD mới nhất.",
    loan_tab_add_info_contract_no: "Số hợp đồng",
    loan_tab_add_info_id_no: "Số CMND/CCCD",
    loan_tab_add_info_button_next: "Tiếp tục",

    loan_tab_add_confirm_nav: "Thêm hợp đồng",
    loan_tab_add_confirm_status:
      "Quý khách vui lòng kiểm tra thông tin khoản vay trước khi thêm vào chức năng \n Quản lý khoản vay.",
    loan_tab_add_confirm_state: "Trạng thái",
    loan_tab_add_confirm_contract_no: "Số hợp đồng",
    loan_tab_add_confirm_loan_product: "Sản phẩm vay",
    loan_tab_add_confirm_series_no: "Số series",
    loan_tab_add_confirm_loan_amount: "Số tiền vay",
    loan_tab_add_confirm_interest_rate: "Lãi suất hàng tháng",
    loan_tab_add_confirm_number_terms: "Thời hạn vay",
    loan_tab_add_confirm_pay_month_amount: "Số tiền thanh toán hàng tháng",
    loan_tab_add_confirm_first_date_pay: "Ngày thanh toán đầu tiên",
    loan_tab_add_confirm_last_date_pay: "Ngày thanh toán cuối cùng",
    loan_tab_add_confirm_pay_month_date: "Ngày thanh toán hàng tháng",
    loan_tab_add_confirm_loan_insurance: "Bảo hiểm khoản vay",
    loan_tab_add_confirm_send_fee: "Phí chuyển tiền",
    loan_tab_add_confirm_bank_account_user: "Chủ tài khoản",
    loan_tab_add_confirm_bank_account_no: "Số tài khoản",
    loan_tab_add_confirm_bank_name: "Tên ngân hàng",
    loan_tab_add_confirm_button_complete: "Hoàn tất",

    loan_tab_current_contract_nav: "Hợp đồng hiện tại",
    loan_tab_component_tooltip_text:
      "Đây là khoản vay vừa được thêm vào quản lý. Nếu không đúng khoản vay của bạn, vuốt sáng trái để xoá khỏi danh mục quản lý khoản vay.",

    loan_tab_esign_tab_nav: "Ký hợp đồng trực tuyến",
    loan_tab_esign_tab_nav_step_01: "Bước 1: Tóm tắt khoản vay",
    loan_tab_esign_tab_nav_step_02: "Bước 2: Xem thông tin hợp đồng",
    loan_tab_esign_tab_nav_step_03: "Bước 3: Xác nhận ký hợp đồng",
    loan_tab_esign_tab_nav_step_04: "Bước 4: Hoàn tất ký hợp đồng",
    loan_tab_esign_overview: "Tóm tắt",
    loan_tab_esign_overview_loan_info: "Thông tin khoản vay",
    loan_tab_esign_overview_account_info: "Thông tin tài khoản",
    loan_tab_esign_overview_select_first_due: "Quý khách vui lòng chọn ngày thanh toán hàng tháng",
    loan_tab_esign_overview_first_due_date: "Ngày thanh toán đầu tiên: ",
    loan_tab_esign_overview_frame_no: "Số khung",
    loan_tab_esign_overview_frame_no_placeholder: "Nhập số khung",
    loan_tab_esign_overview_elect_no: "Số máy",
    loan_tab_esign_overview_elect_no_placeholder: "Nhập số máy",
    loan_tab_esign_overview_error_monthly_due: "Quý khách vui lòng chọn \nngày thanh toán hàng tháng.",
    loan_tab_esign_overview_error_bank_info: "Quý khách vui lòng nhập đầy đủ \nthông tin tài khoản ngân hàng.",
    loan_tab_esign_overview_error_chassis_engineer: "Quý khách vui lòng nhập đầy đủ \nsố khung và số máy.",
    loan_tab_esign_overview_product_price: "Giá sản phẩm",
    loan_tab_esign_overview_product: "Sản phẩm",
    loan_tab_esign_overview_warning_empty_field: "Quý khách vui lòng nhập đầy đủ \nnhững thông tin cần thiết.",

    loan_tab_esign_contract: "Xem hợp đồng",
    loan_tab_esign_sign: "Xác nhận",
    loan_tab_esign_complete: "Hoàn tất",
    loan_tab_esign_button_sign: "Ký hợp đồng",
    loan_tab_esign_button_accept: "Xác nhận",
    loan_tab_esign_button_continue: "Tiếp tục",
    loan_tab_esign_button_loan_manager: "Quản lý khoản vay",
    loan_tab_esign_contract_document_agree:
      "Tôi đã đọc, hiểu và đồng ý với toàn bộ nội dung trên.",
    loan_tab_esign_policy_title:
      "Điều Khoản Và Điều Kiện Sử DỤng Hợp Đồng Trực Tuyến.",

    loan_tab_esign_complete_status_part_ED_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_ED_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_ED_3: "Quý khách vui lòng liên hệ nhân viên của",
    loan_tab_esign_complete_status_part_ED_4: "HD SAISON tại cửa hàng để hoàn tất hồ sơ và nhận sản phẩm.",

    loan_tab_esign_complete_status_part_CL_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_CL_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_CL_3: "HD SAISON sẽ giải ngân số tiền vay ",
    loan_tab_esign_complete_status_part_CL_4: "vào tài khoản ",
    loan_tab_esign_complete_status_part_CL_5: " của Quý khách ",
    loan_tab_esign_complete_status_part_CL_6: "tại ngân hàng ",
    loan_tab_esign_complete_status_part_CL_7: "trong tối đa ",
    loan_tab_esign_complete_status_part_CL_8: "2 ngày ",
    loan_tab_esign_complete_status_part_CL_9: "làm việc.",

    loan_tab_esign_complete_status_part_MC_1: "Hợp đồng ",
    loan_tab_esign_complete_status_part_MC_2: "đã được ký thành công. ",
    loan_tab_esign_complete_status_part_MC_3: "Quý khách vui lòng liên hệ nhân viên của",
    loan_tab_esign_complete_status_part_MC_4: "HD SAISON tại cửa hàng để hoàn tất hồ sơ và nhận sản phẩm.",

    loan_tab_esign_enter_otp_guild: "Mã xác thực để ký hợp đồng đã được gửi đến số điện thoại",
    loan_tab_esign_sub_enter_otp_guild: "Mã xác thực để ký Thỏa thuận điều chỉnh thông tin đã được gửi đến số điện thoại",

    loan_tab_esign_sign_status: "Quý khách vui lòng đăng nhập lại để tiếp tục \nký Hợp đồng điện tử.",
    loan_aler_contract_cannot_delete: "Hợp đồng ký điện tử không được quyền xoá.",
    loan_aler_contract_customer_cannot_delete: "Khách hàng không thể xóa số hợp đồng dùng đăng ký tài khoản",

    //Esign PLHD
    loan_tab_esign_sub_tab_nav: "Thoả thuận điều chỉnh thông tin",
    loan_tab_esign_sub_tab_nav_step_01: "Bước 1: Tóm tắt thông tin điều chỉnh",
    loan_tab_esign_sub_tab_nav_step_02: "Bước 2: Xem thoả thuận",
    loan_tab_esign_sub_tab_nav_step_03: "Bước 3: Xác nhận ký thoả thuận",
    loan_tab_esign_sub_tab_nav_step_04: "Bước 4: Hoàn tất ký thoả thuận",
    loan_tab_esign_sub_overview: "Tóm tắt",
    loan_tab_esign_sub_contract: "Xem thoả thuận",
    loan_tab_esign_sub_sign: "Xác nhận",
    loan_tab_esign_sub_complete: "Hoàn tất",
    loan_tab_esign_sub_overview_name_info: "Họ và tên",
    loan_tab_esign_sub_overview_id_info: "Số CMND/CCCD",
    loan_tab_esign_sub_overview_old_info: "Thông tin cũ",
    loan_tab_esign_sub_overview_new_info: "Thông tin mới",
    loan_tab_esign_sub_complete_status: "Quý khách đã hoàn tất điều chỉnh \nthông tin.",
    loan_tab_esign_sub_sign_status: "Quý khách vui lòng đăng nhập lại để tiếp tục \nký Thỏa thuận điều chỉnh thông tin.",

    loan_tab_login_phone_can_not_use_title: "Chưa thể sử dụng chức năng này",
    loan_tab_login_phone_can_not_use_message:
      "Quý khách vui lòng thực hiện đăng ký bằng \nthông tin hợp đồng đã có với HD SAISON để \ncó thể sử dụng chức năng này.",
    loan_tab_login_phone_button_sign_up: "Đăng ký",

    loan_mangement_contract_mail_confirm_text:
      "Quý khách vui lòng nhập email để nhận chứng từ điện tử đã ký",
    loan_mangement_contract_mail_successful_text:
      "Chứng từ điện tử đã được gửi đến email của Quý khách.",

    //Modal required change password
    modal_required_change_password_title: "Thay đổi mật khẩu để bảo vệ tài khoản của Quý khách.",
    modal_required_change_password_message_expired: "Mật khẩu đăng nhập tài khoản của Quý khách đã hết hiệu lực. Quý khách vui lòng thay đổi mật khẩu.",
    modal_required_change_password_message_remind: "Mật khẩu đăng nhập tài khoản của Quý khách sắp hết hiệu lực. Quý khách vui lòng thay đổi mật khẩu.",

    modal_register_option_title: "Quý khách đã có hợp đồng vay với \nHD SAISON?",
    modal_register_option_message:
      "Đăng ký với thông tin hợp đồng đã có sẽ giúp \nQuý khách trải nghiệm đầy đủ các chức năng \ncủa ứng dụng.",
    modal_register_option_button_have_contract: "Đã có hợp đồng",
    modal_register_option_button_no_contract: "Chưa có hợp đồng",

    //Modal Warning Phone
    modal_warning_phone_title: "Mã xác thực sẽ được gửi đến số điện thoại",
    modal_warning_phone_message: "Quý khách có muốn nhận mã xác thực \nqua số điện thoại nêu trên không?",
    modal_warning_phone_button_receive: "Nhận mã xác thực",
    modal_warning_phone_button_after: "Để sau",

    home_tab_notification_list_nav: "Thông báo",

    modal_warning_forgot_password_expired_title: "Quý khách có muốn đặt lại mật khẩu?",
    modal_warning_forgot_password_expired_message: "Vì lý do bảo mật, ứng dụng sẽ thực hiện đăng xuất tài khoản của Quý khách, sau đó chuyển đến màn hình đặt lại mật khẩu để tạo mật khẩu mới.",
    modal_warning_forgot_password_expired_agree: "Đồng ý",
    modal_warning_forgot_password_expired_decide: "Không đồng ý",
  }
};

const strings = new LocalizedStrings(data);

const get = (key, ...params) => {
  if (params.length !== 0) return strings.formatString(strings[key], ...params);
  else return strings[key];
};
const getLanguage = () => {
  return strings.getLanguage();
};
const setLanguage = key => {
  return strings.setLanguage(key);
};

export default {
  get,
  getLanguage,
  setLanguage
};
