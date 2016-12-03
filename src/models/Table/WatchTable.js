import Table from "./Table"

export default class WatchTable extends Table {
  constructor(sqlite) {
    super(sqlite, "watch", {
      dir: "text",
      auto: "integer", // 1 or 0
      watch: "integer", // 1 or 0
      sub: "integer" // 1 or 0
    }, "dir")
  }
}
