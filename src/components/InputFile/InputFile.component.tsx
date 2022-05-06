import React, { useState, useRef, useEffect } from 'react'
import { TextInput } from 'react-materialize';
import './InputFile.style.scss'
const InputFile = ({onChange, field, name, value, form, ...props}: any) => {
    const [ file, setFile ] = useState<File | null>(null);
    const ref = useRef<HTMLInputElement>();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
      ref.current = e.target;
      
      if (!e.target.files) {
        return;
      }
      let file = e.target.files[0];
      form.setFieldValue(field.name, file)
      setFile(file);
    }
    
    useEffect(() => {
      if(!ref.current) return;
      console.log(value, ref.current.files)
      // reset input
      if(!value) {
        ref.current.value = ''
        ref.current.dispatchEvent(new Event('change', {
          bubbles: true
        }))
        setFile(null)
      }
    }, [value])
    return (
        <div className={`input-file ${form.touched[field.name] ? form.errors[field.name] ? "invalid" : "valid" : ""}`}>
          <TextInput
            {...props}
            name={name}
            onChange={handleFileChange}
            type="file"
            children={(
              <>
                {form.touched[field.name] && form.errors[field.name] && (
                  <span className="helper-text" data-error={form.errors[field.name]}></span>
                )}
              </>
            )}
          />
        </div>
    )
  }

export default InputFile