import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
//   const activeStyle = { color: 'blue' };
  return (
<div id="stage">
  <div id="stage-caption">
    <h1 className="display-3">Syncano Socket Stripe Payment Demo</h1>
    <h4> <p> - Use any of Stripe testing credit card (e.g, 4242424242424242) </p>
      <p> - any three or four digit CVC code (depending on the of type card) </p>
      <p> - and a valid month and year </p> </h4>
      <p><a href='https://stripe.com/docs/testing#cards'> Click to view more test credit cards</a></p>
    <Link to="/payment" className="btn btn-lg btn-primary">Make Payment</Link>
  </div>
</div>

  );
};

export default Home;
