import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import styles from './styles.module.css';

export default class Favorites extends Component {
  render() {
    const {
      isLoadingAlbum: isLoading,
      favoriteList,
    } = this.props;

    return (
      <div data-testid="page-favorites" className={ styles.FavoritesContainer }>
        <Header { ...this.props } />
        <h3>Músicas favoritas:</h3>
        { isLoading ? <Loading className={ styles.Loading } /> : (
          <main className={ styles.Main }>
            {favoriteList.map((obj) => (
              <MusicCard
                key={ obj.trackId }
                trackId={ obj.trackId }
                { ...obj }
                { ...this.props }
                checked={ favoriteList.some(({ trackId }) => trackId === obj.trackId) }
              >
                <img
                  className={ styles.TagImg }
                  src={ obj.artworkUrl100 }
                  alt={ obj.trackName }
                />
              </MusicCard>
            ))}
          </main>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  favoriteList: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoadingAlbum: PropTypes.bool.isRequired,
};
