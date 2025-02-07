import React, { useEffect } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField"
// import SelectField from "../../components/SelectField"
import { useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor"
import { useGetWarehouseQuery } from "../../redux/features/apiSlices/setup/warehouse"
import { setVendors, setWarehouses } from "../../redux/features/slices/productSlice"
import { useDispatch } from "react-redux";
import { FaChevronDown } from "react-icons/fa";



const Purchase = () => {
    const { modes } = useSelector((state) => state.mode);
    const { vendors, warehouses } = useSelector((state) => state.product);
        // const [purchaseOrder, setPurchaseOrder] = useState({});
    


const dispatch = useDispatch()
const handleChange = (e) =>e.target.value ;

    // fetch brands 
    const { data: vendorData } = useGetVendorQuery();
    // fetch brands 

        // fetch brands 
        const { data: warehouseData } = useGetWarehouseQuery();
        // fetch brands 

    useEffect(() => {
        if (vendorData) {
            dispatch(setVendors(vendorData.vendor));
        }
    }, [vendorData, dispatch]);

    useEffect(() => {
        if (warehouseData) {
            dispatch(setWarehouses(warehouseData.warehouse));
        }
    }, [warehouseData, dispatch]);



    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Purchase Order" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Purchase Order</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>
                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto  mb-4 px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Purchase Order Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form className='py-4'>
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Warehouse</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange}  name="warehouse" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {warehouses?.map((item) => (
                                                <option key={item._id} value={item.warehouse}>
                                                    {item.warehouse}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Vendors</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange}  name="producttype" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {vendors?.map((item) => (
                                                <option key={item._id} value={item.vendor}>
                                                    {item.vendor}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                              {/* product type  */}
                              <InputField
                                // value={brand}
                                onChangeFunction={handleChange}
                                placeholderText="Vehicle No"
                                LabelText="Vehicle No:"
                                inputName="vehicleno"
                                inputType="number" />
                            {/* product type  */}

                              {/* product type  */}
                              <InputField
                                // value={brand}
                                onChangeFunction={handleChange}
                                placeholderText="DC No"
                                LabelText="d-Challan No:"
                                inputName="dcno"
                                inputType="number" />
                            {/* product type  */}
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[47%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
