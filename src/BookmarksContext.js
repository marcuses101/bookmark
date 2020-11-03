import React from "react";

const BookmarksContext = React.createContext({
  API_KEY: "",
  bookmarks: [],
  getBookmarkById: ()=>{},
  addBookmark: () => {},
  deleteBookmark: ()=>{},
  editBookmark: ()=>{}
});

export default BookmarksContext;