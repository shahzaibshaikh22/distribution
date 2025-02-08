import React, { useState,useEffect } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField"
// import SelectField from "../../components/SelectField"
import { useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor"
import { useGetWarehouseQuery } from "../../redux/features/apiSlices/setup/warehouse"
import { setProducts, setVendors, setWarehouses } from "../../redux/features/slices/productSlice"
import { useDispatch } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/features/apiSlices/product/productApiSlice";
import SearchableSelect from "../../components/SearchableSelect";
import PurchaseOrderForm from "../../components/PurchaseOrderForm";

const ProductRow = ({ product }) => (
    <>
        <tr className="border-b">
            <td className="py-3 text-xs px-4">
                <img className="w-10 h-10 object-cover rounded-sm drop-shadow-sm" src={`http://localhost:5000/uploads/${product.image}`} alt={product.image} />
            </td>
            <td className="py-3 text-xs px-4">{product.name}</td>
            <td className="py-3 text-xs px-4">{product.brand}</td>
            <td className="py-3 text-xs px-4">
                <span className="px-3 py-1 text-sm rounded-full">{product.category}</span>
            </td>
            <td className="py-3 text-xs px-4">{product.barcode}</td>
            <td className="py-3 text-xs px-4">{product.stocklevel}</td>
            <td className="py-3 text-xs px-4">Rs-{product.wholesaleprice}</td>
            <td className="py-3 text-xs px-4">Rs-{product.costprice}</td>
            <td className="py-3 text-xs px-4">Rs-{product.openingcost}</td>
            <td className="py-3 text-xs px-4">{new Date(product.createdAt).toLocaleString()}</td>
            <td className="py-3 text-xs px-4">
                <button className="px-2 py-1 rounded-md bg-green-400">Edit</button>
                <button className="px-2 py-1 rounded-md bg-red-400">Delete</button>
            </td>
        </tr>
    </>
);

const Purchase = () => {
      const [selected, setSelected] = useState([]);
      const [selectedId, setSelectedId] = useState([]);
    const { modes } = useSelector((state) => state.mode);
    const { vendors, warehouses, products } = useSelector((state) => state.product);
    // const [purchaseOrder, setPurchaseOrder] = useState({});
    const dispatch = useDispatch()
    

    const { data: productData } = useGetProductsQuery();
    useEffect(() => {
        if (productData) {
            dispatch(setProducts(productData.products));
        }
    }, [productData, dispatch]);


    const handleChange = (e) => e.target.value;

    // fetch brands 
    const { data: vendorData } = useGetVendorQuery();
    // fetch brands 
        // fetch brands 
        const { data: productsData } = useGetProductsQuery();
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
        if (productsData) {
            dispatch(setProducts(productsData.products));
        }
    }, [productsData, dispatch]);

    useEffect(() => {
        if (warehouseData) {
            dispatch(setWarehouses(warehouseData.warehouse));
        }
    }, [warehouseData,selected, dispatch]);

    useEffect(()=>{
        if(selectedId){
            console.log(selectedId);
        }
    },[selectedId])


    return (
        <div className="w-full px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                {/* <SectionBar sectionHeading="Purchase Order" /> */}
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Purchase Order</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>
                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

               <PurchaseOrderForm 
                vendors={vendors}
                products={products}
                warehouses={warehouses}
               />
            </div>

        </div>
    );
};

export default Purchase;



