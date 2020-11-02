import React from "react";

const BookmarksContext = React.createContext({
  API_KEY: "",
  bookmarks: [],
  addBookmark: () => {},
  deleteBookmark: ()=>{}
});

export default BookmarksContext;