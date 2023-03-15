import React from 'react';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import { fetchPhotos } from 'Api/api';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends React.Component {
  state = {
    photoArr: [],
    modalOpen: false,
    status: 'idle',
    query: '',
    perPage: 12,
    page: 1,
    total: 0,
    modalImg: null,
  };
  toggleModal = e => {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen,
    }));
  };
  handleImgClick = src => {
    this.setState({ modalImg: src });
    this.toggleModal();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.photoQuery !== this.props.photoQuery) {
      this.setState({ status: 'pending' });
      this.setState({ page: 1 });
    }
    if (
      prevState.query !== this.props.photoQuery ||
      prevState.page !== this.state.page
    ) {
      const resolt = await fetchPhotos(
        this.props.photoQuery,
        this.state.page,
        this.state.perPage
      );

      this.setState({
        query: this.props.photoQuery,
        photoArr: [...resolt.hits],
        status: 'resolved',
        total: resolt.total,
      });

      if (prevState.page !== this.state.page) {
        this.setState({
          photoArr: [...this.state.photoArr, ...resolt.hits],
        });
      }

      if (resolt.hits.length === 0 && this.state.photoArr.length === 0) {
        this.setState({ status: 'reject' });
      }
    }
  }
  pagination = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    if (this.state.status === 'pending') {
      return <Loader />;
    }

    if (this.state.status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {this.state.photoArr.map((image, inx) => {
              return (
                <ImageGalleryItem
                  key={nanoid()}
                  id={image.id}
                  imageLink={image.webformatURL}
                  imagAlt={image.tags}
                  // largeImageURL={image.largeImageURL}
                  onClick={() => {
                    this.handleImgClick(image.largeImageURL);
                  }}
                />
              );
            })}
          </ul>
          {Math.floor(this.state.total / this.state.perPage) >
          this.state.page - 1 ? (
            <Button pagination={this.pagination} />
          ) : (
            ''
          )}
          {this.state.modalOpen && (
            <Modal
              modaiImg={this.state.modalImg}
              toggleModal={this.toggleModal}
            />
          )}
        </>
      );
    }
    if (this.state.status === 'reject') {
    }
  }
}

ImageGallery.propTypes = {
  photoQuery: PropTypes.string,
};
