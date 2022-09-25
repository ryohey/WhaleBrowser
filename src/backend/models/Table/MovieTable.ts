import Table from "./Table"

export default class MovieTable extends Table {
  constructor(sqlite) {
    super(
      sqlite,
      "movie",
      {
        movie_name: "text",
        movie_path: "text",
        movie_length: "integer",
        movie_size: "integer",
        last_date: "datetime",
        file_date: "datetime",
        regist_date: "datetime",
        score: "integer",
        view_count: "integer",
        hash: "text",
        container: "text",
        video: "text",
        audio: "text",
        extra: "text",
        title: "text",
        artist: "text",
        album: "text",
        grouping: "text",
        writer: "text",
        genre: "text",
        track: "text",
        camera: "text",
        create_time: "text",
        kana: "text",
        roma: "text",
        tag: "text",
        comment1: "text",
        comment2: "text",
        comment3: "text",
      },
      "movie_id"
    )
  }

  getNext(
    searchText = "",
    sortColumn = "create_time",
    offset = 0,
    descend = false,
    limit = 50
  ) {
    const where =
      searchText && searchText.length > 0
        ? `where movie_name like '%${searchText}%'`
        : ""

    const orderStr = (descend) => (descend ? "DESC" : "ASC")

    return this.select(`select * from movie
      ${where}
      order by ${sortColumn} ${orderStr(descend)}
      limit ${limit}
      offset ${offset}`)
  }
}
