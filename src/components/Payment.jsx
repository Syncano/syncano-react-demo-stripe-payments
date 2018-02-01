import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

import createCustomer from '../actions/customerActions';
import { makePayment, clearPaymentSuccessFlag } from '../actions/paymentActions';
import { generateToken, clearTokenSuccessFlag } from '../actions/generateTokenActions';
import { createCard } from '../actions/cardActions';

import checkCreditCard from './utils/validate';

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
    const { successFlag: getTokenSuccessFlag, source } = getTokenState;

    if (paymentState.successFlag) {
      swal({
        title: 'Payment Successful',
        text: 'Would you like to create a card?',
        icon: 'success',
        buttons: { confirm: 'Yes', cancel: 'No' }
      })
        .then((yes) => {
          this.props.clearPaymentSuccessFlag();
          if (yes) {
            const getTokenParams = {
              number: this.state.cardNumber,
              exp_month: this.state.expMonth,
              exp_year: this.state.expYear,
              cvc: this.state.cvCode
            };
            this.props.generateToken(getTokenParams);
          } else {
            swal.stopLoading();
            swal.close();
          }
        });
    }

    if (getTokenSuccessFlag) {
      this.props.clearTokenSuccessFlag();
      this.props.createCard(customerID, source);
      this.props.history.push('/cards');
    } else if (getTokenSuccessFlag === false) {
      this.props.clearTokenSuccessFlag();
      swal(`${getTokenState.error} Use a test card `);
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

    try {
      const checkingCreditCard = checkCreditCard(
        this.state.expMonth,
        this.state.expYear,
        this.state.cardNumber,
        this.state.cvCode
      );
      if (checkingCreditCard === 'Valid') {
        const makPaymentParams = {
          amount: this.state.amount,
          currency: this.state.currency,
          source: this.state.source
        };

        this.props.makePayment(makPaymentParams);
      } else {
        swal(checkingCreditCard);
      }
    } catch (error) {
      swal(error);
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
              <div className='panel-heading display-table'>
                <div className='row space display-tr'>
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
                    <div className='col-sm-12'> <h4>Amount: $500</h4></div>
                  </div>
                  <div className='row space'>
                    <div className='col-sm-12'>
                      <div className='form-group'>
                        <label htmlFor='cardNumber'>CARD NUMBER</label>
                        <div className='input-group'>
                          <input
                            type='tel'
                            className='form-control'
                            placeholder='1234567898765432'
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
      </div>
    );
  }
}

Payment.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  makePayment: PropTypes.func.isRequired,
  generateToken: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,
  clearPaymentSuccessFlag: PropTypes.func.isRequired,
  clearTokenSuccessFlag: PropTypes.func.isRequired,

  customerID: PropTypes.string,

  paymentDetails: PropTypes.object,
  paymentState: PropTypes.object,
  getTokenState: PropTypes.object,
  card: PropTypes.object,
  createCardState: PropTypes.object,
  history: PropTypes.object,

};

Payment.defaultProps = {
  paymentDetails: {},
};

const mapStateToProps = (state) => {
  return {
    paymentState: state.paymentReducer,
    getTokenState: state.getTokenReducer,
    customerID: state.customerReducer.customerId,
    createCardState: state.cardReducer,
  };
};

const mapDispatchToProps = dispatch => ({
  makePayment: paymentDetails => dispatch(makePayment(paymentDetails)),
  createCustomer: accountBalance => dispatch(createCustomer(accountBalance)),
  generateToken: card => dispatch(generateToken(card)),
  createCard: (customerID, source) => dispatch(createCard(customerID, source)),
  clearPaymentSuccessFlag: () => dispatch(clearPaymentSuccessFlag()),
  clearTokenSuccessFlag: () => dispatch(clearTokenSuccessFlag()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
