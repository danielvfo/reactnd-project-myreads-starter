import React from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }

  updateBook = (id, shelf) => {
    BooksAPI.update({ id }, shelf).then(() => {
      this.getBooks();
    });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/search" render={() => (
              <SearchBooks
                onUpdateBook={this.updateBook}
                shelfBooks={this.state.books}
              />
            )}/>
            <Route exact path="/" render={() => (
              <ListBooks
                books={this.state.books}
                onUpdateBook={this.updateBook}
              />
            )}/>
            <Route nomatch render={() => (
              <div>
                <h1>404</h1>
              </div>
            )}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
