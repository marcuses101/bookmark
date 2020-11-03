import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Context from "../BookmarksContext";

export default function EditBookmark() {
  const { editBookmark, bookmarks } = useContext(Context);
  const { id } = useParams();
  const [bookmark, setBookmark] = useState({
    title: "",
    description: "",
    url: "",
    rating: 1,
  });

  useEffect(
    () => {
      const currentBookmark = bookmarks.find(bm=> bm.id === parseInt(id))
      if (currentBookmark) {
        setBookmark(currentBookmark)
      }
    },
    [bookmarks]
  );

  function handleChange(e) {
    const key = e.target.id;
    const value = e.target.value;
    setBookmark((bookmark) => {
      const editedBookmark = { ...bookmark, [key]: value };
      return editedBookmark;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await editBookmark(id, bookmark);
  }

  return (
    <div className="EditBookmark">
      <h1>Let's edit some bookmarks!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          value={bookmark.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="url">URL: </label>
        <input
          type="text"
          id="url"
          value={bookmark.url}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="rating">Rating: </label>
        <input
          type="number"
          min="1"
          max="5"
          id="rating"
          value={bookmark.rating}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <textarea
          id="description"
          value={bookmark.description}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Update bookmark" />
      </form>
    </div>
  );
}
