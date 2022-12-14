import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Album from './pages/Album';
import { getUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import { addSong, getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';

class App extends React.Component {
  state = {
    isLoading: true,
    isLoadingAlbum: false,
    isLoadingUser: false,
    searchInput: '',
    seachQuery: '',
    isSearchButtonDisabled: true,
    albums: [{}],
    isQueried: false,
    scrollX: 0,
    isMobile: false,
    albumInfo: {},
    albumList: [],
    favoriteList: [],
    userInfo: {},
  }

  async componentDidMount() {
    const favoriteList = await getFavoriteSongs();
    const userInfo = await getUser();
    userInfo.image = `https://github.com/${userInfo.name}.png`.replace(/\s/g, '-');
    this.setState(() => ({
      userInfo,
      isLoading: false,
      favoriteList,
    }));
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.checkAllConditions);
  }

  updateUser = async () => {
    this.setState({ isLoadingUser: true });
    const userInfo = await getUser();
    userInfo.image = `https://github.com/${userInfo.name}.png`.replace(/\s/g, '-');
    this.setState(() => ({
      userInfo,
      isLoadingUser: false,
    }));
  }

  checkAllConditions = () => {
    const { searchInput } = this.state;
    const MIN_CHARACTERES = 2;
    this.setState(() => ({
      isSearchButtonDisabled: searchInput.length < MIN_CHARACTERES,
    }));
  }

  handleClick = async ({ target }) => {
    const { value } = target.parentNode.querySelector('#searchInput');
    this.setState((prev) => ({
      searchInput: '',
      isSearchButtonDisabled: true,
      seachQuery: prev.searchInput,
      albums: [{}],
    }));
    const albums = await searchAlbumsAPI(value);

    this.setState((prev) => ({
      albums: albums.length ? albums : prev.albums,
      isQueried: true,
    }));
  }

  updateState = (key, value) => {
    this.setState(() => ({
      [key]: value,
    }));
  }

  handleCheckboxClick = async ({ target }) => {
    const { checked } = target;
    const { albumList } = this.state;

    const trackId = Number(target.id);
    const favoriteFromAlbumList = albumList.find((music) => music.trackId === trackId);
    this.updateState('isLoadingAlbum', true);

    if (checked) {
      await addSong(favoriteFromAlbumList);
    } else {
      await removeSong(favoriteFromAlbumList);
    }

    this.setState((prev) => ({
      isLoadingAlbum: false,
      favoriteList: checked ? [...prev.favoriteList, favoriteFromAlbumList]
        : [...prev.favoriteList.filter((music) => music.trackId !== trackId)],
    }));
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => (
            <Login
              { ...this.state }
              updateUser={ this.updateUser }
              updateState={ this.updateState }
            />) }
        />
        <Route
          path="/search"
          render={ (props) => (
            <Search
              { ...props }
              { ...this.state }
              onInputChange={ this.onInputChange }
              handleClick={ this.handleClick }
              updateState={ this.updateState }
              handleCheckboxClick={ this.handleCheckboxClick }
            />
          ) }
        />
        <Route
          path="/album/:id"
          render={ (props) => (
            <Album
              { ...props }
              { ...this.state }
              updateState={ this.updateState }
              handleCheckboxClick={ this.handleCheckboxClick }
            />
          ) }
        />
        <Route
          path="/favorites"
          render={ (props) => (
            <Favorites
              { ...props }
              { ...this.state }
              updateState={ this.updateState }
              handleCheckboxClick={ this.handleCheckboxClick }
            />
          ) }
        />
        <Route
          exact
          path="/profile"
          render={ (props) => (<Profile
            { ...props }
            { ...this.state }
          />) }
        />
        <Route
          path="/profile/edit"
          render={ (props) => (<ProfileEdit
            { ...props }
            { ...this.state }
            updateState={ this.updateState }
          />) }
        />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
