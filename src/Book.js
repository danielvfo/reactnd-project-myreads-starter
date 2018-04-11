import React, { Component } from 'react';

class Book extends Component {
  handleChange = (event) => {
    this.props.onUpdateBook(event.target.id, event.target.value);
  }

  hasBackgroundImage(book) {
    if (book.imageLinks)
      return <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>;
    else {
      return <div className="book-cover"></div>;
    }
  }

  showContextMenu(book) {
    if (book.shelf === 'currentlyReading') {
      return (
        <select value="currentlyReading" id={book.id} onChange={this.handleChange}>
          <option value="disabled" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      );
    } else if (book.shelf === 'wantToRead') {
      return (
        <select value="wantToRead" id={book.id} onChange={this.handleChange}>
          <option value="disabled" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      );
    } else if (book.shelf === 'read') {
      return (
        <select value="read" id={book.id} onChange={this.handleChange}>
          <option value="disabled" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      );
    } else {
      return (
        <select value="none" id={book.id} onChange={this.handleChange}>
          <option value="other" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      );
    }
  }

  render () {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {this.hasBackgroundImage(this.props.book)}
            <div className="book-shelf-changer">
              {this.showContextMenu(this.props.book)}
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
