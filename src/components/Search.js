import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
import MOVIE_DATA from '../data/movie-data.json';
import axios  from 'axios'

class Search extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            error: null
        }

    }

    movieSearchCallback = (title) => {
        console.log(title)
        const getURL = 'http://localhost:3002/'
        axios.get(getURL, {
            params: {
              query: title.title
            }
        })
            .then((response) => {
                console.log(response.data)
                const movies = response.data.map((movie) => {
                    const movieResult = {
                        title: movie.title,
                        overview: movie.overview,
                        image_url: movie.image_url,
                        release_date: movie.release_date,
                        external_id: movie.external_id
                    }
                    return movieResult
                })
                this.setState({ movies });
            })
            .catch((error) => {
                this.setState({error: error.message });
            })
    }

    render() {
        return (
            <div>
                <SearchForm movieSearchCallback={this.movieSearchCallback} />
                <SearchResults movieData={this.state.movies} />
            </div>
        );
    }
}

export default Search