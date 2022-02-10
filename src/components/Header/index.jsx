import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Logo from '../../assets/logo-trybe-tunes.svg';
import styles from './styles.module.css';

export default class Header extends Component {
  render() {
    const { userName, isLoading, location: { pathname } } = this.props;
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
          {isLoading ? <Loading /> : (
            <div className={ styles.ImgAndUserNameContainer }>
              <img
                className={ styles.ProfileImage }
                src={ `https://github.com/${userName}.png` }
                alt="user ico"
              />
              <span
                className={ styles.HeaderUserName }
                data-testid="header-user-name"
              >
                {userName}
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
  userName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
};
