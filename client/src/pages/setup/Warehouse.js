import React, { useState,useEffect } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { useAddWarehouseMutation, useGetWarehouseQuery } from "../../redux/features/apiSlices/setup/warehouse";
import { setWarehouses } from "../../redux/features/slices/productSlice";



const Warehouse = () => {
    const { modes } = useSelector((state) => state.mode);
    const dispatch = useDispatch()
    const { data: warehouseData } = useGetWarehouseQuery()
    const [warehouse, setWarehouse] = useState("");

    // product type submition
    const [addwarehouse, { isLoading }] = useAddWarehouseMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await addwarehouse({ warehouse })
        setWarehouse("")

        if (res) {
            if (res.data.err) {
                alert(res.data.err)
            } else if (res.data.msg) {
                alert(res.data.msg)
            }
        }
        // if(res.data.msg){
        //     alert(res.data.msg)
        // }

    }
    useEffect(() => {
        if (warehouseData) {
            dispatch(setWarehouses(warehouseData.warehouse));

        }
    }, [dispatch, warehouseData]);


    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Warehouse" secRedirect="/warehouse" view="/warehouse-view" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Warehouse</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>

                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Warehouse Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='py-4 w-full max-w-3xl mx-auto'>
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2'>
                            {/* product type  */}
                            <InputField
                                value={warehouse}
                                onChangeFunction={(e) => setWarehouse(e.target.value)}
                                placeholderText="warehouse"
                                LabelText="Warehouse"
                                inputName="warehouse"
                                inputType="text" />

                            <div className='flex flex-col w-full gap-2'>
                                <label className="font-semibold" htmlFor="code">Code</label>
                                <div className="inputBorder w-full p-2 rounded-md ">
                                    <input
                                        placeholder={warehouseData?.warehouse?.length + 1}
                                        readOnly
                                        type="number"
                                        className='bg-transparent w-full' />
                                </div>
                            </div>
                            {/* product type  */}
                        </div>
                        <div className='flex items-center md:flex-row flex-col  my-2 '>
                            <div />
                            <button type="submit" className='disButton'>{isLoading ? "Processing" : "Add New"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Warehouse;
