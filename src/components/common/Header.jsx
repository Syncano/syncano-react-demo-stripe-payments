import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: 'blue' };
  return (
    <div className = 'container'>
      <nav className="navbar navbar-default">
      <div className="container-fluid">
      <ul className="nav navbar-nav">
      <li><NavLink to="/" activeStyle={activeStyle} exact>
          Home
        </NavLink></li>
        <li><NavLink to="/payment" activeStyle={activeStyle}>
        Make Payments
        </NavLink></li>
      </ul>
        </div>
      </nav>

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
    </div>
  );
};

export default Header;
