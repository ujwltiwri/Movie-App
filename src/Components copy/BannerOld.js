import React, { Component } from "react";
import axios from "axios";
export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    let data = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=f060fa0e9f765c858800f34492b77418&language=en-US"
    );

    this.setState({
      movies: [...data.data.results],
    });
  }

  render() {
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div class="card bg-dark text-white">
            <img
              // src="https://mdbcdn.b-cdn.net/img/new/slides/017.webp"
                src={`https://image.tmdb.org/t/p/original/${this.state.movies[0].backdrop_path}`}
              class="card-img"
              alt="Stony Beach"
            />
            <div class="card-img-overlay">
              <h1 class="card-title display-3">Card title</h1>
              <p class="card-text lead">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">Last updated 3 mins ago</p>
            </div>
          </div>
        )}
      </>
    );
  }
}
