import React from 'react'
import { Checkbox } from 'react-materialize'
const CheckboxCustom = ({
  field,
  form: { touched, errors },
  ...props
}: any) => {
  // console.log(props)
  return (
      <Checkbox
      {...props}
      error={touched[field.name] && errors[field.name]}
    />
  )
}

export default CheckboxCustom