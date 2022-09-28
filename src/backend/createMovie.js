import fs from "fs"
import path from "path"
import sinku from "./sinku"

function formatDate(n) {
  return `${n.getFullYear()}-${
    n.getMonth() + 1
  }-${n.getDate()} ${n.getHours()}:${n.getMinutes()}:${n.getSeconds()}`
}

export default async function createMovie(filePath) {
  const o = await sinku(filePath)

  const now = formatDate(new Date())
  const stat = fs.lstatSync(filePath)

  return {
    movie_name: path.parse(filePath).name,
    movie_path: filePath,
    regist_date: now,
    last_date: now,
    file_date: formatDate(stat.mtime),
    movie_length: parseInt(o.movie_length),
    movie_size: parseInt(o.movie_size),
    container: o.container.toString(),
    extra: o.extra.toString(),
    audio: o.audio.toString(),
    video: o.video.toString(),
  }
}
