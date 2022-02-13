import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles.module.css';

export default class MusicCard extends Component {
  render() {
    const {
      previewUrl,
      trackName,
      onChange,
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
        <label htmlFor={ trackId } className={ styles.Label }>
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ onChange }
            checked={ checked }
          />
          <span className={ styles.TestTrybe }>Favorita</span>
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
  onChange: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
};
