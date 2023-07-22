import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button.styled';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { galleryApi } from './services/api';


export class App extends Component {
  state = {
    value: '',
    page: 1,
    perPage: 12,
    totalPages: 0,
    images: [],
    error: null,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { value, page, perPage } = this.state;
    if (page !== prevState.page || value !== prevState.value) {
      this.setState({ isLoading: true });
      try {
        const response = await galleryApi({ value, page, perPage });
        console.log(response);
        if (response.totalHits === 0) {
          toast.error(`Sorry, no photo from ${value}`);
          this.setState({ isLoading: true });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalPages: Math.ceil(response.totalHits / perPage),
          error: null,
        }));
      } catch (error) {
        this.setState({ error: error.message, isLoading: false });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = value => {
    this.setState({ value, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, error, isLoading, totalPages, page } = this.state;
    const showLoadMoreBtn = totalPages > page;

    return (
      <Container>
        <SearchBar onSubmit={this.handleSubmit}></SearchBar>

        {isLoading && <Loader />}

        <ImageGallery images={images} />

        {showLoadMoreBtn && (
          <Button onClick={this.handleLoadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ToastContainer autoClose={3000} theme="colored" />
      </Container>
    );
  }
}
