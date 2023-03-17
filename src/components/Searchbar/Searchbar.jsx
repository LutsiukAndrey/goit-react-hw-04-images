import React, { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ handleFormSubmit }) => {
  const [photo, setPhoto] = useState('');

  const onInput = event => {
    setPhoto(event.currentTarget.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    if (photo === '') {
      return;
    }
    handleFormSubmit(photo);
    setPhoto('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={onSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={onInput}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          value={photo}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
