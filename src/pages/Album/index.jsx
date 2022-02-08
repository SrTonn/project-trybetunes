import React, { Component } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import Header from '../../components/Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import styles from './styles.module.css';
import Loading from '../../components/Loading';

export default class Album extends Component {
  componentDidMount = async () => {
    const { match, updateState } = this.props;
    const { id } = match.params;
    const albumList = await getMusics(id);
    const albumListCopy = [...albumList];

    updateState('albumInfo', albumListCopy.shift());
    updateState('albumList', albumListCopy);
  }

  render() {
    const {
      albumInfo: { artistName, collectionName, artworkUrl100 },
      albumList,
      isLoadingAlbum: isLoading,
      favoriteList,
    } = this.props;

    return (
      <div data-testid="page-album">
        <Header { ...this.props } />
        { isLoading ? <Loading /> : (
          <main className={ styles.Main }>
            <section className={ styles.Section }>
              { isLoading ? <Loading className={ styles.Loading } /> : (
                <img
                  src={ artworkUrl100 && artworkUrl100.replace('100x100', '290x290') }
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
                  { ...this.props }
                  checked={ favoriteList.some(({ trackId }) => trackId === obj.trackId) }
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
  isLoadingAlbum: PropTypes.bool.isRequired,
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteList: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateState: PropTypes.func.isRequired,
  albumInfo: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
  match: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ])).isRequired,
};
