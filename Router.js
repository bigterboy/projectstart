import React, {Component} from 'react';
import {
  Text,
  View,
  Style,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';

import {
  //createStackNavigator,
  createAppContainer,
  //createBottomTabNavigator,
} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainHomeTab from './tab/MainHomeTab';
import MainLoanTab from './tab/MainLoanTab';
import MainCardTab from './tab/MainCardTab';

import Notification from './Components/Notification';

import Test from './Test';

const BottomMainNavigator = createBottomTabNavigator(
  {
    MainHomeTab: {
      screen: MainHomeTab,
      navigationOptions: {
        title: 'TAB 1',
      },
    },
    MainLoanTab: {
      screen: MainLoanTab,
      navigationOptions: {
        title: 'TAB 2',
      },
    },
    MainCardTab: {
      screen: MainCardTab,
      navigationOptions: {
        title: 'TAB 3',
      },
    },
  },
  {
    initialRouteName: 'MainHomeTab',
    //keyboardHidesTabBar: true,
    defaultNavigationOptions: ({navigation}) => ({
      tabBarOnPress: ({navigation, defaultHandler}) => {
        // console.log('onPress:', navigation.state.routeName);
        // if (navigation.state.routeName !== 'MainCardTab') {
        //   defaultHandler();
        // }
        defaultHandler();
      },
      // tabBarOnLongPress: ({navigation, defaultHandler}) => {  // use for disable tab when don't want to click
      //   if (navigation.state.routeName !== 'MainCardTab') {
      //     defaultHandler();
      //   }
      // },
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let icon;
        if (routeName === 'MainHomeTab') {
          icon = focused
            ? require('./image/ic_tab_home_select.png')
            : require('./image/ic_tab_home.png');
        } else if (routeName === 'MainLoanTab') {
          icon = focused
            ? require('./image/ic_tab_loan_select.png')
            : require('./image/ic_tab_loan.png');
        } else if (routeName === 'MainCardTab') {
          icon = focused
            ? require('./image/ic_tab_card_select.png')
            : require('./image/ic_tab_card.png');
        }
        return (
          <Image
            //source={icon}  // khi nao can hinh thi mo len
            resizeMode="contain"
            style={styles.styleIcon}
          />
        );
      },
    }),
  },
);

const MainStack = createStackNavigator(
  {
    MainBottomTab: BottomMainNavigator,
    Notification: Notification,
  },
  {
    // headerMode: 'none',
    // defaultNavigationOptions: {
    //   gesturesEnabled: false,
    // },
    //initialRouteName: "MainBottomTab"
  },
);

const SwitchStack = createStackNavigator(
  {
    MainFlow: MainStack,
    AuthFlow: Test,
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    initialRouteName: 'MainFlow',
  },
);

const styles = StyleSheet.create({
  styleIcon: {
    width: 24,
    height: 24,
    marginTop: 8,
  },
});

export default createAppContainer(SwitchStack);

//export default createAppContainer(BottomMainNavigator);
