import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    searchedBooks: []
  }

  searchBooks(query) {
    BooksAPI.search(query).then((searchedBooks) => {
      this.setState({searchedBooks});
    });
  }

  listBooks(searchedBooks) {
    if (searchedBooks instanceof Array) {
      return (
        <ol className="books-grid">
          {searchedBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              onUpdateBook={this.props.onUpdateBook}
            />
          ))}
        </ol>
      )
    } else {
      return <h2>No match found.</h2>;
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.listBooks(this.state.searchedBooks)}
        </div>
      </div>
    )
  }
}

export default SearchBooks;
