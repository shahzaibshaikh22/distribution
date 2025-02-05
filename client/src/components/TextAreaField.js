import React from 'react'

const TextAreaField = ({inputType, inputName, LabelText,placeholderText}) => {
  return (
    <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
    <label className="font-semibold" htmlFor={inputName}>{LabelText}</label>
    <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
    <textarea type={inputType} placeholder={placeholderText} name={inputName} className='bg-transparent w-full'/>
    </div>
    </div>
  )
}

export default TextAreaField
