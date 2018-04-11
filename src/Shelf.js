import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
  buildShelf(books) {
    if (books.length > 0) {
      return (
        <div className="bookshelf">
          <div>
            {books[0].shelf === 'currentlyReading' && (<h2 className="bookshelf-title">Currently Reading</h2>)}
            {books[0].shelf === 'wantToRead' && (<h2 className="bookshelf-title">Want to Read</h2>)}
            {books[0].shelf === 'read' && (<h2 className="bookshelf-title">Read</h2>)}
          </div>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onUpdateBook={this.props.onUpdateBook}
                />
              ))}
            </ol>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          {this.buildShelf(this.props.books)}
        </div>
      </div>
    );
  }
}

export default Shelf;
