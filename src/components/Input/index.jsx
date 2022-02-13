import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class Input extends Component {
  render() {
    const {
      name,
      label,
      type,
      dataTestId,
      onInputChange,
      value,
      placeHolder,
      className,
      children,
      onKeyPress,
    } = this.props;
    const propsChildren = children.props;
    return (
      <label htmlFor={ name } className={ styles.InputLabel }>
        { label }
        <input
          data-testid={ dataTestId }
          type={ type }
          className={ className }
          id={ name }
          name={ name }
          onChange={ onInputChange }
          value={ value }
          placeholder={ placeHolder }
          onKeyPress={ onKeyPress }
        />
        {children && children.type === 'img' && (
          <img
            { ...propsChildren }
            alt="profile"
          />
        ) }
      </label>
    );
  }
}

Input.defaultProps = {
  type: 'text',
  children: {},
  placeHolder: '',
  label: '',
  className: '',
  onKeyPress: () => {},
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  dataTestId: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  onKeyPress: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};
