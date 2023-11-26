import React, { Component } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import CustomLoader from "./CustomLoader";
import Modal from "./Modal";

class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    largeImageURL: "",
    showModal: false,
    isLoading: false,
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.fetchImages
    );
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: "", showModal: false });
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImages();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.setState({ showModal: false });
    }
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = "40627686-9640a27f07dc80035c86fc9a3";

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then((response) => {
        const totalHits = response.data.totalHits;
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          loadMore: prevState.page < Math.ceil(totalHits / 12),
        }));
      })
      .catch((error) => console.error("Error fetching images:", error))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const {
      images,
      showModal,
      largeImageURL,
      isLoading,
      loadMore,
    } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <CustomLoader />}

        {loadMore && <Button onClick={this.handleLoadMore}>Load more</Button>}

        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
