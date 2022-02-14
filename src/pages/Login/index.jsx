import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import LogoTrybetunes from '../../assets/logo-trybe-tunes-dark.svg';
import styles from './style.module.css';

export default class Login extends Component {
  componentDidMount = () => {
    const { updateState } = this.props;
    updateState('albums', [{}]);
    updateState('isQueried', false);
  }

  render() {
    return (
      <div data-testid="page-login" className={ styles.LoginContainer }>
        <img
          src={ LogoTrybetunes }
          className={ styles.LogoTrybetunes }
          alt="trybe tunes logo"
        />
        <fieldset>
          <Form { ...this.props } />
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  updateState: PropTypes.func.isRequired,
};
