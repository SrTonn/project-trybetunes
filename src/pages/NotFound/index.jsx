import React, { Component } from 'react';
import notFoundImage from '../../assets/page404.png';
import './index.css';

class NotFound extends Component {
  render() {
    return (
      <>
        <h1 className="title-page-not-found">Ops... nada encontrado aqui (404)</h1>
        <div data-testid="page-not-found" className="container-page-not-found">
          <img
            className="img-page-not-found"
            src={ notFoundImage }
            alt="page-not-found"
          />
        </div>
      </>
    );
  }
}

export default NotFound;
