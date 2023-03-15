import React from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends React.Component {
  state = {
    photo: '',
  };
  onInput = event => {
    this.setState({ photo: event.currentTarget.value.toLowerCase().trim() });
  };
  onSubmit = event => {
    event.preventDefault();
    if (this.state.photo === '') {
      return;
    }
    this.props.onSubmit(this.state.photo);
    this.setState({ photo: '' });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.onSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.onInput}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.photo}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
