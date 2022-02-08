import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard';
import styles from './styles.module.css';

export default class Album extends Component {
  state = {
    albumInfo: '',
    albumList: [],
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

  render() {
    const {
      albumInfo: { artistName, collectionName, artworkUrl100 },
      albumList } = this.state;

    return (
      <div data-testid="page-album">
        <Header { ...this.props } />
        <main className={ styles.Main }>
          <section className={ styles.Section }>
            <img
              src={ artworkUrl100 && artworkUrl100.replace('100x100', '290x290') }
              alt={ `${collectionName} cover` }
            />
            <h2 data-testid="album-name" className="album-name">
              {collectionName}
            </h2>
            <p data-testid="artist-name" className="artist-name">{artistName}</p>
          </section>
          <aside>
            {albumList && albumList.map((props) => (
              <MusicCard
                key={ props.trackId }
                { ...props }
              />
            ))}
          </aside>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.shape.isRequired,
};
