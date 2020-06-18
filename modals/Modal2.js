/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-community/picker';

export default class Modal2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'java',
    }
  }
  render() {
    return (
      <View style={{ flex: 1, }}>
        <View style={{ flex: 2 }}>
        </View>
        <View style={{ flex: 1, borderWidth: 1 }}>
          <Button
            // onPress={() => this.props.navigation.pop("MainHomeTab",{ data: this.state.language })}
            onPress={() => {

              this.props.navigation.state.params.goBackData({
                data: this.state.language
              })
              this.props.navigation.pop()
              // this.props.navigation.navigate("MainHomeTab", { data: this.state.language })
            }
            }
            title="Dismiss"
          />
          <Picker
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }>
            <Picker.Item label="Java1" value="Java1" />
            <Picker.Item label="Java2" value="Java2" />
            <Picker.Item label="Java3" value="Java3" />
            <Picker.Item label="Java4" value="Java4" />
          </Picker>
        </View>
      </View>
    );
  }
}
