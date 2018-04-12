import React from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }

  updateBook = (id, shelf) => {
    BooksAPI.update({ id }, shelf);
    this.getBooks();
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks
            onUpdateBook={this.updateBook}
            shelfBooks={this.state.books}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
