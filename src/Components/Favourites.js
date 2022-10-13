import React, { useState, useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";

const Favourites = () => {
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [allGenre, setAllGenre] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genre");
  const [searchText, setSearchText] = useState("");
  const [pageLimit, setPageLimit] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    // Filling Genre Array
    let genre = [];
    movies.map((movieObj) => {
      if (!genre.includes(genreId[movieObj.genre_ids[0]])) {
        genre.push(genreId[movieObj.genre_ids[0]]);
      }
    });

    genre.unshift("All Genre");

    setAllGenre([...genre]);
  }, []);

  let handleDelete = (id) => {
    let moviesArr;
    moviesArr = movies.filter((movieObj) => movieObj.id !== id);

    setMovies([...moviesArr]);
    localStorage.setItem("movies", JSON.stringify(moviesArr));

    // Handling Notification
    const notification = {
      title: "Deleted!",
      message: "Movie Successfully Deleted",
      type: "success",
      insert: "top",
      container: "top-right",
    };

    Store.addNotification({
      ...notification,
      type: "danger",
      animationIn: ["animate__animated animate__flipInX"],
      animationOut: ["animate__animated animate__flipOutX"],
    });
  };

  const sortPopularityAsc = () => {
    let allMovies = movies;
    allMovies.sort((objA, objB) => {
      return objA.popularity - objB.popularity;
    });

    setMovies([...allMovies]);
  };

  const sortPopularityDesc = () => {
    let allMovies = movies;
    allMovies.sort((objA, objB) => {
      return objB.popularity - objA.popularity;
    });

    setMovies([...allMovies]);
  };

  const handleRatingAsc = () => {
    let allMovies = movies;

    allMovies.sort((objA, objB) => {
      return objA.vote_average - objB.vote_average;
    });

    setMovies([...allMovies]);
  };

  const handleRatingDesc = () => {
    let allMovies = movies;

    allMovies.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average;
    });

    setMovies([...allMovies]);
  };

  let filteredMovies = movies;

  if (!searchText == "") {
    filteredMovies = filteredMovies.filter((movieObj) =>
      movieObj.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  if (currGenre !== "All Genre") {
    filteredMovies = filteredMovies.filter(
      (movieObj) => genreId[movieObj.genre_ids[0]] == currGenre
    );
  }

  //Handle Pagination
  let numOfPages = Math.ceil(filteredMovies.length / pageLimit);
  let pagesArr = []; //this array is to get start index and end index as per num of pages
  for (let i = 1; i <= numOfPages; i++) {
    pagesArr.push(i);
  }

  let si = (currPage - 1) * pageLimit;
  let ei = si + pageLimit;
  filteredMovies = filteredMovies.slice(si, ei);

  return (
    <div className="container-fluid p-5">
      <ReactNotifications />
      <div className="row mt-3">
        <ul className="list-group list-group-light col-md-3">
          {allGenre.map((genreName, idx) => {
            return genreName === currGenre ? (
              <li
                className="list-group-item px-3 border-0 active"
                aria-current="true"
                key={idx}
              >
                {genreName}
              </li>
            ) : (
              <li
                className="list-group-item px-3 border-0"
                onClick={(e) => setCurrGenre(e.target.innerHTML)}
                key={idx}
              >
                {genreName}
              </li>
            );
          })}
        </ul>
        <li className="col-md-1" style={{ listStyleType: "none" }}></li>
        <div className="col-md-8">
          <div className="search mb-4 row">
            <div className="input-group col-auto">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="button" className="btn btn-outline-primary">
                search
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                className="form-control col-auto"
                type="number"
                name=""
                value={pageLimit}
                onChange={(e) => setPageLimit(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="table-responsive">
            {movies.length == 0 ? (
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <table className="table table-striped table-hover table-bordered ">
                <thead className="bg-dark text-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">
                      <i
                        className="fa-solid fa-sort-up"
                        onClick={sortPopularityAsc}
                      ></i>{" "}
                      Popularity{" "}
                      <i
                        className="fa-solid fa-sort-down"
                        onClick={sortPopularityDesc}
                      ></i>
                    </th>
                    <th scope="col">
                      <i
                        className="fa-solid fa-sort-up"
                        onClick={handleRatingAsc}
                      ></i>{" "}
                      Rating{" "}
                      <i
                        className="fa-solid fa-sort-down"
                        onClick={handleRatingDesc}
                      ></i>
                    </th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map((movieObj, idx) => {
                    return (
                      <tr key={movieObj.id}>
                        <td>{idx + 1}</td>
                        <td>
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
                            onClick={() => handleDelete(movieObj.id)}
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
          <nav aria-label="...">
            <ul className="pagination">
              {pagesArr.map((pageNum, idx) => {
                return pageNum == currPage ? (
                  <li
                    className="page-item active"
                    onClick={() => setCurrPage(pageNum)}
                    key={idx}
                  >
                    <a className="page-link">{pageNum}</a>
                  </li>
                ) : (
                  <li
                    className="page-item"
                    onClick={() => setCurrPage(pageNum)}
                    key={idx}
                  >
                    <a className="page-link">{pageNum}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

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

export default Favourites;
