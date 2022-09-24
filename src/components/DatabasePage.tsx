import { observer } from "mobx-react"
import path from "path"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useStores } from "../hooks/useStores"
import Header from "./Header"

function checkMovieExists(movie, logger) {
  logger(`checking ${movie.movie_path}`)
}

const DatabasePage = () => {
  const params = useParams()
  const { navStore, movieStore, logStore } = useStores()
  const [rows, setRows] = useState([])

  useEffect(() => {
    const db = movieStore.db
    if (db) {
      db.watch.all().then((rows) => {
        setRows(rows)
      })
    }
  }, [])

  function toSwitch(v) {
    return v === 1 ? "有効" : "無効"
  }
  const onClickFileCheck = () => {
    const logger = (msg) => logStore.add(msg)
    movieStore.movies.forEach((m) => {
      setTimeout(() => checkMovieExists(m, logger))
    })
  }
  return (
    <div className="DatabasePage">
      <Header onClickMenuButton={() => (navStore.isDrawerOpened = true)}>
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
          {rows.map((r) => (
            <tr>
              <td className="dir">{r.dir}</td>
              <td className="sub">{toSwitch(r.sub)}</td>
              <td className="auto">{toSwitch(r.auto)}</td>
              <td className="watch">{toSwitch(r.watch)}</td>
            </tr>
          ))}
        </table>
        <button onClick={onClickFileCheck}>ファイルチェックを開始</button>
      </div>
    </div>
  )
}

export default observer(DatabasePage)
