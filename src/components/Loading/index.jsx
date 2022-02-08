import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  render() {
    const { className } = this.props;
    return <div className={ className }><p>Carregando...</p></div>;
  }
}
Loading.defaultProps = {
  className: '',
};
Loading.propTypes = {
  className: PropTypes.string,
};
