import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavigateBeforeSharpIcon from '@mui/icons-material/NavigateBeforeSharp';
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SearchIcon from '../../assets/search-icon.svg';
import styles from './styles.module.css';

export default class Search extends Component {
  handleLeftArrow = () => {
    const { scrollX, updateState } = this.props;
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    updateState('scrollX', x);
  }

  handleRightArrow = (WIDTH_EACH_CARD) => {
    const { scrollX, updateState, albums, isMobile } = this.props;
    const WIDTH_SCREEN_HD = 768;
    const isSmallerScreen = window.innerWidth < WIDTH_SCREEN_HD;
    const listWidth = albums.length * WIDTH_EACH_CARD;
    const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    let x = scrollX - Math.round(window.innerWidth / 2);

    if (regex.test(navigator.userAgent)) {
      updateState('isMobile', true);
    }

    if ((window.innerWidth - listWidth) > x) {
      const LOWER_NUM = 40;
      const HIGHER_NUM = 60;
      x = (window.innerWidth - listWidth) - ((isSmallerScreen || isMobile)
        ? LOWER_NUM : HIGHER_NUM);
    }

    updateState('scrollX', x);
  }

  handleKeyDown = (event) => {
    const element = event.target;
    if (event.key === 'ArrowLeft'
      || (event.key === 'Enter' && element.className.match(/AlbumRowLeft/g))) {
      handleLeftArrow();
    }
    if (event.key === 'ArrowRight'
      || (event.key === 'Enter' && element.className.match(/AlbumRowRight/g))) {
      handleRightArrow();
    }
  }

  render() {
    const {
      isLoading,
      searchInput,
      seachQuery,
      onInputChange,
      albums,
      isQueried,
      scrollX,
    } = this.props;
    const WIDTH_EACH_CARD = 200;

    return (
      <div data-testid="page-search">
        <Header { ...this.props } />
        <main>
          {!isLoading && (
            <div className={ styles.SearchContainer }>
              <Input
                name="searchInput"
                className={ styles.SearchInput }
                placeHolder="Nome do Artista"
                dataTestId="search-artist-input"
                onInputChange={ onInputChange }
                value={ searchInput }
              >
                <img
                  src={ SearchIcon }
                  className={ styles.SearchIcon }
                  alt="search icon"
                />
              </Input>

              <Button
                label="Procurar"
                { ...this.props }
              />
            </div>
          )}
          {isQueried && albums && Object.values(albums[0]).length > 0 && (
            <h3 className={ styles.SearchAnswerTitle }>
              Resultado de álbuns de:
              {' '}
              {seachQuery}
            </h3>
          )}
          {isQueried && albums && Object.values(albums[0]).length === 0
            ? <h3 className={ styles.SearchAnswerTitle }>Nenhum álbum foi encontrado</h3>
            : (
              <div
                className={ styles.SearchCardContainer }
                style={ {
                  marginLeft: scrollX,
                  width: albums.length * WIDTH_EACH_CARD,
                } }
              >
                <div
                  className={ `${styles.AlbumRowLeft} ${isQueried ? '' : styles.Hide}` }
                  role="button"
                  aria-label="Left arrow"
                  tabIndex={ 0 }
                  onClick={ this.handleLeftArrow }
                  onKeyDown={ this.handleKeyDown }
                >
                  <NavigateBeforeSharpIcon style={ { fontSize: 50 } } />
                </div>
                <div
                  className={ `${styles.AlbumRowRight} ${isQueried ? '' : styles.Hide}` }
                  role="button"
                  aria-label="Right arrow"
                  tabIndex={ 0 }
                  onClick={ () => this.handleRightArrow(WIDTH_EACH_CARD) }
                  onKeyDown={ this.handleKeyDown }
                >
                  <NavigateNextSharpIcon style={ { fontSize: 50 } } />
                </div>
                {Object.values(albums[0]).length > 0 && albums.map((album) => (
                  <Link
                    key={ album.collectionId }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <div className={ styles.SearchCard }>
                      <img
                        src={ album.artworkUrl100.replace('100x100', '200x200') }
                        alt={ album.artistName }
                      />
                      <div>
                        <h3>
                          { album.collectionName }
                        </h3>
                        <p>
                          { album.artistName }
                        </p>
                      </div>

                    </div>
                  </Link>
                ))}
              </div>
            )}
        </main>
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isQueried: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  seachQuery: PropTypes.string.isRequired,
  scrollX: PropTypes.number.isRequired,
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateState: PropTypes.func.isRequired,
};
