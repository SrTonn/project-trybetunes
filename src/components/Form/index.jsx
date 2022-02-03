import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../Input';
import Loading from '../Loading';
import { createUser } from '../../services/userAPI';

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isSaveButtonDisabled: true,
      redirect: false,
      isLoading: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.checkAllConditions = this.checkAllConditions.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  onInputChange({ target: { type, name, checked, value } }) {
    this.setState(() => ({
      [name]: type === 'checkbox' ? checked : value,
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
      isSaveButtonDisabled: !(inputName.length >= MIN_CHARACTERES && inputName),
    }));
  }

  render() {
    const { inputName, isSaveButtonDisabled, redirect, isLoading } = this.state;

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
          label="Login:"
          dataTestId="login-name-input"
          onInputChange={ this.onInputChange }
          value={ inputName }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isSaveButtonDisabled }
          onClick={ () => this.routeChange(inputName) }
        >
          Entrar
        </button>
      </form>
    );
  }
}
