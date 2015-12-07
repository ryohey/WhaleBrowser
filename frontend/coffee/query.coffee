module.exports = class
  constructor: (lastMovie, column, descend = false) ->
    @lastMovie = lastMovie
    @column = column
    @descend = descend

  build: ->
    where = ""
    last = @lastMovie?[@column]
    if last
      c = if @descend then "<" else ">"
      where = "where #{@column} #{c} '#{last}'"

    order = if @descend then "DESC" else "ASC"
    """
    select * from movie
    #{where}
    order by #{@column} #{order}
    limit 10"""
