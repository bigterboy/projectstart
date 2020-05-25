import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import Context from "context";
import { HDSearchBar, HDText, StatusBarCustom } from "component";
import Modal from "react-native-modal";
import Util from "util";

const win = Context.getWindow();

export default class ModalComboboxGetAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      listItems: [],
      indexSelect: null,
      itemSelected: null
    };
  }

  componentDidMount = async () => {
    let { items } = this.props;
    items = await items.map(item => {
      item["isSelected"] = false;
      return item;
    });

    await this.setState({
      listItems: items
    });
  };

  componentWillReceiveProps = async nextProps => {
    let items = [];
    items = await nextProps.items;
    items = await items.map(item => {
      item["isSelected"] = false;
      return item;
    });

    if (nextProps.selectedValue) {
      if (this.props.type === Util.Constant.POPUP_TYPE.PRODUCTION_LOAN) {
        console.log(
          "GIA TRI WILL MOUNT: " + JSON.stringify(nextProps.selectedValue)
        );
      }

      let index = await items.findIndex(
        item => item.id === nextProps.selectedValue.id
      );
      if (index !== -1) {
        items[index]["isSelected"] = true;
      }
    }

    if (nextProps.isVisible) {
      this.setState({
        listItems: items
      });
    }
  };

  renderCloseX() {
    return (
      <View
        style={{
          width: "100%",
          alignItems: "flex-end"
        }}
      >
        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          style={{ paddingLeft: 10, paddingTop: 10, paddingBottom: 8 }}
        >
          <Image
            source={Context.getImage("closePopup")}
            style={styles.close_icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _onPressItem = async (item, index) => {
    this.props.onPressItem ? this.props.onPressItem(item, index) : null;

    this.setState({
      indexSelect: index,
      itemSelected: item
    });
  };

  _renderChecked(item) {
    if (item.isSelected) {
      return (
        <Image
          source={Context.getImage("popupSelected")}
          style={styles.icon_selected}
        />
      );
    }
    return null;
  }

  _renderItem = ({ item, index }) => {
    const { listItems } = this.state;
    return (
      <TouchableOpacity onPress={() => this._onPressItem(item, index)}>
        <View style={[styles.item_container, styles.item_last]}>
          {/* <HDText style={styles.item_text}>{item.name}</HDText> */}

          {this._renderContent(item)}

          {this._renderChecked(item)}

          <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <View style={styles.item_line}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _renderContent = item => {
    if (this.props.type === Util.Constant.POPUP_TYPE.PROVINCE) {
      //Render province Name
      return <HDText style={styles.item_text}>{item.provinceName}</HDText>;
    } else if (this.props.type === Util.Constant.POPUP_TYPE.DISTRICT) {
      // Render district Name
      return <HDText style={styles.item_text}>{item.districtCode}</HDText>;
    } else if (this.props.type === Util.Constant.POPUP_TYPE.PERCENT_PAY_FIRST) {
      // Render percent pay first
      return (
        <HDText style={styles.item_text}>
          {item.percent}
          {" %"}
        </HDText>
      );
    } else if (this.props.type === Util.Constant.POPUP_TYPE.PRODUCTION_LOAN) {
      // Render percent pay first
      return <HDText style={styles.item_text}>{item.productionName}</HDText>;
    }
    return null;
  };

  //Update type want to search
  _onSearchChange = text => {
    const { items } = this.props;
    const searchText = Util.App.changeAlias(text).toLowerCase();

    const filter = items.filter(item => {
      if (this.props.type === Util.Constant.POPUP_TYPE.PROVINCE) {
        //Render province Name
        return Util.App.changeAlias(item.provinceName)
          .toLowerCase()
          .includes(searchText);
      } else if (this.props.type === Util.Constant.POPUP_TYPE.DISTRICT) {
        // Render district Name
        return Util.App.changeAlias(item.districtCode)
          .toLowerCase()
          .includes(searchText);
      }
    });

    this.setState({
      listItems: filter
    });
  };

  render() {
    const count = this.state.listItems.length;
    // const formHeight = (count > 11) ? { height: Context.getSize(617) } : null

    return (
      <Modal
        hideModalContentWhileAnimating={true}
        useNativeDriver={true} 
        backdropOpacity={0.5}
        animationIn="zoomInDown"
        animationOut="fadeOut"
        animationOutTiming={200}
        // onBackButtonPress={this.props.onCancel}
        style={{
          justifyContent: "center",
          alignSelf: "center",
          width: "100%",
          height: "100%",
          flex:1
        }}
        {...this.props}
      >
        {/* android tai thỏ cần cái này */}
        <StatusBarCustom />

        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              height: "80%",
              //alignItems: "flex-end"
              
            }}
          >
            {this.renderCloseX()}

            <View style={styles.form_container}>
              <View style={styles.form_top}>
                <HDText style={styles.form_title}>{this.props.title}</HDText>

                {this.props.isShowSearchBar ? (
                  <View style={styles.search_container}>
                    <HDSearchBar
                      placeholder={this.props.searchPlaceholder}
                      onChangeText={this._onSearchChange}
                    />
                  </View>
                ) : null}
              </View>

              <View style={styles.form_bottom}>
                <FlatList
                  style={styles.list}
                  data={this.state.listItems}
                  renderItem={this._renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.list_content}
                  bounces={false}
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={this.props.pressCancelX ? this.props.pressCancelX : null}
          style={{
            height: Context.getSize(100),
            width: Context.getSize(70),
            position: "absolute",
            top: Context.getSize(30),
            right: -20
          }}
        />
      </Modal>
    );
  }
}

ModalComboboxGetAPI.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  onPressItem: PropTypes.func,
  pressCancelX: PropTypes.func
};

const styles = StyleSheet.create({
  close_icon: {
    width: Context.getSize(16),
    height: Context.getSize(16)
  },
  container: {
    width: win.width,
    height: win.height,
    //justifyContent: "center",
    marginTop: (160 / 812) * Context.getWindow().height,
    alignItems: "center",
    paddingHorizontal: Context.getSize(16) ,
  },
  form_container: {
    width: "100%",
    height: "90%",
    //backgroundColor: "transparent",
    //backgroundColor: "white",
    borderRadius: 5,
  },
  form_top: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  form_bottom: {
    //flex: 1,
    //backgroundColor: "transparent"
    backgroundColor: "white",
    marginBottom: Context.getSize(100),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    //borderWidth: 1,
    //borderColor: "red"
  },
  form_title: {
    fontSize: Context.getSize(16),
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  search_container: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16
  },
  list: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    //backgroundColor: "white"
  },
  list_content: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    //backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  item_container: {
    flexDirection: "row",
    width: Context.getSize(311),
    height: Context.getSize(50),
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden"
  },
  item_last: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  item_line: {
    width: "100%",
    height: Context.getSize(1),
    backgroundColor: Context.getColor("separatorLine")
  },
  item_text: {
    color: Context.getColor("modalComboText"),
    fontSize: Context.getSize(12),
    fontWeight: "400"
  },
  icon_selected: {
    width: Context.getSize(18),
    height: Context.getSize(18)
  }
});


