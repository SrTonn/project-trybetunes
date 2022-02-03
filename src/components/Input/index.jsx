import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { name, label, type, dataTestId, onInputChange, value } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          data-testid={ dataTestId }
          type={ type }
          id={ name }
          name={ name }
          onChange={ onInputChange }
          value={ value }
        />
      </label>
    );
  }
}

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  dataTestId: PropTypes.string.isRequired,
};
