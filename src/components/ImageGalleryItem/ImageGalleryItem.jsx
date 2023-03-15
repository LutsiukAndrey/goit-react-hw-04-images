import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ imageLink, imagAlt, id, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img
        className={s.ImageGalleryItemImage}
        src={imageLink}
        alt={imagAlt}
        id={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageLink: PropTypes.string,
  imagAlt: PropTypes.string,
  id: PropTypes.number,
  onClick: PropTypes.func,
};
