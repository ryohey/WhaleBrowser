import React from "react"
import { AppBar, TextField, Checkbox  } from "material-ui"
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
  "comment3"
]

function Content(props) {
  const onChangeSortOrder = (e) =>
    props.onChangeSortOrder(e.target.checked)

  const onChangeSearchText = (e) =>
    props.onChangeSearchText(e.target.value)

  return <div className="search-bar">
    <TextField hintText="Search" onChange={onChangeSearchText} />
    <Select
      onChange={props.onChangeSortColumn}
      options={keys}
      label="Sort" />
    <div className="group">
      <Checkbox onChange={onChangeSortOrder} label="降順" />
    </div>
  </div>
}

export default function Header(props) {
  return <AppBar
    title={<Content {...props} />}
    style={{
      position: "fixed",
      top: 0,
      zIndex: 999
    }}
    onLeftIconButtonTouchTap={props.onClickMenuButton}>
  </AppBar>
}
