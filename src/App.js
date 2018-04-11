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

  updateBook(id, shelf) {
    let dummyBook = {id: id};
    let shelvedBooks = this.state.books.filter(book => book.id !== id);
    BooksAPI.update(dummyBook, shelf).then((book) => {
      this.setState({books: shelvedBooks.concat(book)});
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks
            onUpdateBook={(id, shelf) => {
              this.updateBook(id, shelf);
            }}
            shelfBooks={this.state.books}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={(id, shelf) => {
              this.updateBook(id, shelf);
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
