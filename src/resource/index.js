import image from "image";
import color from "./color";
import strings from "./String";
import Style from "./Style";
import dimension from "./dimen";
import * as Font from "./font";
import provinces from './files/vietnam_province_data.json'
// import banks from './files/bank_list.json'
import contractsTest from './files/contracts_test.json'
import contractDetailTest from './files/contract_detail_test.json'
import stores from './files/stores_list.json'

export default resource = {
  strings: strings,
  colors: color,
  images: image,
  styles: Style,
  sounds: {},
  fonts: {
    fontSize:Font.normalize
  },
  dimension: dimension,
  provinces:provinces,
  // banks:banks,
  contractTest:contractsTest,
  contractDetailTest:contractDetailTest,
  stores: stores
};

