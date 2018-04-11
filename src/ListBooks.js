import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class ListBooks extends Component {
  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Shelf
          books={this.props.books.filter( book => book.shelf === 'currentlyReading')}
          onUpdateBook={this.props.onUpdateBook}
        />
        <Shelf
          books={this.props.books.filter( book => book.shelf === 'wantToRead')}
          onUpdateBook={this.props.onUpdateBook}
        />
        <Shelf
          books={this.props.books.filter( book => book.shelf === 'read')}
          onUpdateBook={this.props.onUpdateBook}
        />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
