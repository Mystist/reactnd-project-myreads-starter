import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'
import * as Static from './Static'
import Search from './Search'
import List from './List'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books.sort(sortBy('title')) })
    })
  }
  updateBook = (book) => {
    this.setState((state) => ({
      books: state.books.map((m) => m.id === book.id ? book : m).sort(sortBy('title'))
    }))

    BooksAPI.update(book, book.shelf)
  }
  render() {
    return (
      <div className="app">
        <Route path="/static/search" component={Static.Search} />
        <Route path="/static/List" component={Static.List} />
        <Route path="/search" render={() => (
          <Search books={this.state.books} onUpdateBook={this.updateBook} />
        )}/>
        <Route path="/list" render={() => (
          <List books={this.state.books} onUpdateBook={this.updateBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
