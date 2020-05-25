import Resource from "resource";
import { Dimensions } from "react-native";
const win = Dimensions.get("window");

export default class Context {
  static application;
  static res = Resource;
  static style = Resource.styles;
  static getLanguage() {
    return this.res.strings.getLanguage();
  }
  static setLanguage(key) {
    return this.res.strings.setLanguage(key);
  }
  static getString(key, ...params) {
    return this.res.strings.get(key, ...params);
  }
  static getColor(key) {
    return this.res.colors[key];
  }
  static getFont(key) {
    return this.res.fonts[key];
  }
  static getImage(key) {
    return this.res.images[key];
  }
  static getSound(key) {
    return this.res.sounds[key];
  }
  static getWindow() {
    return win;
  }

  static getDimen(key) {
    return this.res.dimension[key];
  }

  static getFontSize(size) {
    return this.res.fonts.fontSize(size)
  }

  static getDeviceScale() {
    return win.width / 375;
  }
  static getSize(size) {
    return Context.getDeviceScale() * size
  }

  static getSize(size) {
    return Context.getDeviceScale() * size;
  }

  static getProvinces() {
    return this.res.provinces
  }

  static getSizeCustome(size) {
    return (
      (Math.sqrt(win.width * win.width + win.height * win.height) * size) /
      Math.sqrt(799969)
    );
  }

  static getDistricts(provinceCode) {
    const provinces = Context.getProvinces()

    const pv = provinces.filter(item => {
      return item.code == provinceCode
    })[0];
    
    var districts = pv.district.map((item) => {
      var prefix = ""
      if (item.type == "quan") {
        prefix = "Quận"
      } else if (item.type == "H") {
        prefix = "Huyện"
      } else if (item.type == "Tp") {
        prefix = "Thành phố"
      } else if (item.type == "Tx") {
        prefix = "Thị xã"
      }
      item["name"] = prefix + " " + item.name
      return item
    })

    return districts
  }
}
