import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Logo from '../../assets/logo-trybe-tunes.svg';
import styles from './styles.module.css';

export default class Header extends Component {
  render() {
    const { userInfo, isLoading, isLoadingUser, location: { pathname } } = this.props;
    const pathSearch = '/search';
    const pathFavorites = '/favorites';
    const pathProfile = '/profile';
    const pathAlbums = '/album';

    return (
      <header data-testid="header-component">
        <div className={ styles.HeaderContainer }>
          <Link to="/">
            <img src={ Logo } alt="logo-tipo trybetunes" />
          </Link>
          {isLoadingUser ? <Loading /> : (
            <div className={ styles.ImgAndUserNameContainer }>
              <img
                className={ styles.ProfileImage }
                src={ userInfo.image }
                alt="user ico"
              />
              <span
                className={ styles.HeaderUserName }
                data-testid="header-user-name"
              >
                {isLoading ? <Loading /> : userInfo.name}
              </span>
            </div>
          ) }
        </div>
        {!isLoading && (
          <nav className={ styles.NavLinks }>
            <Link
              to="/search"
              className={ (pathname === pathSearch || pathname.startsWith(pathAlbums))
                ? styles.IsActive : '' }
              data-testid="link-to-search"
            >
              Pesquisa
            </Link>
            <Link
              to="/favorites"
              className={ pathname === pathFavorites ? styles.IsActive : '' }
              data-testid="link-to-favorites"
            >
              Favorita
            </Link>
            <Link
              to="/profile"
              className={ pathname === pathProfile ? styles.IsActive : '' }
              data-testid="link-to-profile"
            >
              Perfil
            </Link>
          </nav>
        )}
      </header>
    );
  }
}

// Dica do Leo Vogel utilizar um state nesse componente

Header.propTypes = {
  userInfo: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  location: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
};
