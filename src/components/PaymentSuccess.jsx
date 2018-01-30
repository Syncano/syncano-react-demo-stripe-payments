import React from 'react';
import PropTypes from 'prop-types';

/**
 * PaymentSuccess component
 * @class Payment
 * @extends {React.Component}
 * @render {render()}
 */
class PaymentSuccess extends React.Component {
  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="container">
        <div className="modal fade success-popup " id="myModal">
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Payment Successful {this.props.message}</h4>
              </div>
              <br />
              <div className="modal-body">
                <h4>Would you like to create a card?</h4>
                <div className="row">
                  <div className="col-lg-5 col-lg-offset-2 ">
                    <button type="button" className="btn btn-success" onClick = {this.props.onConfirm}>
                      Yes
                    </button>
                  </div>
                  <div className="col-xs-1 col-xs-offset-0">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaymentSuccess.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default PaymentSuccess;
