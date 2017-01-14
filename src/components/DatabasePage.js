import React, { Component } from "react"
import { observer, inject } from "mobx-react"
import Header from "./Header"
import path from "path"

function checkMovieExists(movie, logger) {
  logger(`checking ${movie.movie_path}`)
}

class DatabasePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    const db = this.props.movieStore.db
    if (db) {
      db.watch.all()
        .then(rows => {
          this.setState({ rows })
        })
    }
  }

  render() {
    const { navStore, movieStore, logStore, params } = this.props
    function toSwitch(v) {
      return v === 1 ? "有効" : "無効"
    }
    const onClickFileCheck = () => {
      const logger = msg => logStore.add(msg)
      movieStore.movies.forEach(m => {
        setTimeout(() => checkMovieExists(m, logger))
      })
    }
    return <div className="DatabasePage">
      <Header onClickMenuButton={() => navStore.isDrawerOpened = true}>
        {path.basename(params.path)}
      </Header>
      <div className="content">
        <h2>監視フォルダ</h2>
        <table>
          <thead>
            <th>フォルダ</th>
            <th>サブフォルダをチェック</th>
            <th>起動時チェック</th>
            <th>起動中監視</th>
          </thead>
        {this.state.rows.map(r =>
          <tr>
            <td className="dir">{r.dir}</td>
            <td className="sub">{toSwitch(r.sub)}</td>
            <td className="auto">{toSwitch(r.auto)}</td>
            <td className="watch">{toSwitch(r.watch)}</td>
          </tr>
        )}
        </table>
        <button onClick={onClickFileCheck}>ファイルチェックを開始</button>
      </div>
    </div>
  }
}

export default inject("navStore", "movieStore", "logStore")(observer(DatabasePage))
