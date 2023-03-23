import React, { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import { Container } from './Container/Container';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPhotos } from 'Api/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [photoArr, setphotoArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setphotoArr([]);
    setLoading(true);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getPhotos = async () => {
      const resolt = await fetchPhotos(query, page);

      if (resolt.total > 0) {
        Notify.success(`There are ${resolt.total} ${query}s `);
        setLoading(false);
      }

      if (resolt.total === 0) {
        Notify.failure(`There is no ${query} `);
        setLoading(false);
      }

      setTotal(resolt.total);

      setphotoArr(prev => [...prev, ...resolt.hits]);
    };

    getPhotos();
  }, [query, page]);
  const paginationFunc = () => {
    setLoading(true);
    setPage(page => page + 1);
  };

  return (
    <div>
      <Container>
        <Searchbar handleFormSubmit={handleFormSubmit} />
        {loading ? <Loader /> : <ImageGallery data={photoArr} />}
        {total > photoArr.length ? <Button pagination={paginationFunc} /> : ''}
      </Container>
    </div>
  );
};
