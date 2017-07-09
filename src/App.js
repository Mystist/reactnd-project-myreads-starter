import React from 'react'
import './App.css'

import * as Static from './Static'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Static.Search />
        <Static.List />
      </div>
    )
  }
}

export default BooksApp
