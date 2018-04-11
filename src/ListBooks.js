import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

const ListBooks = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <Shelf
      books={props.books.filter( book => book.shelf === 'currentlyReading')}
      onUpdateBook={props.onUpdateBook}
    />
    <Shelf
      books={props.books.filter( book => book.shelf === 'wantToRead')}
      onUpdateBook={props.onUpdateBook}
    />
    <Shelf
      books={props.books.filter( book => book.shelf === 'read')}
      onUpdateBook={props.onUpdateBook}
    />
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

export default ListBooks;
