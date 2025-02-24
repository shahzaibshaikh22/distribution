import React from 'react'
// import { FaCalendar } from 'react-icons/fa';
import { useSelector } from 'react-redux'
// import SelectBox from './SelectBox';
import InputField from './InputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';

const FormContainer = () => {
    const { modes } = useSelector((state)=>state.mode);
    
  return (
   <>
     <div className={`w-full mainContainerForm  rounded-xl ${modes ===  "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
      <div className='md:px-0 px-10'>
      <h1 className='text-left md:text-md text-sm pt-6 font-semibold mb-5'>New Complain</h1>
      <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0"/>
      </div>
        
      <div className={`${modes ===  "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
        </div>
    </div>
    
    <div className={`w-full Container h-auto md:mb-0 mb-4  px-10 ${modes ===  "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
    <div className='w-full '>
    <h1 className='text-center pt-6 font-semibold mb-4'>Complain Details</h1>
    <div className="divider w-full h-[1px] bg-gray-300 "/>
    </div>
    <form action="" className='py-4 w-full max-w-3xl mx-auto'>
      <div className='flex md:flex-row flex-col gap-4 my-2'>
      {/* dated  */}
      <InputField
        placeholderText="Dated"
        LabelText="Dated:"
        inputName="dated"
        inputType="date" />
          {/* dated  */}

        {/* assign to */}
        <InputField
        placeholderText="Assign To"
        LabelText="Assign To:"
        inputName="assignto"
        inputType="text" />
        {/* assign to */}


      </div>
      <div className='flex md:flex-row flex-col gap-4 my-2'>
        <SelectField
        labelText="Brand"
        options={["brand 1", "brand 2", "brand 3"]}
        />

      <InputField
         placeholderText="Assign To"
         LabelText="Expected Resolved:"
         inputName="expectedresolved"
         inputType="date"
      />

      </div>

      <div className='flex md:flex-row flex-col gap-4 my-2'>
        <SelectField
        labelText="Customer"
        options={["Customer 1", "Customer 2", "Customer 3"]}
        />
        
        <SelectField
        labelText="Complain Status"
        options={["Complain Status 1", "Complain Status 2", "Complain Status 3"]}
        />

      </div>

      <div className='flex md:flex-row flex-col gap-4 my-2'>
        <SelectField
        labelText="Vendor"
        options={["Vendor 1", "Vendor 2", "Vendor 3"]}
        />
        
        {/* Remarks */}
        <InputField
        placeholderText="Remarks"
        LabelText="Remarks:"
        inputName="remarks"
        inputType="text" />
        {/* Remarks */}

      </div>

      <div className='flex md:flex-row flex-col gap-4'>
        
        {/* Complaint Details: */}
        <TextAreaField
        placeholderText="Complaint Details:"
        LabelText="Complaint Details:"
        inputName="complaintdetails"
        inputType="text" />
        {/* Complaint Details: */}

      </div>
       <button className='bg-blue-700 my-4 px-4 py-2 rounded-full text-white'>Add Complain</button>
    </form>
    </div>
   </>
  )
}

export default FormContainer



