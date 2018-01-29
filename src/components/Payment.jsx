import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import createCustomer from '../actions/customerActions';
import makePayment from '../actions/paymentActions';
import generateToken from '../actions/generateTokenActions';

import PaymentSuccess from './PaymentSuccess';
import { isValidCreditCard, isCheckExp } from './utils/validate';

/**
 * Payment component
 * @class Payment
 * @extends {React.Component}
 * @render {render()}
 */
class Payment extends React.Component {
  /**
   *
   * @param {*} props
   * @param {*} context
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvCode: '',
      amount: 500,
      currency: 'usd',
      source: 'tok_mastercard',
      account_balance: 0,
      showModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.getToken = this.getToken.bind(this);
  }

  /**
   * 
   */
  componentDidMount() {
    this.props.createCustomer(this.state.account_balance);
  }

  // componentWillMount() {
  //   const card = {
  //     number: this.state.cardNumber,
  //     exp_month: this.state.expMonth,
  //     exp_year: this.state.expYear,
  //     cvc: this.state.cvCode
  //   };
  //   this.props.generateToken(card);
  // }

  /**
   * Event Listner for changes to form input
   * @param {Object} event The form change even
   * @returns {null} - null
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {*} event
   * @returns
   */
  onSubmit(event) {
    event.preventDefault();

    this.modalEvent.click();

    try {
      if (isValidCreditCard(this.state.cardNumber)) {
        // check isValidCreditCard() again, seems wrong
        throw new Error('Please Enter Sams Name');
      }
      // if (isCheckExp(this.state.expMonth, this.state.expYear)) {
      //   throw new Error('Please Enter valid month and year');
      // }

      const validExp = isCheckExp(this.state.expMonth, this.state.expYear);
      if (validExp !== 'Valid') {
        throw new Error(validExp);
      }
      const makPaymentParams = {
        amount: this.state.amount,
        currency: this.state.currency,
        source: this.state.source
      };
      this.props.makePayment(makPaymentParams);
    } catch (error) {
      // return error.message;
      console.log(error.message);
    }
  }

  // get state value for generation token
  /**
   * @returns {state} - params for generating token
   */
  getToken() {
    const getTokenParams = {
      number: this.state.cardNumber,
      exp_month: this.state.expMonth,
      exp_year: this.state.expYear,
      cvc: this.state.cvCode
    };
    console.log(getTokenParams, 'Payment.jsx')
    this.props.generateToken(getTokenParams);
  }

  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-10">
            <div className="panel panel-default credit-card-box">
              <header>
                <div className="Header-logo">
                  <div className="Header-logoWrap">
                    <div className="Header-logoBevel" />
                    <div className="Header-logoBorder " />

                    <img
                      className="Header-logoImage"
                      src="https://pbs.twimg.com/profile_images/692354435738161152/UAkVM9-p.png"
                      alt="Logo"
                    />
                  </div>
                </div>
              </header>
              <br />

              <div className="panel-heading display-table">
                <div className="row display-tr">
                  <h3 className="panel-title display-td">Payment Details</h3>
                  <div className="display-td">
                    <img
                      className="img-responsive"
                      src="http://i76.imgup.net/accepted_c22e0.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="panel-body">
                <form id="payment-form" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="col-sm-12">Amount: $500</div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="cardNumber">CARD NUMBER</label>
                        <div className="input-group">
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="1234-5678-9876-5432"
                            autoComplete="cc-number"
                            name="cardNumber"
                            value={this.state.cardNumber}
                            onChange={this.onChange}
                            required
                          />
                          <span className="input-group-addon">
                            <i className="fa fa-credit-card" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-5 col-sm-5">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">EXPIRATION DATE</label>

                        <div className="col-sm-5">
                          <div className="form-group">
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="MM"
                              autoComplete="cc-month"
                              name="expMonth"
                              value={this.state.expMonth}
                              onChange={this.onChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-5">
                      <div className="form-group">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="YYYY"
                          autoComplete="cc-year"
                          name="expYear"
                          value={this.state.expYear}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>
                      </div>
                    </div>
                    <div className="col-sm-7 col-sm-7">
                      <div className="form-group">
                        <label htmlFor="cardCVC">CV CODE</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="CVC"
                          autoComplete="cc-cvc"
                          name="cvCode"
                          value={this.state.cvCode}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    data-toggle="modal"
                    data-target="#myModal"
                    className="no-display"
                    ref={btn => this.modalEvent = btn}
                  />
                  <div className="row">
                    <div className="col-sm-12">
                      <button
                        type="submit"
                        className="btn submit-button btn-lg btn-block"
                        
                      >
                        Start Subscription
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <PaymentSuccess show = {this.state.showModal } onConfirm = {this.getToken.bind(this)} />
      </div>
    );
  }
}

Payment.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,

  paymentDetails: PropTypes.PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
    source: PropTypes.string
  }),

  card: PropTypes.PropTypes.shape({
    number: PropTypes.number,
    exp_month: PropTypes.number,
    exp_year: PropTypes.number,
    cvc: PropTypes.number
  }),

};

Payment.defaultProps = {
  paymentDetails: {},
};

const mapStateToProps = (state) => {
  return {
    paymentDetails: state.paymentReducer
  };
};

const mapDispatchToProps = dispatch => ({
  makePayment: paymentDetails => dispatch(makePayment(paymentDetails)),
  createCustomer: accountBalance => dispatch(createCustomer(accountBalance)),
  generateToken: card => dispatch(generateToken(card)),
});

// const mapDispatchToProps = dispatch => ({
//   makePayment: paymentData => dispatch(makePayment(paymentData))
// });

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
