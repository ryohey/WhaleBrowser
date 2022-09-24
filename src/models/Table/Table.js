import _ from "lodash"

function buildInsertValueQuery(obj) {
  const quote = (v) => (_.isString(v) ? `"${v}"` : `${v}`)
  return `(${Object.keys(obj).join(", ")}) values (${Object.values(obj)
    .map(quote)
    .join(", ")})`
}

export default class Table {
  constructor(sqlite, table, schema, uniqueKey) {
    this.sqlite = sqlite
    this.table = table
    this.schema = schema
    this.uniqueKey = uniqueKey
  }

  select(query) {
    return new Promise((resolve) => {
      const stmt = this.sqlite.prepare(query)
      const rows = []
      while (stmt.step()) {
        const row = stmt.getAsObject()
        rows.push(row)
      }
      resolve(rows)
    })
  }

  all(where) {
    const query = `select * from ${this.table} ${
      where ? ` where ${where}` : ""
    }`
    return this.select(query)
  }

  insert(obj) {
    return new Promise((resolve) => {
      const pickedObj = _.pick(obj, Object.keys(this.schema))
      const values = buildInsertValueQuery(pickedObj)
      const query = `insert into ${this.table} ${values}`
      const result = this.sqlite.run(query)
      resolve(result)
    })
  }

  delete(id) {
    return new Promise((resolve) => {
      const query = `delete from ${this.table} where ${this.uniqueKey} = ${id}`
      const result = this.sqlite.run(query)
      resolve(result)
    })
  }
}
