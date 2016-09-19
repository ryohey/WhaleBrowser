const orderStr = (descend) =>
  descend ? "DESC" : "ASC"

export default {
  select: (text, sortColumn, offset = 0, descend = false, limit = 50) => {
    const where = (text && text.length > 0) ?
      `where movie_name like '%${text}%'` : ""

    return `select * from movie
      ${where}
      order by ${sortColumn} ${orderStr(descend)}
      limit ${limit}
      offset ${offset}`
  }
}
