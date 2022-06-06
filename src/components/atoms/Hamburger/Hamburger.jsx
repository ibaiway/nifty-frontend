import React from 'react';

// styles
import './Hamburger.scss';
// i18n
import { t } from 'i18next';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setHamburger } from '../../../redux/Hamburger/hamburgerSlice';
import { removeUser } from '../../../redux/User/userSlice';
// components
import ListItemIcon from '../../molecules/ListItemIcon/ListItemIcon';
import NavList from '../../molecules/NavList/NavList';
// routes
import * as route from '../../../routes';
// icons
import logout from '../../../assets/svg/asideSvg/logout.svg';
import hamburgerIcon from '../../../assets/svg/hamburger.svg';
import crossIcon from '../../../assets/svg/cross.svg';

function Hamburger() {
  const dispatch = useDispatch();
  const {
    user,
    hamburger: { isHamburgerActive }
  } = useSelector((state) => state);

  return (
    <>
      <button
        className="hamburgerButton"
        type="button"
        onClick={() => dispatch(setHamburger(!isHamburgerActive))}
      >
        <img
          src={isHamburgerActive ? crossIcon : hamburgerIcon}
          alt="hamburger"
        />
      </button>
      {isHamburgerActive ? (
        <div className="hamburgerWrapper">
          <div className="navlistsWrapper">
            <NavList title="Menu">
              <ListItemIcon route={route.APP} icon="home">
                Home
              </ListItemIcon>
              <ListItemIcon
                route={`${route.APP}${route.SEARCH}`}
                selected
                icon="search"
              >
                Search
              </ListItemIcon>
              <ListItemIcon
                route={`${route.APP}${route.PLAYLISTS}`}
                icon="albums"
              >
                Playlists
              </ListItemIcon>
              <ListItemIcon
                route={`${route.APP}${route.ARTISTS}`}
                icon="artists"
              >
                Artists
              </ListItemIcon>
            </NavList>
            <NavList title="Library">
              <ListItemIcon
                route={`${route.APP}${route.MY_LIKES}`}
                icon="favourites"
              >
                My music
              </ListItemIcon>
              <ListItemIcon
                route={`${route.APP}${route.MY_PLAYLISTS}`}
                icon="playlist"
              >
                {t('aside.myPlaylist')}
              </ListItemIcon>
              {user.artist && (
                <ListItemIcon
                  route={`${route.APP}${route.UPLOAD_TRACK}`}
                  icon="upload"
                >
                  Upload
                </ListItemIcon>
              )}
              {user.artist && (
                <ListItemIcon
                  route={`${route.APP}${route.MY_UPLOADS}`}
                  icon="myUploads"
                >
                  {t('aside.myUploads')}
                </ListItemIcon>
              )}
            </NavList>

            <NavList title="Settings">
              <ListItemIcon
                icon="account"
                route={`${route.APP}${route.ACCOUNT}`}
              >
                Account
              </ListItemIcon>
              <li className="listItemLink">
                <button
                  onClick={() => dispatch(removeUser())}
                  type="button"
                  className="listItemLink"
                >
                  <img src={logout} alt="logout" />
                  <span>Sign out</span>
                </button>
              </li>
            </NavList>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Hamburger;
