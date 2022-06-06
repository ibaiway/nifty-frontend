import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ACCOUNT, APP, SIGN_UP } from '../../routes';

import LOGO from '../../assets/svg/LogoViolet.svg';
import Button from '../../components/molecules/Button/Button';
import SelectLang from '../../components/atoms/SelectLang/SelectLang';
import video from '../../assets/video/nifty_promo.mp4';
import Avatar from '../../components/atoms/Avatar/Avatar';

import woman from '../../assets/img/woman-listening-to-music.jpg';
import band from '../../assets/img/band.jpg';

import './Landing.scss';

function Landing() {
  const user = useSelector((state) => state.user);
  return (
    <div className="landingContainer">
      <header className="headerWrapper">
        <div className="logoWrapper">
          <Link to={APP}>
            <img src={LOGO} alt="logo" />
          </Link>
        </div>
        <nav className="navWrapper">
          <ul className="navList">
            <li className="navListSelectLng">
              <SelectLang />
            </li>

            {!user.isLoggedIn ? (
              <>
                <li className="navListSignUp">
                  <a href="/sign-up">Sign Up</a>
                </li>
                <li className="navListLogIn">
                  <a href="/login">Log In</a>
                </li>
              </>
            ) : (
              <li className="AvatarLogin">
                <div className="landingAvatarWrapper">
                  <Link to={`${APP}${ACCOUNT}`}>
                    <Avatar size={50} />
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <article className="flexWrapper">
        <div className="iframeContainer">
          {' '}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            className="responsive-iframe"
            width="100%"
            height="100%"
            autoPlay
            muted
            controls
            title="Nifty video"
            src={video}
          />
        </div>
        <div className="landingSectionWrapper">
          <section className="leftLandingSection">
            <h1 className="headingTitle">Never Stop Listening</h1>
            <p className="landingText">
              Discover, stream and share a constantly expanding mix of music
              from emerging and major artists around the world.
            </p>
            <div className="buttonWrapper">
              <Button>
                {!user.isLoggedIn ? (
                  <Link to={SIGN_UP}>START NOW</Link>
                ) : (
                  <Link to={APP}>START NOW</Link>
                )}
              </Button>
            </div>
          </section>
          <div className="landingImageWrapper">
            <img src={woman} alt="woman listening to music" />
          </div>
        </div>
        <div className="landingSectionWrapper2">
          <div className="landingImageWrapper">
            <img src={band} alt="woman listening to music" />
          </div>
          <section className="leftLandingSection">
            <h1 className="headingTitle">Share your music</h1>
            <p className="landingText">
              Share your tracks and engage with the community. Check custom
              statistics and performance metrics and grow your career.
            </p>
            <div className="buttonWrapper">
              <Button>
                {!user.isLoggedIn ? (
                  <Link to={SIGN_UP}>Become an artist</Link>
                ) : (
                  <Link to={APP}>Become an artist</Link>
                )}
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

export default Landing;
