import React from 'react'
import SelectBox from './SelectBox'

const SelectField = ({labelText, options,onChangeFunction,value}) => {
  return (
    <div className='flex flex-col w-full justify-between gap-2 my-2 '>
    <label className="font-semibold" htmlFor="dated">{labelText}</label>
    <div className="inputBorder w-full py-2 rounded-md ">
    <SelectBox onChangeFunction={onChangeFunction} value={value}  options={options} />
    </div>
    </div>
  )
}

export default SelectField
