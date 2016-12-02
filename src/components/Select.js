import React from "react"
import _ from "lodash"

/**
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
*/
export default function Select(props) {
  const onChange = (e) => {
    const value = _.find(e.target.options, o => o.selected).value
    props.onChange(value)
  }

  const options = props.options.map(o => {
    let u = {}
    if (o instanceof Object) {
      u = o
    } else {
      u.value = o
      u.label = o
    }
    return <option value={u.value} key={u.value}>{u.label}</option>
  })
  return <select onChange={onChange}>{options}</select>
}
