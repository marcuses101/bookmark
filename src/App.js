import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarksContext from "./BookmarksContext";
import BookmarkList from "./BookmarkList/BookmarkList";
import EditBookmark from "./EditBookmark/EditBookmark";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = (bookmarks) => {
    this.setState({
      bookmarks,
      error: null,
    });
  };

  addBookmark = (bookmark) => {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark],
    });
  };
  getBookmarkById = async (id) => {
    const response = await fetch(`${config.API_ENDPOINT}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    });
    const data = await response.json();
    return data;
  };
  editBookmark = async (id, bookmark) => {
    const response = await fetch(`${config.API_ENDPOINT}/${id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(bookmark)
    })
    if (!response.ok) return console.error('PATCH request failed');
    const newBookmarks = this.state.bookmarks.map(bm=>{
      return (bm.id === bookmark.id)
      ? bookmark
      : bm;
    })
    this.setState({bookmarks: newBookmarks})
    this.props.history.push('/')
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((bookmarks) => {
        this.setBookmarks(bookmarks);
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      getBookmarkById: this.getBookmarkById,
      editBookmark: this.editBookmark
    };

    return (
      <main className="App">
        <h1>Bookmarks!!!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className="content" aria-live="polite">
            <Route path="/add-bookmark" component={AddBookmark} />
            <Route exact path="/" component={BookmarkList} />
            <Route exact path="/edit-bookmark/:id" component={EditBookmark} />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default withRouter(App);
