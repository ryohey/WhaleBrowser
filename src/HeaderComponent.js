import React from "react"
import Select from "./SelectComponent"

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
  "comment3"
]

export default function HeaderComponent(props) {
  const onChangeSortOrder = (e) =>
    props.onChangeSortOrder(e.target.checked)

  const onChangeSearchText = (e) =>
    props.onChangeSearchText(e.target.value)

  const onClickClearButton = () => {}

  return <div id="header">
    <input type="text" onChange={onChangeSearchText} />
    <button onClick={onClickClearButton}>clear</button>
    <Select
      onChange={props.onChangeSortColumn}
      options={keys} />
    <div className="group">
      <label>降順</label>
      <input
          type="checkbox"
          onChange={onChangeSortOrder}
        />
    </div>
  </div>
}
