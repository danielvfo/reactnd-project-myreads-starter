import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  refresh = (query) => {
    this.searchBooks(query);
  }

  async searchBooks(query) {
    this.setState({query});
    let books = [];
    await BooksAPI.search(query).then((searchedBooks) => {
      books = searchedBooks;
    });
    this.getWholeBooks(books, query);
  }

  getWholeBooks(books, query) {
    this.setState({ books: [] })
    if (query) {
      books.forEach((book) => {
        BooksAPI.get(book.id).then((item) => {
          this.setState(prevState => ({
            books: prevState.books.concat([ item ])
          }))
        });
      });
    }
  }

  listBooks(books) {
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            onUpdateBook={this.props.onUpdateBook}
            query={this.state.query}
            refresh={this.refresh}
          />
        ))}
      </ol>
    )
  }

  render() {
    const {books} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="600" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.searchBooks(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          {books.length > 0 && this.listBooks(books)}
        </div>
      </div>
    )
  }
}

export default SearchBooks;
