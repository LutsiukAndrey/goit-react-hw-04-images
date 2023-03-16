import React, { useRef, useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ modaiImg, toggleModal }) => {
  const overlay = useRef();

  useEffect(() => {
    overlay.current.focus();
  }, []);

  return (
    <div
      ref={overlay}
      tabIndex={-1}
      onKeyDown={event => {
        if (event.code !== 'Escape') {
          return;
        }
        toggleModal();
      }}
      className={s.backdrop}
      onClick={e => {
        if (e.target.nodeName !== 'DIV') {
          return;
        }
        toggleModal(e);
      }}
    >
      <div className={s.Modal}>
        <img src={modaiImg} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modaiImg: PropTypes.string,
  toggleModal: PropTypes.func,
};
