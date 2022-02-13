import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class MusicCard extends Component {
  render() {
    const {
      previewUrl,
      trackName,
      handleCheckboxClick,
      trackId,
      checked,
      children,
    } = this.props;

    return (
      <div className={ styles.Container }>
        {children.type === 'img' ? (
          <img
            src={ children.props.src }
            alt={ children.props.alt }
          />
        ) : ''}

        <span className={ styles.Span }>
          {trackName}
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite" className={ styles.Label }>
          <input
            id={ trackId }
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ handleCheckboxClick }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  children: {},
};

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};
