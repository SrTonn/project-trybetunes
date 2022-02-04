import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
import Logo from '../../assets/logo-trybe-tunes.svg';
import './index.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState(() => ({
      userName: name,
      isLoading: false,
    }));
  }

  render() {
    const { userName, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header-container">
          <Link to="/">
            <img src={ Logo } alt="logo-tipo trybetunes" />
          </Link>
          {isLoading ? <Loading /> : (
            <div>
              <img
                className="profile-image"
                src={ `https://github.com/${userName}.png` }
                alt="user ico"
              />
              <span
                className="header-user-name"
                data-testid="header-user-name"
              >
                {userName}
              </span>
            </div>
          ) }
        </div>
        {!isLoading && (
          <section className="section-links" data-testid="link-to-profile">
            <NavLink to="/search">Pesquisa</NavLink>
            <NavLink to="/favorites">Favorita</NavLink>
            <NavLink to="/profile">Perfil</NavLink>
          </section>
        )}
      </header>
    );
  }
}

// Dica do Leo Vogel utilizar um state nesse componente
