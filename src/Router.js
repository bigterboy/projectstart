import {
  Platform
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import {
  // createBottomTabNavigator,
  BottomTabBar
} from "react-navigation-tabs";
const TabBarComponent = props => <BottomTabBar {...props} />;
import React from "react";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
import { Image } from "react-native";
import Context from "context";
import { store } from "store";
import Action from "action";

//splash flow
import SplashScreen from "screen/splash";
//auth flow
import WelcomeScreen from "screen/auth/welcome";
//login
import LoginScreen from "screen/auth/login";
// import withWarnPhoneModal from "screen/auth/modal_warn_phone";
import withWarnPhoneModal from "screen/modal_warn_phone";
//register
import withGuideModal from "screen/modal_guide";
import RegisterEnterContract from "screen/auth/register/enter_contract";
import RegisterEnterOtp from "screen/auth/register/enter_otp";
import RegisterEnterPassword from "screen/auth/register/enter_password";
import RegisterSuccess from "screen/auth/register/success";
//register with Phone
import RegisterPhoneEnterPhone from "screen/auth/registerWithPhone/enter_phone";
import RegisterPhoneEnterOtp from "screen/auth/registerWithPhone/enter_otp";

//forgot password
import ForgotEnterContract from "screen/auth/forgot/enter_contract";
import ForgotEnterId from "screen/auth/forgot/enter_id";
import ForgotEnterOtp from "screen/auth/forgot/enter_otp";
import ForgotEnterPassword from "screen/auth/forgot/enter_password";
import ForgotComplete from "screen/auth/forgot/complete";
//modal
import { withExitModal } from "component";
//main flow
import MainHomeTab from "screen/main/home_tab/tab";
import MainLoanTab from "screen/main/loan_tab/tab";
import MainCardTab from "screen/main/card_tab/tab";
import MainPromotionTab from "screen/main/promotion_tab/tab";
import MainAccountTab from "screen/main/account_tab/tab";
//home tab
import NewsList from "screen/main/home_tab/news/list";
import NewsDetail from "screen/main/home_tab/news/detail";
import NotificationList from "screen/main/home_tab/notification/list";
import NotificationDetail from "screen/main/home_tab/notification/detail";
import ContractWaiting from "screen/main/home_tab/contract_waiting";
import GuildPayment from "screen/main/home_tab/guild/payment";
import GuildNearStore from "screen/main/home_tab/guild/store";

//loan tab
import LoanDetailContract from "screen/main/loan_tab/detail_contract";
import LoanDetailLoan from "screen/main/loan_tab/detail_loan";
import LoanAddConfirm from "screen/main/loan_tab/add/confirm";
import LoanAddInfo from "screen/main/loan_tab/add/info";
import LoanRegister from "screen/main/loan_tab/register_loan/register";
import LoanRegisterOther from "screen/main/loan_tab/register_loan/register_other";
import LoanRegisterConfirm from "screen/main/loan_tab/register_loan/confirm";
import LoanFillInforBeforConf from "screen/main/loan_tab/register_loan/fill_infor_register";
import LoanPayHistory from "screen/main/loan_tab/pay_history";
import LoanCurrentContract from "screen/main/loan_tab/current_contract";
import LoanFinishComplete from "screen/main/loan_tab/register_loan/finish";

//esign
import LoanESign from "screen/main/loan_tab/esign/tab";
import LoanESignContract from "screen/main/loan_tab/esign/contract";
import LoanESignSign from "screen/main/loan_tab/esign/sign";
import LoanESignEnterOtp from "screen/main/loan_tab/esign/enter_otp";
import LoanEsignComplete from "screen/main/loan_tab/esign/complete";
//esign sub
import LoanESignSub from "screen/main/loan_tab/esign_sub/tab";
import LoanESignSubOtp from "screen/main/loan_tab/esign_sub/enter_otp";

//card tab
//promotion tab
import PromotionDetail from "screen/main/promotion_tab/detail";
//account tab
import AccountCardManagement from "screen/main/account_tab/card_management";
import AccountChangePassword from "screen/main/account_tab/change_password";
import AccountCondition from "screen/main/account_tab/condition";
import AccountFAB from "screen/main/account_tab/fab";
import AccountPaymentHistory from "screen/main/account_tab/payment_history/tab";
import withPaymentHistoryFilterModal from "screen/main/account_tab/payment_history/modal_filter";
import withChangePasswordSuccessModal from "screen/main/account_tab/modal_success_change_password";
import withUpdateProfileSuccessModal from "screen/main/account_tab/modal_success_update_profile";
import AccountPolicy from "screen/main/account_tab/policy";
import AccountProfile from "screen/main/account_tab/profile";

//main bottom tab
const BottomMainNavigator = createBottomTabNavigator(
  {
    MainHomeTab: {
      screen: MainHomeTab,
      navigationOptions: {
        title: Context.getString("common_tab_home")
      }
    },
    MainLoanTab: {
      screen: MainLoanTab,
      navigationOptions: {
        title: Context.getString("common_tab_loan")
      }
    },
    MainCardTab: {
      screen: MainCardTab,
      navigationOptions: {
        title: Context.getString("common_tab_card")
      }
    },
    MainPromotionTab: {
      screen: MainPromotionTab,
      navigationOptions: {
        title: Context.getString("common_tab_promotion")
      }
    },
    MainAccountTab: {
      screen: MainAccountTab,
      navigationOptions: {
        title: Context.getString("common_tab_account")
      }
    }
  },
  {
    // tabBarComponent: props => (
    //   <TabBarComponent
    //     {...props}
    //     style={{ borderTopColor: Context.getColor("background") }}
    //   />
    // ),
    initialRouteName: "MainHomeTab",
    // backBehavior: "history",
    keyboardHidesTabBar: true,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        //Disable card tab and
        const { routeName } = navigation.state;
        if (routeName != "MainCardTab") {
          console.log("TabPress: " + JSON.stringify(store.getState()))
          defaultHandler()
          // const isLogin = store.getState().app.isLogin
          // const isLoginPhone = store.getState().login_by_phone.isLoginPhone
          // if (isLogin) {
          //   defaultHandler()
          // } else {
          //   if (isLoginPhone) {
          //     defaultHandler()
          //   } else {
          //     if ((routeName == "MainAccountTab")) {
          //       store.dispatch({ type: Action.REGISTER_BY_PHONE_SHOW_REGISTER_OPTION, payload: true })
          //     } else {
          //       defaultHandler()
          //     }
          //   }
          // }
        }
      },
      tabBarOnLongPress: ({ navigation, defaultHandler }) => {
        //Disable card tab and
        const { routeName } = navigation.state;
        if (routeName != "MainCardTab") {
          console.log("TabPress: " + JSON.stringify(store.getState()))
          defaultHandler()
          // const isLogin = store.getState().app.isLogin
          // const isLoginPhone = store.getState().login_by_phone.isLoginPhone
          // if (isLogin) {
          //   defaultHandler()
          // } else {
          //   if (isLoginPhone) {
          //     defaultHandler()
          //   } else {
          //     if ((routeName == "MainAccountTab")) {
          //       store.dispatch({ type: Action.REGISTER_BY_PHONE_SHOW_REGISTER_OPTION, payload: true })
          //     } else {
          //       defaultHandler()
          //     }
          //   }
          // }
        }
      },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let icon;
        if (routeName === "MainHomeTab") {
          icon = focused
            ? Context.getImage("tabHomeSelect")
            : Context.getImage("tabHome");
        } else if (routeName === "MainLoanTab") {
          icon = focused
            ? Context.getImage("tabLoanSelect")
            : Context.getImage("tabLoan");
        } else if (routeName === "MainCardTab") {
          icon = focused
            ? Context.getImage("tabCardSelect")
            : Context.getImage("tabCard");
        } else if (routeName === "MainPromotionTab") {
          icon = focused
            ? Context.getImage("tabPromotionSelect")
            : Context.getImage("tabPromotion");
        } else if (routeName === "MainAccountTab") {
          icon = focused
            ? Context.getImage("tabAccountSelect")
            : Context.getImage("tabAccount");
        }
        return (
          <Image
            source={icon}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              marginTop: 8
            }}
          />
        );
      }
    }),
    tabBarOptions: {
      allowFontScaling: false,
      activeTintColor: Context.getColor("accent2"),
      inactiveTintColor: Context.getColor("hint"),
      activeBackgroundColor: Context.getColor("background"),
      inactiveBackgroundColor: Context.getColor("background"),
      labelStyle: {
        fontSize: Context.getDimen("text_size_tiny"),
        marginTop: 2,
        fontFamily: Platform.OS === "ios" ? null : "Roboto-Regular"
      },
      tabStyle: {},
      indicatorStyle: {},
      style: {
        marginHorizontal: 2
      }
    }
  }
);

const EsignStack = createStackNavigator(
  {
    LoanESign: LoanESign,
    LoanESignContract: LoanESignContract,
    LoanESignSign: LoanESignSign,
    LoanESignEnterOtp: withWarnPhoneModal(
      LoanESignEnterOtp,
      "LoanESignEnterOtp"
    ),
    LoanEsignComplete: LoanEsignComplete,
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    },
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    initialRouteName: "LoanESign"
  },
);

const MainStack = createStackNavigator(
  {
    MainBottomTab: BottomMainNavigator,
    //home tab
    NotificationList: NotificationList,
    NotificationDetail: NotificationDetail,
    NewsList: NewsList,
    NewsDetail: NewsDetail,
    ContractWaiting: ContractWaiting,
    GuildPayment: GuildPayment,
    GuildNearStore: GuildNearStore,
    //promotion tab
    PromotionDetail: PromotionDetail,
    //account tab
    AccountCardManagement: AccountCardManagement,
    AccountChangePassword: withChangePasswordSuccessModal(
      AccountChangePassword
    ),
    AccountCondition: AccountCondition,
    AccountFAB: AccountFAB,
    AccountPaymentHistory: withPaymentHistoryFilterModal(AccountPaymentHistory),
    AccountPolicy: AccountPolicy,
    AccountProfile: withUpdateProfileSuccessModal(AccountProfile),
    //loan tab
    LoanDetailContract: LoanDetailContract,
    LoanDetailLoan: LoanDetailLoan,
    LoanAddConfirm: LoanAddConfirm,
    LoanAddInfo: withGuideModal(LoanAddInfo),
    LoanRegister: LoanRegister,
    LoanRegisterOther: LoanRegisterOther,
    LoanRegisterConfirm: LoanRegisterConfirm,
    LoanFinishComplete: LoanFinishComplete,
    LoanFillInforBeforConf: LoanFillInforBeforConf,
    LoanPayHistory: LoanPayHistory,
    LoanCurrentContract: LoanCurrentContract,

    LoanESign: EsignStack,
    LoanESignEnterOtp: withWarnPhoneModal(
      LoanESignEnterOtp,
      "LoanESignEnterOtp"
    ),

    LoanESignSub: LoanESignSub,
    LoanESignContract: LoanESignContract,
    LoanESignSign: LoanESignSign,
    LoanEsignComplete: LoanEsignComplete,

    LoanESignSubOtp: withWarnPhoneModal(LoanESignSubOtp, "LoanESignSubOtp"),

    ForgotEnterId: withGuideModal(ForgotEnterId),
    ForgotEnterContract: withGuideModal(ForgotEnterContract),
    ForgotEnterOtp: withWarnPhoneModal(ForgotEnterOtp, "ForgotEnterOtp"),
    ForgotEnterPassword: ForgotEnterPassword,
    ForgotComplete: ForgotComplete
    // RegisterPhoneEnterPhone: RegisterPhoneEnterPhone
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
    // initialRouteName:"RegisterPhoneEnterPhone"
    // initialRouteName:"LoanAddInfo"
    // initialRouteName:"ForgotComplete"//LoanDetailContract
  }
);

const AuthStack = createStackNavigator(
  {
    //welcome
    // Welcome: WelcomeScreen,
    //register
    RegisterEnterContract: withGuideModal(RegisterEnterContract),
    RegisterEnterOtp: withWarnPhoneModal(RegisterEnterOtp, "RegisterEnterOtp"),
    RegisterEnterPassword: RegisterEnterPassword,
    RegisterSuccess: RegisterSuccess,
    //login
    Login: LoginScreen,
    //forgot
    ForgotEnterId: withGuideModal(ForgotEnterId),
    ForgotEnterContract: withGuideModal(ForgotEnterContract),
    ForgotEnterOtp: withWarnPhoneModal(ForgotEnterOtp, "ForgotEnterOtp"),
    ForgotEnterPassword: ForgotEnterPassword,

    //register with phone
    RegisterPhoneEnterPhone: RegisterPhoneEnterPhone,
    RegisterPhoneEnterOtp: RegisterPhoneEnterOtp
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
    // initialRouteName: "RegisterPhoneEnterPhone"
  }
);

const SwitchStack = createAnimatedSwitchNavigator(
  {
    // Splash: SplashScreen,
    MainFlow: MainStack,
    AuthFlow: AuthStack,
    EsignStack: EsignStack
  }
  // {
  //   transition: (
  //     <Transition.Together>
  //       <Transition.In type="fade" durationMs={100} />
  //     </Transition.Together>
  //   )
  // }
);

export default createAppContainer(SwitchStack);
