import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

const shelfs = [
  { title: 'Currently reading', slug: 'currentlyReading' },
  { title: 'Want to read', slug: 'wantToRead' },
  { title: 'Read', slug: 'read' }
];

const ListBooks = (props) => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    {
      shelfs.map(({ title, slug }, key) => (
        <Shelf
          title={title}
          key={key}
          books={props.books.filter(book => book.shelf === slug)}
          onUpdateBook={props.onUpdateBook}
        />
      ))
    }
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>
);

export default ListBooks;
