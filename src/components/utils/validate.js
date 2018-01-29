
/* eslint-disable max-len */
/**
 * Function that checks if a string is a valid email according to RFC 5322 Official Standard
 * @param {String} string The string to be tested
 * @returns {Boolean} True if the string is a valid email
 */
export const isValidCreditCard = string =>
  (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string));

// /**
//  * Function that checks if a string is a valid first and last name combination
//  * Only letters, apostrophes and hyphens are permitted
//  * @param {String} string The string to be tested
//  * @returns {Boolean} True if the string is a valid name
// //  */
// export const isValidMonth = string => (/^(0[1-9]|1[0-2])$/.test(string));


const normalizeYear = (year) => {
  // Century fix
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

export const isCheckExp = (month, year) => {
  // concatenate the value as exParams

  const exParams = `${month}/${year}`;
  const match = exParams.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
  if (!match) {
    return ('Input string isn\'t match the expiration date format or date fragments are invalid.');
  }
  const exp = new Date(normalizeYear(1 * match[2]), 1 * (match[1] - 1), 1).valueOf();
  const now = new Date();
  const currMonth = new Date(now.getFullYear(), now.getMonth(), 1).valueOf();
  if (exp <= currMonth) {
    return ('Expired');
  } return ('Valid');
};
