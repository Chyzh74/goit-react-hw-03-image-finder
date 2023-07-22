import React from 'react';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { Header, ButtonForm, SearchForm, Input } from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
   value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(e);
    if (this.state.value.trim() === '') {
      toast.error("Sorry, the search string can't be empty. Please try again.");
      return;
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <ButtonForm type="submit">
            <FiSearch size="16px" />
          </ButtonForm>
          <Input
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={value}
          />
        </SearchForm>
      </Header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
