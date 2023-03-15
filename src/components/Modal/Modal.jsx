import React from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends React.Component {
  handleEscKey = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.toggleModal();
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey);
  }

  render() {
    return (
      <div
        className={s.backdrop}
        onClick={e => {
          if (e.target.nodeName !== 'DIV') {
            return;
          }
          this.props.toggleModal(e);
        }}
      >
        <div className={s.Modal}>
          <img src={this.props.modaiImg} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modaiImg: PropTypes.string,
  toggleModal: PropTypes.func,
};
