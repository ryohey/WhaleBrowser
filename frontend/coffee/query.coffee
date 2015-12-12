orderStr = (descend) -> 
  if descend then "DESC" else "ASC"

module.exports =
  select: (column, offset = 0, descend = false) ->
    order = if descend then "DESC" else "ASC"
    """
    select * from movie
    order by #{column} #{orderStr descend}
    limit 10
    offset #{offset}"""

  find: (text, column, offset = 0, descend = false) ->
    """
    select * from movie
    where movie_name
    like '%#{text}%'
    order by #{column} #{orderStr descend}
    limit 10
    offset #{offset}"""
