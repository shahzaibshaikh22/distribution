import React from 'react'

const InputField = ({inputType, inputName, LabelText,placeholderText, value,onChangeFunction}) => {
  return (
    <div className='flex flex-col w-full justify-between gap-2 my-2 '>
    <label className="font-semibold"  htmlFor={inputName}>{LabelText}</label>
    <div className="inputBorder w-full p-2 rounded-md  ">
    <input
    value={value}
    onChange={onChangeFunction}
    type={inputType}
    placeholder={placeholderText}
    name={inputName}
    className='bg-transparent w-full'/>
    </div>
    </div>
  )
}

export default InputField
