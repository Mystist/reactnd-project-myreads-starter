import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import _ from 'lodash'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery(query) {
    this.setState({ 'query': query })

    if (!query) {
      this.setState({ books: [] })
      return
    }

    this.search(query)
  }

  search = _.debounce((query) => {
    BooksAPI.search(query, 100).then((books) => {
      if (this.state.query && books instanceof Array && books.length > 0) {
        this.setState({ books: books.map((m) => this.props.books.find((o) => o.id === m.id) || m).sort(sortBy('title')) })
      } else {
        this.setState({ books: [] })
      }
    })
  }, 700)

  render() {
    const { onUpdateBook } = this.props
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.currentTarget.value)}
            />
          </div>
        </div>
        {books.length > 0 && (
          <div className="search-books-results">
            <ol className="books-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <Book book={book} onUpdateBook={onUpdateBook} />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    )
  }
}

export default Search
