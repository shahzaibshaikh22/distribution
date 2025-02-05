import React from 'react'
import SelectBox from './SelectBox'

const SelectField = ({labelText, options,onChangeFunction,value}) => {
  return (
    <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
    <label className="font-semibold" htmlFor="dated">{labelText}</label>
    <div className="inputBorder w-full py-2 rounded-md max-w-xs">
    <SelectBox onChangeFunction={onChangeFunction} value={value}  options={options} />
    </div>
    </div>
  )
}

export default SelectField
