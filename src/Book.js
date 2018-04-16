import React, { PureComponent } from 'react';

class Book extends PureComponent {
  handleChange = (event) => {
    this.props.onUpdateBook(event.target.id, event.target.value);
    if (this.props.query) {
      this.props.refresh(this.props.query);
    }
  }

  hasBackgroundImage(book) {
    if (book.imageLinks)
      return <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>;
    else {
      return <div className="book-cover" />;
    }
  }

  showContextMenu(book) {
    return (
      <select value={book.shelf ? book.shelf : 'none'} id={book.id} onChange={this.handleChange}>
        <option value="disabled" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }

  render () {
    const { book: { authors, title } } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            {this.hasBackgroundImage(this.props.book)}
            <div className="book-shelf-changer">
              {this.showContextMenu(this.props.book)}
            </div>
          </div>
          <div className="book-title">{title && title}</div>
          <div className="book-authors">{authors && authors.join(', ')}</div>
        </div>
      </li>
    );
  }
}

export default Book;
