import React, { Component } from 'react';
import Form from '../../components/Form';
import LogoTrybetunes from '../../assets/logo-trybe-tunes-dark.svg';
import './index.css';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login" className="login-container">
        <img
          src={ LogoTrybetunes }
          className="logo-trybetunes"
          alt="trybe tunes logo"
        />
        <fieldset>
          <Form { ...this.props } />
        </fieldset>
      </div>
    );
  }
}
