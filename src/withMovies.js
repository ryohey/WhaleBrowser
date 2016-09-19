import React, { Component } from "react"
import MovieStore from "./MovieStore"

export default function withMovies(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        movies: []
      }
      this.movieStore = new MovieStore("G:\\Program Files\\WhiteBrowser", "db", {
        width: 200,
        height: 150,
        column: 3,
        row: 1
      })
    }

    componentDidMount() {
      this.movieStore.onChange(movies => {
        this.setState({ movies })
      })
    }

    render() {
      return <WrappedComponent {...this.props}
        movieStore={this.movieStore}
        movies={this.state.movies} />
    }
  }
}
