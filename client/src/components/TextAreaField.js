import React from 'react'

const TextAreaField = ({inputType, inputName, LabelText,placeholderText}) => {
  return (
    <div className='flex flex-col w-full justify-between gap-2 my-2 '>
    <label className="font-semibold" htmlFor={inputName}>{LabelText}</label>
    <div className="inputBorder w-full p-2 rounded-md  ">
    <textarea type={inputType} placeholder={placeholderText} name={inputName} className='bg-transparent w-full'/>
    </div>
    </div>
  )
}

export default TextAreaField
