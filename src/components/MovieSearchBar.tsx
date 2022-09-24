import React from "react"

import { TextField, Checkbox } from "material-ui"
import Select from "./Select"

const keys = [
  "movie_id",
  "movie_name",
  "movie_path",
  "movie_length",
  "movie_size",
  "last_date",
  "file_date",
  "regist_date",
  "score",
  "view_count",
  "hash",
  "container",
  "video",
  "audio",
  "extra",
  "title",
  "artist",
  "album",
  "grouping",
  "writer",
  "genre",
  "track",
  "camera",
  "create_time",
  "kana",
  "roma",
  "tag",
  "comment1",
  "comment2",
  "comment3",
  "random()",
]

export default function MovieSearchBar({
  searchText,
  onChangeSearchText,
  sortOrder,
  onChangeSortOrder,
  sortColumn,
  onChangeSortColumn,
}) {
  const changeSortOrder = (e, checked) => {
    onChangeSortOrder(checked)
  }

  const changeSearchText = (e) => {
    onChangeSearchText(e.target.value)
  }

  return (
    <div className="search-bar">
      <TextField
        hintText="Search"
        value={searchText}
        onChange={changeSearchText}
      />
      <Select
        value={sortColumn}
        onChange={onChangeSortColumn}
        options={keys}
        label="Sort"
      />
      <div className="group">
        <Checkbox onCheck={changeSortOrder} label="降順" checked={sortOrder} />
      </div>
    </div>
  )
}
