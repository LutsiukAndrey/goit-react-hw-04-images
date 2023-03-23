import React, { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ handleFormSubmit }) => {
  const [qwery, setQwery] = useState('');

  const onInput = event => {
    setQwery(event.currentTarget.value);
  };
  const onSubmit = event => {
    event.preventDefault();
    if (qwery === '') {
      return;
    }
    handleFormSubmit(qwery);
    setQwery('');
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
          value={qwery}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
