import React,{useEffect,useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import {  useDeleteStaffMutation, useGetStaffCategoryQuery, useGetStaffQuery, useUpdateStaffMutation } from "../../redux/features/apiSlices/setup/staffCategory";
import {setStaffCaty, setStaff } from "../../redux/features/slices/setup"
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import InputField from "../../components/InputField";



const StaffView = () => {
  const { staffs,staffCategories } = useSelector((state)=>state.setup);
  const dispatch = useDispatch()

  const {data:staffCatyData} = useGetStaffCategoryQuery();
  const {data:staffData, refetch} = useGetStaffQuery();
  const [updateStaff] = useUpdateStaffMutation()
  const [dltstaff] = useDeleteStaffMutation()

  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedStaff, setSelectedStaff] = useState(null);
const [data, setData] = useState({
    name:"",
    address:"",
    phone:"",
    mobile:"",
    nic:"",
    email:"",
    category:"",
    openingbalance:0,
});

const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setData({
        name:staff.name,
        address:staff.address,
        phone:staff.phone,
        mobile:staff.mobile,
        email:staff.email,
        category:staff.category,
        nic:staff.nic,
        openingbalance:staff.openingbalance,
    });
    setIsModalOpen(true);

  };
  
  const handleUpdate = async () => {
    if (setSelectedStaff) {
     const res = await updateStaff({ id: selectedStaff._id.toString(), data });
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
    const res = await dltstaff(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}





useEffect(()=>{
    if(staffCatyData){
        dispatch(setStaffCaty(staffCatyData.category))        
    }
  },[dispatch,staffCatyData,refetch])
useEffect(()=>{
    if(staffData){
        dispatch(setStaff(staffData.staff))        
    }
  },[dispatch,staffData, refetch])
    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Staff" />
                {/* form section */}

                <div className="w-full my-4 rounded-md p-6 bg-white text-gray-800">
                <table className="w-full text-sm ">
                    <thead className="text-left">
                        <tr className="bg-gray-100 print:bg-gray-100 ">
                            <th className="print:border border-gray-300 px-4 py-2">#Serial No</th>
                            <th className="print:border border-gray-300 px-4 py-2">Name</th>
                            <th className="print:border border-gray-300 px-4 py-2">Address</th>
                            <th className="print:border border-gray-300 px-4 py-2">Phone</th>
                            <th className="print:border border-gray-300 px-4 py-2">Mobile</th>
                            <th className="print:border border-gray-300 px-4 py-2">Category</th>
                            <th className="print:border border-gray-300 px-4 py-2">NIC</th>
                            <th className="print:border border-gray-300 px-4 py-2">Opening balance</th>
                            <th className="print:border border-gray-300 px-4 py-2">Email</th>
                            <th className="print:border border-gray-300 px-4 py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs?.map((cat)=>{
                            return(
                                <tr key={cat._id} className="border-b border-gray-200 hover:bg-lightprimary">
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.code}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.name}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.address}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.phone}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.mobile}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.category}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.nic}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.openingbalance}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.email}</td>
                                    <td className=" flex items-center gap-2 px-4 py-2">
                    <button onClick={() => handleDelete(cat._id.toString())} className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                      <FaTrashAlt />
                    </button>
                    <button onClick={() => handleEdit(cat)} className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
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
              <h2 className="text-lg font-bold mb-4">Edit Staff</h2>
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
                <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                <label className="font-semibold"  htmlFor="category">Category</label>
                <div className="inputBorder w-full p-2 rounded-md  ">
                    <select className="w-full" name="category" onChange={handleChange} id="category">
                       {staffCategories?.map((cat)=>{
                        return (
                            <option value={cat.category}>{cat.category}</option>
                        )
                       })}
                    </select>
                </div>
                </div>
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
    placeholder={selectedStaff.code}
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

export default StaffView;
