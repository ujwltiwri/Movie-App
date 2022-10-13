import React, { Component } from "react";
import axios from "axios";
export default class List extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      currPage: 1,
      hover: "",
      favourites: [],
      // favourites: JSON.parse(localStorage.getItem("movies")), //[],  // id of movies
      fav: [],
      // checkfav: JSON.parse(localStorage.getItem("movies")).map(
      //   (movieObj) => movieObj.id
      // ),
    };
  }

  async componentDidMount() {
    let data = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=1"
    );
    this.setState({
      movies: [...data.data.results],
    });
  }

  handlePrevPage = () => {
    if (this.state.currPage > 1) {
      this.setState({
        currPage: this.state.currPage - 1,
      });
    }
  };

  handleNextPage = () => {
    this.setState({
      currPage: this.state.currPage + 1,
    });
  };

  handleEnter = (id) => {
    this.setState({
      hover: id,
    });
  };

  handleLeave = () => {
    this.setState({
      hover: "",
    });
  };

  handleFavourites = (movieObj) => {
    let fav = JSON.parse(localStorage.getItem("movies")) || [];

    if (this.state.favourites.includes(movieObj.id)) {
      //if id already present -> remove
      fav = fav.filter((movie) => movie.id != movieObj.id);
    } else {
      //add the movie
      fav.push(movieObj);
    }

    localStorage.setItem("movies", JSON.stringify(fav));
    let tempData = fav.map((movieObj) => movieObj.id);
    this.setState({
      favourites: [...tempData],
    });
  };

  async componentDidUpdate() {
    let data = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=${this.state.currPage}`
    );
    this.setState({
      movies: [...data.data.results],
    });
  }

  render() {
    let checkfav = JSON.parse(localStorage.getItem("movies")) || [];
    checkfav = checkfav.map((movie) => movie.id);
    return (
      <>
        <h1 className="display-4 mt-3 mb-3 d-flex justify-content-center">
          Latest Movies
        </h1>
        {this.state.movies.length == 0 ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => {
                return (
                  <div
                    className="card movie-card"
                    key={movieObj.id}
                    onMouseEnter={() => this.handleEnter(movieObj.id)}
                    onMouseLeave={this.handleLeave}
                  >
                    <div
                      className="bg-image hover-overlay ripple"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        className="card-img-top movie-img"
                      />
                      <p className="card-title movie-title lead">
                        {movieObj.title}
                      </p>
                      {this.state.hover == movieObj.id && (
                        <div
                          className="button-wrapper"
                          onClick={() => this.handleFavourites(movieObj)}
                        >
                          <a className="btn btn-danger favourite">
                            {/* Add To Favorites */}
                            {!checkfav.includes(movieObj.id)
                              ? `Add to Favourites`
                              : `Remove From Favourites`}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Pagination */}
            <nav aria-label="...">
              <ul className="pagination">
                <li
                  className="page-item disabled"
                  onClick={this.handlePrevPage}
                >
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    {this.state.currPage}{" "}
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li className="page-item" onClick={this.handleNextPage}>
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </>
    );
  }
}
