import React from "react";
import ModalPaymentHistoryFilter from "./modal_payment_history_filter";

const withPaymentHistoryFilterModal = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        idVisible: false,
        type: ""
      };
    }
    showModal = () => {
      this.setState({
        idVisible: true
      });
    };
    closeModal = () => {
      this.setState({
        idVisible: false
      });
    };

    handleLanguage = type => {
      this.setState({ type: type });
    };

    render() {
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} showFilter={this.showModal}  type={this.state.type}/>
          <ModalPaymentHistoryFilter
            closeModal={this.closeModal}
            isVisible={this.state.idVisible}
            onSelectLanguage={this.handleLanguage}
          />
        </React.Fragment>
      );
    }
  };
};

export default withPaymentHistoryFilterModal;
