const normalizeYear = (year) => {
  const YEARS_AHEAD = 20;
  if (year < 100) {
    const nowYear = new Date().getFullYear();
    year += Math.floor(nowYear / 100) * 100;
    if (year > nowYear + YEARS_AHEAD) {
      year -= 100;
    } else if ((year <= nowYear) - (100 + YEARS_AHEAD)) {
      year += 100;
    }
  }
  return year;
};

// /**
//  *  Takes in month, year,use current date to check if card expiry date is valid
//  * @param {*} month
//  * @param {*} year
//  * @returns {*} string
//  */
// export const isCheckExp = (month, year) => {
//   const exParams = `${month}/${year}`;
//   const match = exParams.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
//   if (!match) {
//     return ('Input string isn\'t match the expiration date format or date fragments are invalid.');
//   }
//   const exp = new Date(normalizeYear(1 * match[2]), 1 * (match[1] - 1), 1).valueOf();
//   const now = new Date();
//   const currMonth = new Date(now.getFullYear(), now.getMonth(), 1).valueOf();
//   if (exp <= currMonth) {
//     return ('Credit Card Expired');
//   } return ('Valid');
// };


/* eslint-disable max-len */
/**
 * Function that checks if a string is a valid credit card
 * @param {String} string The string to be tested
 * @returns {Boolean} True if the string is a valid email
 */
// export const isValidCreditCard = string =>
//   (/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(string));
//   // (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string));


export const checkCreditCard = (month, year, cardString, cvcString) => {
  const isValidCreditCard = (/^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(cardString));
  const isValidCVC = (/^([0-9]{3,4})$/.test(cvcString));
  const exParams = `${month}/${year}`;
  const match = exParams.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);

  const exp = new Date(normalizeYear(1 * match[2]), 1 * (match[1] - 1), 1).valueOf();
  const now = new Date();
  const currMonth = new Date(now.getFullYear(), now.getMonth(), 1).valueOf();

  // const checkCard = !isValidCreditCard ? 'Enter Valid Card Number'

  try {
    if (!isValidCreditCard) {
      return ('Enter Valid Card Number');
    } else if (!isValidCVC) {
      return ('Enter valid CVC or CVV');
    } else if (!match) {
      return ('Input string isn\'t match the expiration date format or date fragments are invalid.');
    } if (exp <= currMonth) {
      return ('Credit Card Expired');
    } return ('Valid');
  } catch (error) {
    return error.message;
  }
};


export default checkCreditCard;
