import { React, useState } from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ data }) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const toggleModal = e => {
    setmodalOpen(!modalOpen);
  };

  const handleImgClick = src => {
    setModalImg(src);
    toggleModal();
  };

  return (
    <>
      <ul className={s.ImageGallery}>
        {data.map(image => {
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
      {modalOpen && <Modal modaiImg={modalImg} toggleModal={toggleModal} />}
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
