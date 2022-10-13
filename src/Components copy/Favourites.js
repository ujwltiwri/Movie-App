import React, { Component } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
let genreId = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: JSON.parse(localStorage.getItem("movies")) || [],
      allGenre: [],
      currGenre: "All Genre",
      searchedMovies: [],
      filteredMovies: JSON.parse(localStorage.getItem("movies")),
      searchKey: "",
    };
  }

  async componentDidMount() {
    let data = JSON.parse(localStorage.getItem("movies"));

    // let genreId = {
    //   28: "Action",
    //   12: "Adventure",
    //   16: "Animation",
    //   35: "Comedy",
    //   80: "Crime",
    //   99: "Documentary",
    //   18: "Drama",
    //   10751: "Family",
    //   14: "Fantasy",
    //   36: "History",
    //   27: "Horror",
    //   10402: "Music",
    //   9648: "Mystery",
    //   10749: "Romance",
    //   878: "Sci-Fi",
    //   10770: "TV",
    //   53: "Thriller",
    //   10752: "War",
    //   37: "Western",
    // };

    let genre = [];

    data.map((movieObj) => {
      if (!genre.includes(genreId[movieObj.genre_ids[0]])) {
        genre.push(genreId[movieObj.genre_ids[0]]);
      }
    });

    genre.unshift("All Genre");

    this.setState({
      movies: [...data],
      allGenre: [...genre],
    });
  }

  handleGenre = (e) => {
    let clickedGenre = e.target.innerHTML;

    this.setState((prevState) => ({
      currGenre: clickedGenre,
      filteredMovies:
        clickedGenre === "All Genre"
          ? prevState.movies
          : prevState.movies.filter(
              (movieObj) => genreId[movieObj.genre_ids[0]] == clickedGenre
            ),
    }));
  };

  handleSearch = (e) => {
    let currValue = e.target.value?.trim();
    if (!currValue) {
      this.setState((prevState) => ({
        searchKey: currValue,
        filteredMovies:
          prevState.currGenre === "All Genre"
            ? prevState.movies
            : prevState.movies.filter(
                (movieObj) =>
                  genreId[movieObj.genre_ids[0]] == prevState.currGenre
              ),
      }));
    } else {
      this.setState(
        {
          searchKey: currValue,
          filteredMovies: this.state.filteredMovies.filter((movieObj) =>
            movieObj.title.toLowerCase().includes(currValue.toLowerCase())
          ),
        },
        () => null
      );
    }
  };

  handleDelete = (id) => {
    let tempData = this.state.movies.filter((movieObj) => movieObj.id !== id);

    localStorage.setItem("movies", JSON.stringify(tempData));

    this.setState({
      movies: [...tempData],
    });

    this.notification = {
      title: "Deleted!",
      message: "Movie Successfully Deleted",
      type: "success",
      insert: "top",
      container: "top-right",
    };

    Store.addNotification({
      ...this.notification,
      type: "danger",
      animationIn: ["animate__animated animate__flipInX"],
      animationOut: ["animate__animated animate__flipOutX"],
    });
  };

  render() {
    const { filteredMovies } = this.state;

    // let filteredMovies = [];
    /* For filtering on genre */
    // if (this.state.currGenre == "All Genre") {
    //   filteredMovies = this.state.movies;
    // } else {
    //   filteredMovies = this.state.movies.filter(
    //     (movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre
    //   );
    // }

    // if (this.state.searchedMovies.length == 0) {
    //   filteredMovies = this.state.movies;
    // } else {
    //   filteredMovies = this.state.searchedMovies;
    // }
    /* For Filtering on Search Input */

    return (
      <>
        <ReactNotifications />
        <div className="container-fluid p-5">
          <div className="row mt-3">
            <div className="list-group list-group-light col-md-3">
              {this.state.allGenre.map((genreName, id) => {
                return genreName == this.state.currGenre ? (
                  <a
                    href="#"
                    className="list-group-item list-group-item-action px-3 border-0 ripple active"
                    aria-current="true"
                    key={id}
                  >
                    {this.state.currGenre}
                  </a>
                ) : (
                  <a
                    href="#"
                    className="list-group-item list-group-item-action px-3 border-0"
                    key={id}
                    onClick={this.handleGenre}
                  >
                    {genreName}
                  </a>
                );
              })}
            </div>
            <li className="col-md-1" style={{ listStyleType: "none" }}></li>
            <div className="col-md-8">
              <div className="search mb-4 row">
                <div className="input-group col-auto">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search..."
                    aria-label="Search"
                    value={this.state.searchKey}
                    aria-describedby="search-addon"
                    onChange={this.handleSearch}
                  />
                  <button type="button" className="btn btn-outline-primary">
                    search
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    className="form-control col-auto"
                    type="text"
                    name=""
                    value="5"
                  />
                </div>
              </div>
              <div className="table-responsive">
                {this.state.movies.length == 0 ? (
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <table className="table table-striped table-hover table-bordered ">
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Rating</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMovies.map((movieObj, idx) => {
                        return (
                          <tr style={{ textAlign: "center" }} key={movieObj.id}>
                            <td>{idx + 1}</td>
                            <td style={{ textAlign: "left" }}>
                              <img
                                src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                                alt=""
                                style={{
                                  width: "150px",
                                  marginRight: "20px",
                                }}
                              />
                              {movieObj.title}
                            </td>
                            <td>{genreId[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(movieObj.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              {/* Pagination */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
