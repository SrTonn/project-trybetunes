import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class MusicCard extends Component {
  render() {
    const {
      previewUrl,
      trackName,
      onInputChange,
      trackId,
      checked,
    } = this.props;

    return (
      <div className={ styles.Container }>
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
        <label htmlFor="favorite">

          <input
            id={ trackId }
            name="favorite"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ onInputChange }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};
