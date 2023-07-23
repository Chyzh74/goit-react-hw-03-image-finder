import { Component } from 'react';
import PropTypes from 'prop-types';
// import { createPortal } from 'react-dom';
import { Overlay, ModalImage } from './Modal.styled';

// const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClick);
  }

  handleClick = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  onOverlayClickClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    const { url, alt } = this.props;
    return (
      <Overlay onClick={this.onOverlayClickClose}>
        <ModalImage>
          <img src={url} alt={alt} />
        </ModalImage>
      </Overlay>
    );
  }
  // render() {
  //   const { url, alt } = this.props;
  //   return createPortal(
  //     <Overlay onClick={this.onOverlayClickClose}>
  //       <ModalImage>
  //         <img src={url} alt={alt} />
  //       </ModalImage>
  //     </Overlay>, modalRoot
  //   );
  // }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
