import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { BaseScreen, Header, HDText } from "component";
import Context from "context";
import fabQuestions from '../../../../resource/files/fab_questions.json'

class HomeItem extends Component {
  state = {
    isSelected: false
  };
  renderDetail = description => {
    return (
      <View>
        <View style={styles.border} />
        <HDText style={styles.description}>{description}</HDText>
      </View>
    );
  };
  change = () => {
    this.setState({
      isSelected: !this.state.isSelected
    });
  };
  render() {
    const { isSelected } = this.state;
    return (
      <View style={styles.boxContainer}>
        <TouchableOpacity onPress={() => this.change()}>
          <View style={styles.titleContainer}>
            <HDText style={styles.title}>{this.props.item.title}</HDText>
            <Image
              style={isSelected ? styles.image_collapse : styles.image_expand}
              source={Context.getImage("icon_Arrow_Down_Collapse")}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        {isSelected ? this.renderDetail(this.props.item.description) : null}
      </View>
    );
  }
}

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      data: fabQuestions
    }
  }

  componentDidMount() {}
  
  renderItem = item => <HomeItem item={item.item} />;

  renderContent = () => {
    const {data} = this.state
    return (
      <View style={styles.containerHome}>
        <FlatList
          data={data}
          contentContainerStyle={styles.list_content}
          renderItem={item => this.renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F3F5F6" }}>
        <Header 
        title= {Context.getString("main_account_tab_fab")}
        navigation={this.props.navigation} />
        {this.renderContent()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: "#F3F5F6"
  },
  list_content: {
    paddingTop: 24,
    // paddingBottom: 16
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    flex: 1,
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(22),
    fontWeight: "500",
    color: Context.getColor("textBlue1"),
    marginVertical: 24,
    // marginRight: 5
    paddingRight: 16
  },
  description: {
    flex: 1,
    fontSize: Context.getSize(14),
    lineHeight: Context.getSize(20),
    fontWeight: '400',
    marginBottom: 16.5,
    color: Context.getColor("notifySubTitle")
  },
  border: {
    marginBottom: 16.5,
    borderTopWidth: 1,
    borderColor: "#D8D8D8"
  },
  image_expand: {
    width: Context.getSize(15),
    height: Context.getSize(24),
    // transform: [{ rotate: "180deg" }]
  },
  image_collapse: {
    width: Context.getSize(15),
    height: Context.getSize(24),
    transform: [{ rotate: "180deg" }]
  },
  boxContainer: {
    flex: 1,
    flexDirection: "column",
    width: Context.getSize(343),
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    ...Platform.select({
      android: {
        elevation: 3
      },
      ios: {
        shadowColor: "#B1B9C3",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.7,
        shadowRadius: 2
      }
    })
  }
});
