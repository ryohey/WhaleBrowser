import {
  MenuItem,
  Select as SelectMenu,
  SelectChangeEvent,
} from "@mui/material"

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
  const onChange = (e: SelectChangeEvent) => {
    props.onChange(e.target.value)
  }

  const options = props.options.map((o) => {
    let u: any = {}
    if (o instanceof Object) {
      u = o
    } else {
      u.value = o
      u.label = o
    }
    return (
      <MenuItem value={u.value} key={u.value}>
        {u.label}
      </MenuItem>
    )
  })
  return (
    <SelectMenu onChange={onChange} value={props.value}>
      {options}
    </SelectMenu>
  )
}
