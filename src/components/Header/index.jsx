import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Loading from '../Loading';
import Logo from '../../assets/logo-trybe-tunes.svg';
import styles from './styles.module.css';

export default class Header extends Component {
  render() {
    const { userName, isLoading } = this.props;

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
          <section className={ styles.SectionLinks }>
            <NavLink to="/search" data-testid="link-to-search">Pesquisa</NavLink>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favorita</NavLink>
            <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
          </section>
        )}
      </header>
    );
  }
}

// Dica do Leo Vogel utilizar um state nesse componente

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
