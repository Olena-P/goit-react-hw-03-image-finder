import React, { Component } from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
  state = { query: "" };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    if (query.trim() === "") {
      return alert("Can not be empty");
    }
    this.props.onSubmit(query);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button className="SearchForm-button" type="submit">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

// import React, { useState } from "react";
// import PropTypes from "prop-types";

// const SearchBar = ({ onSubmit }) => {
//   const [query, setQuery] = useState("");

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSubmit(query);
//   };

//   return (
//     <header className="Searchbar">
//       <form className="SearchForm" onSubmit={handleSubmit}>
//         <button className="SearchForm-button" type="submit">
//           <span className="SearchForm-button-label">Search</span>
//         </button>

//         <input
//           className="SearchForm-input"
//           type="text"
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           value={query}
//           onChange={handleChange}
//         />
//       </form>
//     </header>
//   );
// };

// SearchBar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default SearchBar;
