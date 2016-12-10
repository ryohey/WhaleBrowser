import React from "react"
import { SelectField, MenuItem } from "material-ui"
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
  const onChange = (e, index, value) => {
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
    return <MenuItem value={u.value} key={u.value} primaryText={u.label} />
  })
  return <SelectField onChange={onChange} value={props.value}>{options}</SelectField>
}
