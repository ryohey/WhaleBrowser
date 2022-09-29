import _ from "lodash"
import { Database } from "sql.js"

function buildInsertValueQuery(obj) {
  const quote = (v) => (_.isString(v) ? `"${v}"` : `${v}`)
  return `(${Object.keys(obj).join(", ")}) values (${Object.values(obj)
    .map(quote)
    .join(", ")})`
}

export default class Table {
  constructor(
    readonly sqlite: Database,
    readonly table: string,
    readonly schema: any,
    readonly uniqueKey: string
  ) {}

  async get(id: string) {
    const query = `select * from ${this.table} where ${this.uniqueKey} = ${id}`
    const res = await this.select(query)
    return _.first(res)
  }

  select(query: string): Promise<any[]> {
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

  all(where: string) {
    const query = `select * from ${this.table} ${
      where ? ` where ${where}` : ""
    }`
    return this.select(query)
  }

  insert(obj: any) {
    return new Promise((resolve) => {
      const pickedObj = _.pick(obj, Object.keys(this.schema))
      const values = buildInsertValueQuery(pickedObj)
      const query = `insert into ${this.table} ${values}`
      const result = this.sqlite.run(query)
      resolve(result)
    })
  }

  delete(id: string) {
    return new Promise((resolve) => {
      const query = `delete from ${this.table} where ${this.uniqueKey} = ${id}`
      const result = this.sqlite.run(query)
      resolve(result)
    })
  }
}
