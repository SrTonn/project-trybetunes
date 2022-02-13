import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../Input';
import Loading from '../Loading';
import { createUser } from '../../services/userAPI';
import styles from './style.module.css';

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isLoginButtonDisabled: true,
      redirect: false,
      isLoading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.checkAllConditions = this.checkAllConditions.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  onInputChange({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }), this.checkAllConditions);
  }

  async routeChange(login) {
    this.setState(() => ({
      isLoading: true,
    }));

    const result = await createUser({ name: login });

    if (result) {
      this.setState(() => ({
        isLoading: false,
        redirect: true,
      }));
    }
  }

  checkAllConditions() {
    const { inputName } = this.state;
    const MIN_CHARACTERES = 3;
    this.setState(() => ({
      isLoginButtonDisabled: !(inputName.length >= MIN_CHARACTERES && inputName),
    }));
  }

  render() {
    const { inputName, isLoginButtonDisabled, redirect, isLoading } = this.state;
    const { updateUser } = this.props;

    if (isLoading) {
      return (
        <Loading />
      );
    }

    if (redirect) {
      return (
        <Redirect to="/search" />
      );
    }

    return (
      <form>
        <Input
          name="inputName"
          placeHolder="Nome"
          className={ styles.LoginNameInput }
          dataTestId="login-name-input"
          onInputChange={ this.onInputChange }
          value={ inputName }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          className={ styles.LoginSubmitButton }
          disabled={ isLoginButtonDisabled }
          onClick={ () => {
            this.routeChange(inputName);
            updateUser(inputName);
          } }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  updateUser: PropTypes.func.isRequired,
};
