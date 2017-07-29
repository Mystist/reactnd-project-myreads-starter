import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery(query) {
    this.setState({ 'query': query })
  }

  render() {
    const { books, onUpdateBook } = this.props
    const { query } = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/List" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.currentTarget.value)}
            />
          </div>
        </div>
        {showingBooks && (
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map((book) => (
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
