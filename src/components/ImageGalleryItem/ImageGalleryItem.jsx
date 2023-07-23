import { Component } from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryImg src={webformatURL} alt={tags} loading="lazy" />
        </GalleryItem>
        {isModalOpen && (
          <Modal url={largeImageURL} alt={tags} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
