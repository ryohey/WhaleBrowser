module.exports =
  select: (column, offset = 0, descend = false) ->
    order = if descend then "DESC" else "ASC"
    """
    select * from movie
    order by #{column} #{order}
    limit 10
    offset #{offset}"""

  search: (text, offset = 0, descend = false) ->
    order = if descend then "DESC" else "ASC"
    """
    select * from movie
    where movie_name
    order by #{column} #{order}
    like '%{text}%'"""