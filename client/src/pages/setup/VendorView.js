import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { setVendors } from "../../redux/features/slices/productSlice"
import { useDeleteVendorMutation, useGetVendorQuery, useUpdateVendorMutation } from "../../redux/features/apiSlices/setup/vendor";
import InputField from "../../components/InputField";


const VendorView = () => {
  const { vendors } = useSelector((state)=>state.product);
  const dispatch = useDispatch()

const {data:vendorData, refetch} = useGetVendorQuery()

// handle delete vendor 
const [dltvendor] = useDeleteVendorMutation();
const [updateVendor] = useUpdateVendorMutation()
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedVendor, setSelectedVendor] = useState(null);
const [data, setData] = useState({
    name:"",
    address:"",
    phone:"",
    mobile:"",
    fax:"",
    gst:"",
    ntn:"",
    designation:"",
    contactperson:"",
    email:"",
    openingbalance:0,
});

const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setData({
        name:vendor.name,
        address:vendor.address,
        phone:vendor.phone,
        mobile:vendor.mobile,
        fax:vendor.fax,
        gst:vendor.gst,
        ntn:vendor.ntn,
        designation:vendor.designation,
        contactperson:vendor.contactperson,
        email:vendor.email,
        openingbalance:vendor.openingbalance,
    });
    setIsModalOpen(true);

  };

  const handleUpdate = async () => {
    if (selectedVendor) {
     const res = await updateVendor({ id: selectedVendor._id.toString(), data });
     if(res.data.msg){
        alert(res.data.msg)
     }
      setIsModalOpen(false);
        refetch();
    }
  };

  const handleChange = (e) =>{
    setData({...data,[e.target.name] :e.target.value})
  } 

const handleDelete = async (id)=>{
    const res = await dltvendor(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}
useEffect(()=>{
    if(vendorData){
        dispatch(setVendors(vendorData)) 
               
    }
  },[dispatch,vendorData])

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Vendors"secRedirect="/vendor" view="/vendor-view"/>
                {/* form section */}

                <div className="w-full my-4 rounded-md p-2 bg-white text-gray-800 overflow-x-auto">
                <table className="w-full text-sm ">
                    <thead className="text-left">
                        <tr className="bg-gray-100 print:bg-gray-100 text-xs">
                            <th className="print:border border-gray-300 px-4 py-2">Serial No</th>
                            <th className="print:border border-gray-300 px-4 py-2">Name</th>
                            <th className="print:border border-gray-300 px-4 py-2">Address</th>
                            <th className="print:border border-gray-300 px-4 py-2">Phone</th>
                            <th className="print:border border-gray-300 px-4 py-2">Mobile</th>
                            <th className="print:border border-gray-300 px-4 py-2">Fax NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Gst NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Ntn NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Designation</th>
                            <th className="print:border border-gray-300 px-4 py-2">Opening balance</th>
                            <th className="print:border border-gray-300 px-4 py-2">Contact Person</th>
                            <th className="print:border border-gray-300 px-4 py-2">Email</th>
                            <th className="print:border border-gray-300 px-4 py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors?.map((v,index)=>{
                            return(
                                <tr key={v._id} className="border-b border-gray-200 hover:bg-lightprimary">
                                    <td className="print:border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.name}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.address}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.phone}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.mobile}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.fax}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.gst}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.ntn}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.designation}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.openingbalance}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.contactperson}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.email}</td>
                      
                                    <td className=" flex items-center gap-2 px-4 py-2">
                    <button onClick={() => handleDelete(v._id.toString())} className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                      <FaTrashAlt />
                    </button>
                    <button onClick={() => handleEdit(v)} className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
                      <FaPencilAlt />
                    </button>
                  </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white flex flex-col gap-1 p-6 rounded-md shadow-md md:w-[40%] w-[80%] text-black">
              <h2 className="text-lg font-bold mb-4">Edit Town</h2>
                <div className="w-full flex items-center md:gap-2 ">
                <InputField
                value={data.name}
                onChangeFunction={handleChange}
                placeholderText="Vnedor Name"
                LabelText="Vnedor Name:"
                inputName="name"
                inputType="text"
              />
              <InputField
                placeholderText="address"
                value={data.address}
                onChangeFunction={handleChange}
                LabelText="Address:"
                inputName="address"
                inputType="text"
              />
                </div>
                <div className="w-full flex items-center md:gap-2 ">
                <InputField
                value={data.phone}
                onChangeFunction={handleChange}
                placeholderText="Phone"
                LabelText="Phone:"
                inputName="phone"
                inputType="text"
              />
              <InputField
                placeholderText="mobile"
                value={data.mobile}
                onChangeFunction={handleChange}
                LabelText="Mobile:"
                inputName="mobile"
                inputType="text"
              />
                </div>
                <div className="w-full flex items-center md:gap-2 ">
                <InputField
                value={data.fax}
                onChangeFunction={handleChange}
                placeholderText="Fax"
                LabelText="Fax:"
                inputName="fax"
                inputType="text"
              />
              <InputField
                placeholderText="gst"
                value={data.gst}
                onChangeFunction={handleChange}
                LabelText="Gst:"
                inputName="gst"
                inputType="text"
              />
                </div>
                <div className="w-full flex items-center md:gap-2 ">
                <InputField
                value={data.ntn}
                onChangeFunction={handleChange}
                placeholderText="NTN"
                LabelText="NTN:"
                inputName="ntn"
                inputType="text"
              />
              <InputField
                placeholderText="openingbalance"
                value={data.openingbalance}
                onChangeFunction={handleChange}
                LabelText="Opening Balance:"
                inputName="openingbalance"
                inputType="number"
              />
                </div>
                <div className="w-full flex items-center md:gap-2 ">
                <InputField
                value={data.designation}
                onChangeFunction={handleChange}
                placeholderText="Designation"
                LabelText="Designation:"
                inputName="designation"
                inputType="text"
              />
              <InputField
                placeholderText="contactperson"
                value={data.contactperson}
                onChangeFunction={handleChange}
                LabelText="Contact Person:"
                inputName="contactperson"
                inputType="text"
              />
                </div>
                <div className="w-full flex items-center md:gap-2 ">
                <InputField
                value={data.email}
                onChangeFunction={handleChange}
                placeholderText="email"
                LabelText="Email:"
                inputName="email"
                inputType="email"
              />
           <div className='flex flex-col w-full justify-between gap-2 my-2 '>
    <label className="font-semibold"  htmlFor="code">Code</label>
    <div className="inputBorder w-full p-2 rounded-md  ">
    <input
    type="text"
    placeholder={selectedVendor.code}
    name="code"
    readOnly
    className='bg-transparent w-full'/>
    </div>
    </div>
                </div>
              <div className="flex justify-end gap-2">
                <button className="bg-gray-400 px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        )}
            </div>
            
        </div>
    );
};

export default VendorView;
