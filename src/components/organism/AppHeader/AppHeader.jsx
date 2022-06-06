import React from 'react';
// routes
import { Link } from 'react-router-dom';
import { APP } from '../../../routes';
// styles
import './AppHeader.scss';
// icon
import logoViolet from '../../../assets/svg/LogoViolet.svg';

function AppHeader() {
  return (
    <header className="appHeader">
      <Link to={APP}>
        <img className="appHeaderLogo" src={logoViolet} alt="logo" />
      </Link>
    </header>
  );
}

export default AppHeader;
