import path from "path"

export default class MovieEntity {
  getThumbnailPath() {
    const fileName = `${this.movie_name}.\#${this.hash}.jpg`
    return path.join(this.thumbnailDir, fileName)
  }

  getThumbnailURL() {
    const fileName = encodeURIComponent(`${this.movie_name}.\#${this.hash}.jpg`)
    return `file://${path.join(this.thumbnailDir, fileName)}`
  }
}
