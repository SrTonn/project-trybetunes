import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import SearchIcon from '../../assets/search-icon.svg';
import './index.css';

export default class Search extends Component {
  render() {
    const { isLoading, searchInput, onInputChange } = this.props;
    return (
      <div data-testid="page-search">
        <Header { ...this.props } />
        <main>
          {!isLoading && (
            <div className="search-container">
              <Input
                name="searchInput"
                className="search-input"
                placeHolder="Nome do Artista"
                dataTestId="search-artist-input"
                onInputChange={ onInputChange }
                value={ searchInput }
              >
                <img
                  src={ SearchIcon }
                  className="search-icon"
                  alt="search icon"
                />
              </Input>

              <Button
                label="Procurar"
                { ...this.props }
              />
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
  onInputChange: PropTypes.func.isRequired,
};
