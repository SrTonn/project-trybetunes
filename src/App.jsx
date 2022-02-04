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

class App extends React.Component {
  state = {
    userName: '',
    isLoading: true,
    searchInput: '',
    isSearchButtonDisabled: true,
  }

  async componentDidMount() {
    const { name } = await getUser();
    this.setState(() => ({
      userName: name,
      isLoading: false,
    }));
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.checkAllConditions);
  }

  updateUser = (login) => {
    this.setState(() => ({
      userName: login,
    }));
  }

  checkAllConditions = () => {
    const { searchInput } = this.state;
    const MIN_CHARACTERES = 2;
    this.setState(() => ({
      isSearchButtonDisabled: searchInput.length < MIN_CHARACTERES,
    }));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={ () => <Login updateUser={ this.updateUser } /> } />
        <Route
          path="/search"
          render={ () => (<Search
            { ...this.state }
            onInputChange={ this.onInputChange }
          />) }
        />
        <Route path="/album/:id" render={ () => <Album { ...this.state } /> } />
        <Route path="/favorites" render={ () => <Favorites { ...this.state } /> } />
        <Route exact path="/profile" render={ () => <Profile { ...this.state } /> } />
        <Route path="/profile/edit" render={ () => <ProfileEdit { ...this.state } /> } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
