import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Header from '../../components/Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import styles from './styles.module.css';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading';

export default class Album extends Component {
  state = {
    albumInfo: '',
    albumList: [],
    favoriteList: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const albumList = await getMusics(id);
    const albumListCopy = [...albumList];

    this.setState(() => ({
      albumInfo: albumListCopy.shift(),
      albumList: albumListCopy,
    }));
  }

  onInputChange = async ({ target }) => {
    const { checked } = target;
    const { albumList } = this.state;
    const trackId = Number(target.id);
    const favorite = albumList.find((music) => music.trackId === trackId);

    this.setState({ isLoading: true }, () => addSong(favorite).then(
      () => {
        this.setState((prev) => ({
          isLoading: false,
          favoriteList: checked ? [...prev.favoriteList, favorite]
            : [...prev.favoriteList.filter((music) => music.trackId !== trackId)],
        }));
      },
    ));
  }

  render() {
    const {
      albumInfo: { artistName, collectionName, artworkUrl100 },
      albumList,
      isLoading,
      favoriteList,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header { ...this.props } />
        { isLoading ? <Loading /> : (
          <main className={ styles.Main }>
            <section className={ styles.Section }>
              { !artworkUrl100 ? <Loading className={ styles.Loading } /> : (
                <img
                  src={ artworkUrl100.replace('100x100', '290x290') }
                  alt={ `${collectionName} cover` }
                />)}
              <h2 data-testid="album-name" className="album-name">
                {collectionName}
              </h2>
              <p data-testid="artist-name" className="artist-name">{artistName}</p>
            </section>
            <aside className={ styles.Aside }>
              {albumList.map((obj) => (
                <MusicCard
                  key={ obj.trackId }
                  { ...obj }
                  { ...this.state }
                  checked={ favoriteList.some(({ trackId }) => trackId === obj.trackId) }
                  onInputChange={ this.onInputChange }
                />
              ))}
            </aside>
          </main>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
};
