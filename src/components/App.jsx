import React, { Component } from "react";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import CustomLoader from "./CustomLoader";
import Modal from "./Modal";
import { getImg } from "services/api";

class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    largeImageURL: "",
    tags: "",
    showModal: false,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await getImg(query, page);

      if (hits.length === 0) {
        return alert("Don't found");
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
        loadMore: prevState.page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ largeImageURL, showModal: true, tags });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: "", tags: "", showModal: false });
  };

  render() {
    const {
      images,
      showModal,
      largeImageURL,
      tags,
      isLoading,
      loadMore,
      error,
    } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchSubmit} />

        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}

        {error && <p>Something went wrong...</p>}

        {isLoading && <CustomLoader />}

        {loadMore && !isLoading && images.length > 0 && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
