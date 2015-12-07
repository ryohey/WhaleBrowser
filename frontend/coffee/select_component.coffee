React = require "react"
_u = require "underscore"

###
options =
    value: 5
    label: "hogefuga"
  ,
    value: 6
    label: "foobar"
  ,
    ...

or

options = ["hogefuga", "foobar" ...]
###
module.exports = React.createClass 
  onChange: (e) ->
    value = _u.find(e.target.options, (o) -> o.selected).value

    @props.onChange value

  render: ->
    options = (for o in @props.options
      u = {}
      if o instanceof Object
        u = o
      else
        u.value = o
        u.label = o
      <option value={u.value} key={u.value}>{u.label}</option>
    )
    <select onChange={@onChange}>{options}</select>
