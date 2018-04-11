import React from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  updateBook(id, shelf) {
    let book = {id: id};
    BooksAPI.update(book, shelf).then((book) => {
      this.componentDidMount();
    });
  }

  //I had to force the creation of a book object on line 20 beacause I wasn't getting
  //a reponse from the server when trying to get a book by its ID
  // getBookByID(id) {
  //   BooksAPI.get(id).then((book) => {
  //     this.setState({updatedBook: book})
  //   });
  // }

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
