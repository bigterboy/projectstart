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
  createStackNavigator,
  createAppContainer,
  //createBottomTabNavigator,
} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import MainHomeTab from './tab/MainHomeTab';
import MainLoanTab from './tab/MainLoanTab';
import MainCardTab from './tab/MainCardTab';

const BottomMainNavigator = createBottomTabNavigator(
  {
    MainHomeTab: {
      screen: MainHomeTab,
      navigationOptions: {
        title: 'ABC',
      },
    },
    MainLoanTab: {
      screen: MainLoanTab,
      navigationOptions: {
        title: 'CDF',
      },
    },
    MainCardTab: {
      screen: MainCardTab,
      navigationOptions: {
        title: 'GHK',
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
            source={icon}
            resizeMode="contain"
            style={{
              width: 24,
              height: 24,
              marginTop: 8,
            }}
          />
        );
      },
    }),
  },
);

export default createAppContainer(BottomMainNavigator);
