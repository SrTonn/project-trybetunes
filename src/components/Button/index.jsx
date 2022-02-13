import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class Button extends Component {
  render() {
    const { typeButton, label, isSearchButtonDisabled, handleClick } = this.props;

    return (
      <button
        type={ typeButton ? 'submit' : 'button' }
        className={ `${styles.SearchButton}\
          ${isSearchButtonDisabled ? styles.SearchButtonDisabled : ''}` }
        data-testid="search-artist-button"
        disabled={ isSearchButtonDisabled }
        onClick={ handleClick }
      >
        {label}
      </button>
    );
  }
}

Button.defaultProps = {
  typeButton: false,
};

Button.propTypes = {
  typeButton: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isSearchButtonDisabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
