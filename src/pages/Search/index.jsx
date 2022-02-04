import React, { Component } from 'react';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

  routeChange = async () => {
    this.setState(() => ({
      isLoading: true,
    }));

    if (result) {
      this.setState(() => ({
        isLoading: false,
      }));
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
      </div>
    );
  }
}
