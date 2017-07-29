import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'

class List extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateBook } = this.props
    const shelfEnum = {
      'currentlyReading': 'Currently Reading',
      'wantToRead': 'Want to Read',
      'read': 'Read'
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(shelfEnum).map((shelf) => (
            <div className="bookshelf" key={shelf}>
              <h2 className="bookshelf-title">{shelfEnum[shelf]}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter((book) => book.shelf === shelf).map((book) => (
                    <li key={book.id}>
                      <Book book={book} onUpdateBook={onUpdateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default List
