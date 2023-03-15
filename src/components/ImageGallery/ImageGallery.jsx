import { React, useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { fetchPhotos } from 'Api/api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ImageGallery = ({ photoQuery }) => {
  const [photoArr, setphotoArr] = useState([]);
  const [modalOpen, setmodalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (photoQuery) {
      if (!loading) {
        setLoading(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoQuery]);

  useEffect(() => {
    const getPhotos = async () => {
      const resolt = await fetchPhotos(photoQuery, page);
      setQuery(photoQuery);
      setLoading(false);
      if (resolt.total > 0) {
        Notify.success(`There are ${resolt.total} ${photoQuery}s `);
      }
      if (resolt.total === 0) {
        Notify.failure(`There is no ${photoQuery} `);
      }
      setTotal(resolt.total);

      setphotoArr(prev => [...prev, ...resolt.hits]);
    };

    if (loading) {
      if (query !== photoQuery) {
        setphotoArr([]);

        setPage(1);
      }

      getPhotos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const paginationFunc = () => {
    setLoading(true);
    setPage(page => page + 1);
  };

  const toggleModal = e => {
    setmodalOpen(!modalOpen);
  };

  const handleImgClick = src => {
    setModalImg(src);
    toggleModal();
  };

  if (loading) {
    return <Loader />;
  }

  if (!loading) {
    return (
      <>
        <ul className={s.ImageGallery}>
          {photoArr.map(image => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                id={image.id}
                imageLink={image.webformatURL}
                imagAlt={image.tags}
                onClick={() => {
                  handleImgClick(image.largeImageURL);
                }}
              />
            );
          })}
        </ul>

        {total > photoArr.length ? <Button pagination={paginationFunc} /> : ''}

        {modalOpen && <Modal modaiImg={modalImg} toggleModal={toggleModal} />}
      </>
    );
  }
};

ImageGallery.propTypes = {
  photoQuery: PropTypes.string,
};
