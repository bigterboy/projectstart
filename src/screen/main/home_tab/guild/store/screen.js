import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import {
  BaseScreen,
  Header,
  HDSelectionInput,
  ModalCombobox,
  HDText
} from "component";
import Context from "context";
import Network from "middleware/helper/Network";
import LocalStorage from "middleware/helper/LocalStorage";

export default class Screen extends BaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      isShowProvinces: false,
      isShowDistricts: false,
      provinceName: null,
      provinceCode: null,
      districtName: null,
      districtCode: null,
      stores: [],
      filters: [],
      provinces: [],
      districts: []
    };
  }

  componentDidUpdate() { }
  componentDidMount = async () => {
    let provinces = await LocalStorage.getProvinces()
    let arrProvinces = []

    arrProvinces.push({
      id: 0,
      name: Context.getString("common_all").toUpperCase(),
      code: "0"
    })

    provinces.forEach((item) => {
      arrProvinces.push({
        id: item.id,
        name: item.provinceName.toUpperCase(),
        code: item.id.toString()
      })
    });

    this.setState({
      provinces: arrProvinces
    })
    await this.getStoresAPI()
  }

  getStoresAPI = async () => {
    let stores = await LocalStorage.getListStores()
    if (stores){
      this.setState({
        stores: stores,
        filters: stores
      })
    }else{
      try {
        Context.application.showLoading();
        const result = await Network.getListStores();
        Context.application.hideLoading();
        if (result != null) {
          if (result.code === 200) {
            console.log("API-GET-STORES-COMPLETE: " + JSON.stringify(result));
            if (result.payload != null) {
              this.setState({
                stores: result.payload,
                filters: result.payload
              })
              await LocalStorage.saveListStores()
            }
          } else {
            console.log("ERROR-API-GET-STORES: " + result.code);
            console.log(
              "ERROR-API-GET-STORES: " +
              Network.getMessageFromCode(result.code)
            );
          }
        }
      } catch (err) {
        Context.application.hideLoading();
        console.log("ERROR-API-GET-STORES: " + err.message);
      }
    }
  }

  getDistrictsAPI = async (id) => {
    console.log("getDistrictsAPI: " + id)
    let arrDistricts = []
    arrDistricts.push({
      id: 0,
      name: Context.getString("common_all").toUpperCase(),
      code: "0"
    })
    try {
      const result = await Network.districts(id);
      if (result != null) {
        if (result.code === 200) {
          if (result.payload != null) {
            result.payload.forEach(item => {
              arrDistricts.push({
                id: item.id,
                name: item.districtName.toUpperCase(),
                code: item.id.toString()
              })
            })
            this.setState({
              districts: arrDistricts
            })
          }
        } else {
          console.log("ERROR-API-GET-STORES: " + result.code);
          console.log(
            "ERROR-API-GET-STORES: " +
            Network.getMessageFromCode(result.code)
          );
        }
      }
    } catch (err) {
      Context.application.hideLoading();
      console.log("ERROR-API-GET-STORES: " + err.message);
    }
  }

  showProvinces = () => {
    this.setState({ isShowProvinces: true });
  };

  showDistricts = () => {
    this.setState({ isShowDistricts: true });
  };

  selectProvince = (item, index) => {
    this.setState(
      {
        ...this.state,
        provinceCode: item.code,
        provinceName: item.name,
        districtName: null,
        districtCode: null,
        // districts: Context.getDistricts(item.code),
        isShowProvinces: false
      },
      async () => {
        await this.getDistrictsAPI(item.id)
        this.filterStores();
      }
    );
  };

  selectDistrict = (item, index) => {
    console.log("district: " + item.code);
    this.setState(
      {
        ...this.state,
        districtCode: item.code,
        districtName: item.name,
        selectedDistrict: item.code,
        isShowDistricts: false
      },
      () => {
        this.filterStores();
      }
    );
  };

  _renderItemStore = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <View style={styles.item_container}>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginBottom: 16
            }}>
            <HDText style={styles.store_name}>{item.name.toUpperCase()}</HDText>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingHorizontal: 16
            }}
          >
            <HDText style={styles.store_address}>{item.address}</HDText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  filterStores = () => {
    const { provinceCode, districtCode } = this.state;
    const { stores } = this.state;
    let filters = stores;
    if (provinceCode === "0") {
      this.setState({
        filters: stores
      });
      return;
    }

    if (provinceCode) {
      if (districtCode === "0") {
        filters = stores.filter(item => {
          return item.provinceCode == provinceCode;
        });
      } else if (districtCode) {
        filters = stores.filter(item => {
          return (
            item.provinceCode == provinceCode &&
            item.districtCode == districtCode
          );
        });
      } else {
        filters = stores.filter(item => {
          return item.provinceCode == provinceCode;
        });
      }
    }

    this.setState({
      filters: filters
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          title={Context.getString("home_tab_guild_store_nav")}
          navigation={this.props.navigation}
        />

        <View style={styles.content_container}>
          <View style={styles.selection_container}>
            <HDSelectionInput
              value={this.state.provinceName}
              placeholder={Context.getString("common_province")}
              style={styles.selection}
              onPress={this.showProvinces}
            />
            <HDSelectionInput
              value={this.state.districtName}
              placeholder={Context.getString("common_district")}
              style={styles.selection}
              onPress={this.showDistricts}
            />
          </View>

          <View style={{
            flex: 1,
            width: '100%'
          }}>
            <FlatList
              style={{
                flex: 1,
                width: '100%',
                height: '100%'
              }}
              data={this.state.filters}
              renderItem={this._renderItemStore}
              contentContainerStyle={styles.list_content}
            />
          </View>
        </View>
        <ModalCombobox
          title={Context.getString("home_tab_guild_store_province")}
          searchPlaceholder={Context.getString(
            "home_tab_guild_store_province_search"
          )}
          items={this.state.provinces}
          selectedValue={this.state.provinceCode}
          isVisible={this.state.isShowProvinces}
          onPressItem={this.selectProvince}
          pressCancelX={() => this.setState({ isShowProvinces: false })}
        />

        <ModalCombobox
          title={Context.getString("home_tab_guild_store_district")}
          searchPlaceholder={Context.getString(
            "home_tab_guild_store_district_search"
          )}
          items={this.state.districts}
          selectedValue={this.state.districtCode}
          isVisible={this.state.isShowDistricts}
          onPressItem={this.selectDistrict}
          pressCancelX={() => this.setState({ isShowDistricts: false })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Context.getColor("backgroundScreen")
  },
  content_container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  selection_container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16
  },
  selection: {
    width: Context.getSize(168),
    height: Context.getSize(40)
  },
  list_content: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 32
  },
  item_container: {
    width: Context.getSize(343),
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#D7E0E6",
    shadowOpacity: 1,
    shadowColor: Context.getColor("hint"),
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
    paddingVertical: 16,
    marginBottom: 16,
    backgroundColor: Context.getColor("background")
  },
  store_name: {
    fontSize: Context.getSize(16),
    fontWeight: "500",
    color: Context.getColor("textBlue1")
  },
  store_distance: {
    fontSize: Context.getSize(12),
    fontWeight: "400",
    color: Context.getColor("textBlue")
  },
  store_address: {
    fontSize: Context.getSize(14),
    fontWeight: "400",
    color: Context.getColor("textBlack")
  },
  icon_direct: {
    width: Context.getSize(16),
    height: Context.getSize(16),
    marginRight: 4
  }
});
