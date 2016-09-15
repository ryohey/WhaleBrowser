export default class MovieEntity {
  getThumbnailPath() {
    const fileName = `${this.movie_name}.\#${this.hash}.jpg`
    return `${this.thumbnailDir}${fileName}`
  }

  getThumbnailURL() {
    const fileName = encodeURIComponent(`${this.movie_name}.\#${this.hash}.jpg`)
    return `file://${this.thumbnailDir}${fileName}?t=${this.isThumbnailCreated}`
  }
}
