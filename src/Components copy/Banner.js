import axios from "axios";
import React, { Component } from "react";
export default class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    let data = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=f060fa0e9f765c858800f34492b77418"
    );

    this.setState({
      movies: [...data.data.results],
    });
  }

  render() {
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          // <!-- Carousel wrapper -->
          <div
            id="carouselBasicExample"
            className="carousel slide carousel-fade"
            data-mdb-ride="carousel"
          >
            {/* <!-- Indicators --> */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-mdb-target="#carouselBasicExample"
                data-mdb-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-mdb-target="#carouselBasicExample"
                data-mdb-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-mdb-target="#carouselBasicExample"
                data-mdb-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            {/* <!-- Inner --> */}
            <div className="carousel-inner">
              {/* <!-- Single item --> */}
              <div className="carousel-item active">
                <img
                  src={`https://image.tmdb.org/t/p/original/${this.state.movies[0].backdrop_path}`}
                  className="d-block w-100"
                  alt="Sunset Over the City"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="display-3">{this.state.movies[0].title}</h5>
                  <p className="lead" style={{ fontSize: "25px" }}>
                    {this.state.movies[0].overview}
                  </p>
                </div>
              </div>

              {/* <!-- Single item --> */}
              <div className="carousel-item">
                <img
                  src={`https://image.tmdb.org/t/p/original/${this.state.movies[1].backdrop_path}`}
                  className="d-block w-100"
                  alt="Sunset Over the City"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="display-3">{this.state.movies[1].title}</h5>
                  <p className="lead" style={{ fontSize: "25px" }}>
                    {this.state.movies[1].overview}
                  </p>
                </div>
              </div>

              {/* <!-- Single item --> */}
              <div className="carousel-item">
                <img
                  src={`https://image.tmdb.org/t/p/original/${this.state.movies[2].backdrop_path}`}
                  className="d-block w-100"
                  alt="Sunset Over the City"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="display-3">{this.state.movies[2].title}</h5>
                  <p className="lead" style={{ fontSize: "25px" }}>
                    {this.state.movies[2].overview}
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Inner --> */}

            {/* <!-- Controls --> */}
            <button
              className="carousel-control-prev"
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          // <!-- Carousel wrapper -->
        )}
      </>
    );
  }
}
