import axios from "axios";
import React, { useState, useEffect } from "react";

const List = () => {
  const [movies, setMovies] = useState([]);
  const [hover, setHover] = useState(null);
  const [favouriteMovies, setFavouriteMovies] = useState(
    localStorage.getItem("movies")
      ? JSON.parse(localStorage.getItem("movies")).map(
          (movieObj) => movieObj.id
        )
      : []
  );

  const [currPage, setCurrPage] = useState(1);

  const fetchData = async () => {
    let data = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=1"
    );
    setMovies([...data.data.results]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let data = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=f060fa0e9f765c858800f34492b77418&language=en-US&page=${currPage}`
      );
      setMovies([...data.data.results]);
    };

    fetchData();
  }, [currPage]);

  const handleEnter = (id) => {
    setHover(id);
  };

  const handleLeave = () => {
    setHover(null);
  };

  const handleFavourites = (movie) => {
    let fav = JSON.parse(localStorage.getItem("movies")) || [];

    if (favouriteMovies.includes(movie.id)) {
      //used favouritesMovies for condition and not fav array -> because for every change we are updating favouritesMovies array and not fav
      //if id already present -> remove
      fav = fav.filter((movieObj) => movieObj.id !== movie.id);
    } else {
      //add the movie
      fav.push(movie);
    }

    localStorage.setItem("movies", JSON.stringify(fav));
    let movieID = fav.map((movieObj) => movieObj.id);
    setFavouriteMovies([...movieID]);
  };

  const handlePrevPage = () => {
    currPage > 1 && setCurrPage(currPage - 1);
    // 2nd Method of writing same logic
    // if (currPage > 1) {
    //   setCurrPage(currPage - 1);
    // }
  };

  const handleNextPage = () => {
    setCurrPage(currPage + 1);
  };

  return (
    <>
      <h1 className="display-4 mt-3 mb-3 d-flex justify-content-center">
        Latest Movies
      </h1>
      {movies.length === 0 ? (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="movies-list">
          {movies.map((movieObj) => {
            return (
              <div
                className="card movie-card"
                key={movieObj.id}
                onMouseEnter={() => handleEnter(movieObj.id)}
                onMouseLeave={handleLeave}
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
                  {hover == movieObj.id && (
                    <div
                      className="button-wrapper"
                      onClick={() => handleFavourites(movieObj)}
                    >
                      <a className="btn btn-danger favourite">
                        {favouriteMovies.includes(movieObj.id)
                          ? `Remove From Favourites`
                          : `Add to Favourites`}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Pagination */}
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item disabled" onClick={handlePrevPage}>
            <a className="page-link">Previous</a>
          </li>
          <li className="page-item active">
            <a className="page-link">{currPage}</a>
          </li>
          <li className="page-item" onClick={handleNextPage}>
            <a className="page-link">Next</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default List;
