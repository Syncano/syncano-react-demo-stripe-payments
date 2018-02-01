## syncano-react-demo-stripe-payments

This demo features a sample payment interface that uses [Syncano Stripe socket](https://syncano.io/#/sockets/stripe-payments) to illustrate payment and card services on the web.

![Demo](https://media.giphy.com/media/26wkEMe7xmcf8Faak/giphy.gif)

### Description/ Usage
This simple demo allows you to make payment, create cards and delete cards as a customer.
On mounting of the application, a `customerID` is generated to identify user, When the <payment> page loads, it displays a form with bunch of inputs ready to receive credit card data. Remember to use any of [Stripe testing credit card](https://stripe.com/docs/testing#cards), any three or four digit CVC code (depending on the of type card) and a valid month and year; to make payments on this demo application. On successful submission of credit card, a user can decide to create a card and a token would be generated to ensure card is being created. Created cards can also be deleted.
![stripe test cards](https://media.giphy.com/media/xUOwGhM0Wnk5IoqeGI/giphy.gif)


### Local Setup
- Clone this repo 
- Move to project repo 
- Install dependencies `npm install`
- Create a .env file on the root directory. Assign the instance name where two-factor-auth socket attached to the `SYNCANO_INSTANCE`
  e.g `SYNCANO_INSTANCE=abcd`
- Run `npm start` to start project




