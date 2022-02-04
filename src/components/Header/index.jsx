import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../Loading';
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
      <div data-testid="header-component">
        {isLoading ? <Loading /> : <p data-testid="header-user-name">{userName}</p> }
      </div>
    );
  }
}

// Dica do Leo Vogel utilizar um state nesse componente
