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
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf

      this.setState((state) => ({
        books: state.books.filter((m) => m.id !== book.id).concat(book).sort(sortBy('title'))
      }))
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/static/search" component={Static.Search} />
        <Route path="/static/List" component={Static.List} />
        <Route path="/search" render={() => (
          <Search books={this.state.books} onUpdateBook={this.updateBook} />
        )}/>
        <Route exact path="/" render={() => (
          <List books={this.state.books} onUpdateBook={this.updateBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
