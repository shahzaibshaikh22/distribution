import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import InputField from "../../components/InputField";
import { useDeleteCustomerMutation, useGetCustomersQuery, useUpdateCustomerMutation } from "../../redux/features/apiSlices/setup/customer";
import { setCustomers } from "../../redux/features/slices/setup";


const CustomersView = () => {
  const { customers,towns,zones,salemans,customerCategories } = useSelector((state)=>state.setup);
  const { brands } = useSelector((state)=>state.product);
  const dispatch = useDispatch()

const {data:customersData, refetch} = useGetCustomersQuery()

// handle delete vendor 
const [deleteCustomer] = useDeleteCustomerMutation();
const [updateCustomer] = useUpdateCustomerMutation()
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [data, setData] = useState({
    name:"",
    address:"",
    town:"",
    zone:"",
    salesman:"",
    productcompany:"",
    customercategory:"",
    phone:"",
    mobile:"",
    email:"",
    gst:"",
    ntn:"",
    designation:"",
    contactperson:"",
    openingbalance:0,
})

const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setData({
        name:customer.name,
        address:customer.address,
        phone:customer.phone,
        mobile:customer.mobile,
        gst:customer.gst,
        ntn:customer.ntn,
        designation:customer.designation,
        contactperson:customer.contactperson,
        email:customer.email,
        town:customer.town,
        zone:customer.zone,
        salesman:customer.salesman,
        customercategory:customer.customercategory,
        productcompany:customer.productcompany,
        openingbalance:customer.openingbalance,
    });
    setIsModalOpen(true);

  };

  const handleUpdate = async () => {
    if (selectedCustomer) {
     const res = await updateCustomer({ id: selectedCustomer._id.toString(), data });
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
    const res = await deleteCustomer(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}
useEffect(()=>{
    if(customersData){
        dispatch(setCustomers(customersData))        
    }
  },[dispatch,customersData,refetch])

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
                            {/* <th className="print:border border-gray-300 px-4 py-2">code</th> */}
                            <th className="print:border border-gray-300 px-4 py-2">Name</th>
                            <th className="print:border border-gray-300 px-4 py-2">Address</th>
                            <th className="print:border border-gray-300 px-4 py-2">Phone</th>
                            <th className="print:border border-gray-300 px-4 py-2">Mobile</th>
                            <th className="print:border border-gray-300 px-4 py-2">Gst NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Town</th>
                            <th className="print:border border-gray-300 px-4 py-2">Zone</th>
                            <th className="print:border border-gray-300 px-4 py-2">Salesman</th>
                            <th className="print:border border-gray-300 px-4 py-2">ProductCompany</th>
                            <th className="print:border border-gray-300 px-4 py-2">customercategory</th>
                            <th className="print:border border-gray-300 px-4 py-2">Ntn NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Designation</th>
                            <th className="print:border border-gray-300 px-4 py-2">Opening balance</th>
                            <th className="print:border border-gray-300 px-4 py-2">Contact Person</th>
                            <th className="print:border border-gray-300 px-4 py-2">Email</th>
                            <th className="print:border border-gray-300 px-4 py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers?.map((v)=>{
                            return(
                                <tr key={v._id} className="border-b border-gray-200 hover:bg-lightprimary">
                                    {/* <td className="print:border border-gray-300 px-4 py-2">{v.code}</td> */}
                                    <td className="print:border border-gray-300 px-4 py-2">{v.name}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.address}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.phone}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.mobile}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.gst}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.town}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.zone}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.salesman}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.productcompany}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.customercategory}</td>
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
            <div className="bg-white flex flex-col gap-1 p-6 rounded-md shadow-md md:w-[60%] w-[80%] text-black">
              <h2 className="text-lg font-bold mb-4">Edit Town</h2>
              <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4  '>
                            <InputField
                                value={data.name}
                                onChangeFunction={handleChange}
                                placeholderText="Customer Name"
                                LabelText="Customer Name:"
                                inputName="name"
                                inputType="text" />
                            <InputField
                                value={data.address}
                                onChangeFunction={handleChange}
                                placeholderText="address"
                                LabelText="Address:"
                                inputName="address"
                                inputType="text" />
                                        <InputField
                                value={data.gst}
                                onChangeFunction={handleChange}
                                placeholderText="GST NO"
                                LabelText="GST NO:"
                                inputName="gst"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2   '>
                            <InputField
                                value={data.phone}
                                onChangeFunction={handleChange}
                                placeholderText="phone"
                                LabelText="Phone:"
                                inputName="phone"
                                inputType="text" />
                            <InputField
                                value={data.mobile}
                                onChangeFunction={handleChange}
                                placeholderText="Mobile"
                                LabelText="Mobile:"
                                inputName="mobile"
                                inputType="text" />
                                 <InputField
                                value={data.ntn}
                                onChangeFunction={handleChange}
                                placeholderText="NTN NO"
                                LabelText="NTN NO:"
                                inputName="ntn"
                                inputType="text" />
                        </div>   
                        <div className='flex md:flex-row w-full  flex-col gap-2   '>
                        <InputField
                                value={data.contactperson}
                                onChangeFunction={handleChange}
                                placeholderText="contact person"
                                LabelText="Contact person:"
                                inputName="contactperson"
                                inputType="text" />
                            <InputField
                                value={data.designation}
                                onChangeFunction={handleChange}
                                placeholderText="Designation"
                                LabelText="Designation:"
                                inputName="designation"
                                inputType="text" />
                                <InputField
                                value={data.email}
                                onChangeFunction={handleChange}
                                placeholderText="email"
                                LabelText="email:"
                                inputName="email"
                                inputType="email" />
                        </div>
                      
                        <div className='flex md:flex-row w-full  flex-col gap-2   '>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="town">Town</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="town" id="town">
                                        <option value="">select town</option>
                                        {towns?.map((t)=>{
                                        return(
                                            <option key={t._id} value={t.townname}>{t.townname}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="town">Zone</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="zone" id="zone">
                                        <option value="">select zone</option>
                                        {zones?.map((z)=>{
                                        return(
                                            <option key={z._id} value={z.zonename}>{z.zonename}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="customercategory">Customer Category</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="customercategory" id="customercategory">
                                        <option value="">select Customer Category</option>
                                        {customerCategories?.map((c)=>{
                                        return(
                                            <option key={c._id} value={c.category}>{c.category}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex md:flex-row w-full  flex-col gap-2   '>    
                        <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="productcompany">Brand</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="productcompany" id="productcompany">
                                        <option value="">select brand</option>
                                       {brands?.map((b)=>{
                                        return(
                                            <option key={b._id} value={b.brand}>{b.brand}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="salesman">salesman</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="salesman" id="salesman">
                                        <option value="">select Customer Category</option>
                                        {salemans?.map((s)=>{
                                        return(
                                            <option key={s._id} value={s.saleman}>{s.saleman}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="code">Code</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <input
                                    placeholder="0"
                                    readOnly
                                    className='bg-transparent w-full'/>
                                    </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2   '>
                        
                        <InputField
                            value={data.openingbalance}
                            onChangeFunction={handleChange}
                            placeholderText="openingbalance"
                            LabelText="openingbalance:"
                            inputName="openingbalance"
                            inputType="number" />
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

export default CustomersView;
