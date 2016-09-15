const orderStr = (descend) =>
  descend ? "DESC" : "ASC"

export default {
  select: (column, offset = 0, descend = false) => {
    return `
      select * from movie
      order by ${column} ${orderStr(descend)}
      limit 10
      offset ${offset}`
  },

  find: (text, column, offset = 0, descend = false) => {
    return `
      select * from movie
      where movie_name
      like '%${text}%'
      order by ${column} ${orderStr(descend)}
      limit 10
      offset ${offset}`
  }
}
