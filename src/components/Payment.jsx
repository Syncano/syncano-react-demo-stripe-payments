import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import createCustomer from '../actions/customerActions';
import makePayment from '../actions/paymentActions';
import generateToken from '../actions/generateTokenActions';
import createCard from '../actions/cardActions';

import { isValidCreditCard, isCheckExp } from './utils/validate';
import helpers from './utils/helpers';

/**
 * Payment component
 * @class Payment
 * @extends {React.Component}
 * @render {render()}
 */
class Payment extends React.Component {
  state = {
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvCode: '',
    amount: 500,
    currency: 'usd',
    source: 'tok_mastercard',
    account_balance: 0,
    showModal: false,
    expectedResultType: null
  };

  /**
   * @method componentDidMount
   * @returns {void}
   */
  componentDidMount() {
    this.props.createCustomer(this.state.account_balance);
  }

  /**
   * @method componentWillRecieveProps
   * @param {*} nextProps - New properties
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { getTokenState, paymentState, customerID } = nextProps;
    const { responseType: getTokenResponseType, source } = getTokenState;
    const { expectedResultType } = this.state;

    if (paymentState.responseType === helpers.MAKE_PAYMENT_SUCCESSFUL
      && (!expectedResultType || expectedResultType === helpers.MAKE_PAYMENT_SUCCESSFUL)) {
      console.log('Hello');
      swal({
        title: 'Payment Successful',
        text: 'Would you like to create a card?',
        icon: 'success',
        buttons: { confirm: 'Yes', cancel: 'No' }
      })
        .then((play) => {
          if (play) {
            const getTokenParams = {
              number: this.state.cardNumber,
              exp_month: this.state.expMonth,
              exp_year: this.state.expYear,
              cvc: this.state.cvCode
            };
            this.props.generateToken(getTokenParams);
            this.setState(() => {
              return { expectedResultType: helpers.GET_TOKEN_SUCCESSFUL };
            });
          } else {
            swal('Your imaginary file is safe!');
          }
        });
    }
    if (getTokenResponseType === helpers.GET_TOKEN_SUCCESSFUL
      && (!expectedResultType || expectedResultType === helpers.GET_TOKEN_SUCCESSFUL)) {
      this.props.createCard(customerID, source);
      this.setState(() => {
        return { resultType: helpers.CREATE_CARD_SUCCESSFUL };
      });
    }
  }

  /**
   * Event Listner for changes to form input
   * @param {Object} event The form change even
   * @returns {null} - void
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  /**
   * @param {Object} event - for submitting payment
   * @returns {void} - void
   */
  onSubmit = (event) => {
    event.preventDefault();

    this.modalEvent.click();

    try {
      if (isValidCreditCard(this.state.cardNumber)) {
        // check isValidCreditCard() again, seems wrong
        throw new Error('Please Enter Sams Name');
      }

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
  
  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10'>
            <div className='panel panel-default credit-card-box'>
              <header>
                <div className='Header-logo'>
                  <div className='Header-logoWrap'>
                    <div className='Header-logoBevel' />
                    <div className='Header-logoBorder ' />

                    <img
                      className='Header-logoImage'
                      src='https://pbs.twimg.com/profile_images/692354435738161152/UAkVM9-p.png'
                      alt='Logo'
                    />
                  </div>
                </div>
              </header>
              <br />

              <div className='panel-heading display-table'>
                <div className='row display-tr'>
                  <h3 className='panel-title display-td'>Payment Details</h3>
                  <div className='display-td'>
                    <img
                      className='img-responsive'
                      src='http://i76.imgup.net/accepted_c22e0.png'
                      alt=''
                    />
                  </div>
                </div>
              </div>

              <div className='panel-body'>
                <form id='payment-form' onSubmit={this.onSubmit}>
                  <div className='row'>
                    <div className='col-sm-12'>Amount: $500</div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor='cardNumber'>CARD NUMBER</label>
                        <div className='input-group'>
                          <input
                            type='tel'
                            className='form-control'
                            placeholder='1234-5678-9876-5432'
                            autoComplete='cc-number'
                            name='cardNumber'
                            value={this.state.cardNumber}
                            onChange={this.onChange}
                            required
                          />
                          <span className='input-group-addon'>
                            <i className='fa fa-credit-card' />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-sm-5 col-sm-5'>
                      <div className='form-group'>
                        <label htmlFor='cardExpiry'>EXPIRATION DATE</label>

                        <div className='col-sm-5'>
                          <div className='form-group'>
                            <input
                              type='tel'
                              className='form-control'
                              placeholder='MM'
                              autoComplete='cc-month'
                              name='expMonth'
                              value={this.state.expMonth}
                              onChange={this.onChange}
                              required
                            />
                          </div>
                        </div>

                        <div className='col-sm-5'>
                      <div className='form-group'>
                        <input
                          type='tel'
                          className='form-control'
                          placeholder='YYYY'
                          autoComplete='cc-year'
                          name='expYear'
                          value={this.state.expYear}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>
                      </div>
                    </div>
                    <div className='col-sm-7 col-sm-7'>
                      <div className='form-group'>
                        <label htmlFor='cardCVC'>CV CODE</label>
                        <input
                          type='tel'
                          className='form-control'
                          placeholder='CVC'
                          autoComplete='cc-cvc'
                          name='cvCode'
                          value={this.state.cvCode}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className='no-display'
                    ref={btn => this.modalEvent = btn}
                  />
                  <div className='row'>
                    <div className='col-sm-12'>
                      <button
                        type='submit'
                        className='btn submit-button btn-lg btn-block'

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
        {/* <PaymentSuccess show = {this.state.showModal } onConfirm = {this.getToken.bind(this)} /> */}
      </div>
    );
  }
}

Payment.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,

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

  customerID: PropTypes.string,
  getTokenState: PropTypes.object,
  paymentState: PropTypes.object,

};

Payment.defaultProps = {
  paymentDetails: {},
};

const mapStateToProps = (state) => {
  return {
    paymentState: state.paymentReducer,
    getTokenState: state.getTokenReducer,
    customerID: state.customerReducer.customerId,
  };
};

const mapDispatchToProps = dispatch => ({
  makePayment: paymentDetails => dispatch(makePayment(paymentDetails)),
  createCustomer: accountBalance => dispatch(createCustomer(accountBalance)),
  generateToken: card => dispatch(generateToken(card)),
  createCard: (customerID, source) => dispatch(createCard(customerID, source))
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
