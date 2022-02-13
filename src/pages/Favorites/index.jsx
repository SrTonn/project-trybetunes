import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import styles from './styles.module.css';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    isLoading: true,
  }

  componentDidMount = async () => {
    await getFavoriteSongs();
    this.setState({ isLoading: false });
  }

  removeFavorite = async ({ target }) => {
    this.setState({ isLoading: true });
    const { updateState, favoriteList } = this.props;

    const favorite = favoriteList.find((music) => music.trackId === +target.id);
    await removeSong(favorite);

    const updatedList = favoriteList.filter((music) => music.trackId !== +target.id);
    updateState('favoriteList', updatedList);
    this.setState({ isLoading: false });
  }

  render() {
    const { favoriteList } = this.props;
    const { isLoading } = this.state;

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
                onChange={ this.removeFavorite }
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
  updateState: PropTypes.func.isRequired,
};
