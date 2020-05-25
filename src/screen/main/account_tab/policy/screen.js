import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { BaseScreen, Header, HDPdf } from "component";
import Util from "util";
import Context from "context";
import Network from "middleware/helper/Network";

export default class Screen extends BaseScreen {
  /**
   * <Function: constructor>
   * @param sourcePDF data of pdf base64
   * @param typeFilePolicy type of policy: have 2 type of policy
   * @param navHeader title of header get from
   */
  constructor(props) {
    super(props);
    this.state = {
      sourcePDF: null,
      typeFilePolicy: this.props.navigation.getParam("typeFilePolicy"),
      navHeader: this.props.navigation.getParam("navHeader")
    };
  }

  componentDidUpdate() {}

  /**
   * <Function: call api to get data base64>
   */
  componentDidMount = async () => {
    const { typeFilePolicy } = this.state;
    let strBase64 = this.props.base64Policy;

    if (typeFilePolicy === Util.Constant.POLICY_RULE_TYPE.ESIGN) {
      strBase64 = this.props.base64PolicyEsign;
    } else {
      strBase64 = this.props.base64Policy;
    }

    await this.loadPDF(strBase64);
  };

  /**
   * <Function: load file pdf on mobile>
   * @param strBase64 data type base64
   */
  loadPDF = async strBase64 => {
    if (strBase64) {
      const source = {
        uri: "data:application/pdf;base64," + strBase64 + "",
        cache: true
      };
      this.setState({
        sourcePDF: source
      });
    } else {
      try {
        Context.application.showLoading();
        const result = await Network.contractGetPolicy(typeFilePolicy);

        if (result != null) {
          if (result.code === 200) {
            console.log(
              "API-CONTRACT-GET-POLICY: " + JSON.stringify(result.payload)
            );

            const source = {
              uri: "data:application/pdf;base64," + result.payload.data + "",
              cache: true
            };

            this.setState({
              sourcePDF: source
            });
          } else {
            Context.application.hideLoading();
            console.log("ERROR-API-CONTRACT-GET-POLICY: " + result.code);
            console.log(
              "ERROR-API-CONTRACT-GET-POLICY: " +
                Network.getMessageFromCode(result.code)
            );
          }
        }
      } catch (err) {
        console.log("ERROR-API-CONTRACT-LIST: " + err.message);
        Context.application.hideLoading();
      }
    }
  };

  /**
   * <Function: do when fisnish load pdf on mobile>
   */
  onCompletePDF = () => {
    Context.application.hideLoading();
  };

  /**
   * <Function: render pdf>
   */
  renderPDF = () => {
    return (
      <HDPdf
        source={this.state.sourcePDF}
        style={styles.pdf}
        onLoadComplete={this.onCompletePDF}
      />
    );
  };

  /**
   * <Function: render screen>
   */
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={this.state.navHeader}
          navigation={this.props.navigation}
        />
        {this.state.sourcePDF === null ? null : this.renderPDF()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F5F6"
  },
  boxContainer: {
    flex: 1,
    width: Context.getSize(343),
    backgroundColor: "white",
    paddingLeft: 16,
    marginHorizontal: 15,
    marginVertical: Context.getSize(24),
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
  },
  pdf: {
    flex: 1,
    backgroundColor: Context.getColor("background"),
    marginTop: 0,
    width: "100%",
    height: "100%"
  }
});
