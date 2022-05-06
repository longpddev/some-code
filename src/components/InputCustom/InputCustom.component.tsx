import React from 'react'
import { TextInput, TextInputProps } from 'react-materialize';

import './InputCustom.style.scss'
const InputCustom = ({
  field,
  id,
  email = false,
  form: { touched, errors },
  label, 
  ...props
}: any) => {

  return (
      <div className="custom-input">
          {label && <label htmlFor="">{label}</label>}
          <TextInput 
            name={field.name}
            {...props} 
            label={props.type === 'file' ? label : ''} 
            inputClassName={touched[field.name] ? errors[field.name] ? "invalid" : "valid" : ""} 
            children={(
            <>
              {touched[field.name] && errors[field.name] && (
                <span className="helper-text" data-error={errors[field.name]}></span>
              )}
            </>
          )}/>
      </div>
  )
}

export default InputCustom