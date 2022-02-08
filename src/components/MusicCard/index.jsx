import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import styles from './styles.module.css';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName } = this.props;
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
        <Checkbox
          { ...label }
          color="secondary"
          icon={ <FavoriteBorder /> }
          checkedIcon={ <Favorite /> }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};
