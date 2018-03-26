import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = {
    query: '',
    searchedBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query })
  }

  searchBooks(query) {
    BooksAPI.search(query).then((searchedBooks) => {
      this.setState({searchedBooks});
    });
  }

  hasBackgroundImage(book) {
    if (book.imageLinks.thumbnail)
      return <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>;
    else {
      return <div className="book-cover" style={{ width: 128, height: 193 }}></div>;
    }
  }

  hasBooks(searchedBooks) {
    if (searchedBooks) {
      return (
        this.state.searchedBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                {this.hasBackgroundImage(book)}
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))
      )
    } else {
      return <li>No books</li>;
    }
  }

  render() {
    const {query} = this.state;
    if (query) {
      this.searchBooks(query);
    } else {
      this.setState({searchedBooks: []});
    }

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
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.hasBooks(this.state.searchedBooks)}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
