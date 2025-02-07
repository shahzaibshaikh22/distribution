import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";

import { useAddProductMutation } from "../../redux/features/apiSlices/product/productApiSlice";
import { setBrands, setCategory, setProductType, setSubCategory, setUnits } from "../../redux/features/slices/productSlice";
import { FaChevronDown } from "react-icons/fa";
import { useGetBrandsQuery } from "../../redux/features/apiSlices/product/brandSlice";
import { useGetUnitsQuery } from "../../redux/features/apiSlices/product/unitSlice";
import { useGetCategoryQuery } from "../../redux/features/apiSlices/product/categorySlice";
import { useGetSubCategoryQuery } from "../../redux/features/apiSlices/product/subCategorySlice";
import { useGetProductTypeQuery } from "../../redux/features/apiSlices/product/productTypeApiSlice";



const Product = () => {
    // const [image, setImage] = useState([]);
    const { modes } = useSelector((state) => state.mode);
    const { brands, units, category, subCategory, productType } = useSelector((state) => state.product)
    const dispatch = useDispatch()

    // fetch brands 
    const { data: brandsData } = useGetBrandsQuery();
    // fetch brands 

    // fetch units 
    const { data: unitsData } = useGetUnitsQuery()
    // fetch units 

    // fetch category 
    const { data: categoryData } = useGetCategoryQuery()
    // fetch category 

    // fetch subcategory 
    const { data: subCategoryData } = useGetSubCategoryQuery()
    // fetch subcategory 

    // fetch product type 
    const { data: productTypeData } = useGetProductTypeQuery();
    // fetch product type 
    const initialState = {
        producttype: "",
        productname: "",
        distributionprice: "",
        barcode: "",
        hscode: "",
        brand: "",
        category: "",
        subcategory: "",
        remarks: "",
        unit: "",
        weight: "",
        stocklevel: "",
        openingbalance: "",
        openingcost: "",
        retailprice: "",
        wholesaleprice: "",
        costprice: "",
        image: null
    };
    const [productData, setProductData] = useState(initialState);

    // onchange function for product data
    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };


    // Handle image change
    const handleImageChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };
    // product type submition
    const [addproduct, { isLoading }] = useAddProductMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in productData) {
            formData.append(key, productData[key]);
        }
        if(formData){
            console.log(formData);
            
        }
        const res = await addproduct(formData);
        if(res.data.msg === "Product added successfully"){
            setProductData(initialState);
            alert(res.data.msg)
        }
    }

    useEffect(() => {
        if (brandsData) {
            dispatch(setBrands(brandsData.brands));
        }
    }, [brandsData, dispatch]);
    useEffect(() => {
        if (unitsData) {
            dispatch(setUnits(unitsData.units))
        }
    }, [unitsData, dispatch]);
    useEffect(() => {
        if (categoryData) {
            dispatch(setCategory(categoryData.category))
        }
    }, [categoryData, dispatch]);
    useEffect(() => {
        if (subCategoryData) {
            dispatch(setSubCategory(subCategoryData.subcategory))
        }
    }, [subCategoryData, dispatch]);
    useEffect(() => {
        if (productTypeData) {
            dispatch(setProductType(productTypeData.producttype))
        }
    }, [productTypeData, dispatch]);

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Brand Name" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Brands</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>
                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto  mb-4 px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Product Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className=' py-4'>
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            {/* units select optiions */}
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Product Type</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange} value={productData.producttype} name="producttype" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {productType?.map((item) => (
                                                <option key={item._id} value={item.producttype}>
                                                    {item.producttype}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* units select optiions */}

                            {/* units select optiions */}
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="unit">Units</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange} value={productData.unit} name="unit" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {units?.map((item) => (
                                                <option key={item._id} value={item.unit}>
                                                    {item.unit}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* units select optiions */}

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField value={productData.productname}
                                onChangeFunction={handleChange}
                                placeholderText="Product Name"
                                LabelText="Product Name:"
                                inputName="productname"
                                inputType="text"
                            />

                            <InputField value={productData.weight}
                                onChangeFunction={handleChange}
                                placeholderText="Weight"
                                LabelText="Weight:"
                                inputName="weight"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField value={productData.barcode}
                                onChangeFunction={handleChange}
                                placeholderText="Barcode"
                                LabelText="Barcode:"
                                inputName="barcode"
                                inputType="number"
                            />

                            <InputField
                                value={productData.stocklevel}
                                onChangeFunction={handleChange}
                                placeholderText="Stock Level"
                                LabelText="Stock Level:"
                                inputName="stocklevel"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={productData.hscode}
                                onChangeFunction={handleChange}
                                placeholderText="Hscode"
                                LabelText="Hscode:"
                                inputName="hscode"
                                inputType="text"
                            />

                            <InputField
                                value={productData.openingbalance}
                                onChangeFunction={handleChange}
                                placeholderText="Opening Balance"
                                LabelText="Opening Balance:"
                                inputName="openingbalance"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={productData.openingcost}
                                onChangeFunction={handleChange}
                                placeholderText="Opening Cost"
                                LabelText="Opening Cost:"
                                inputName="openingcost"
                                inputType="number"
                            />
                            {/* brands select optiions */}
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="brand">Brand</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange} value={productData.brand} name="brand" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {brands?.map((item) => (
                                                <option key={item._id} value={item.brand}>
                                                    {item.brand}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* brands select optiions */}
                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={productData.retailprice}
                                onChangeFunction={handleChange}
                                placeholderText="Retail Price"
                                LabelText="Retail Price:"
                                inputName="retailprice"
                                inputType="number"
                            />

                            {/* units select optiions */}
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="category">Category</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange} value={productData.category} name="category" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {category?.map((item) => (
                                                <option key={item._id} value={item.category}>
                                                    {item.category}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* units select optiions */}

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={productData.wholesaleprice}
                                onChangeFunction={handleChange}
                                placeholderText="Wholesale Price"
                                LabelText="Wholesale Price:"
                                inputName="wholesaleprice"
                                inputType="number"
                            />

                            {/* units select optiions */}
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="subcategory">Sub Category</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange} value={productData.subcategory} name="subcategory" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            {subCategory?.map((item) => (
                                                <option key={item._id} value={item.subcategory}>
                                                    {item.subcategory}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* units select optiions */}

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={productData.distributionprice}
                                onChangeFunction={handleChange}
                                placeholderText="Distribution Price"
                                LabelText="Distribution Price:"
                                inputName="distributionprice"
                                inputType="number"
                            />

                            <InputField
                                value={productData.costprice}
                                onChangeFunction={handleChange}
                                placeholderText="Cost Price"
                                LabelText="Cost Price:"
                                inputName="costprice"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={productData.remarks}
                                onChangeFunction={handleChange}
                                placeholderText="Remarks"
                                LabelText="Remarks:"
                                inputName="remarks"
                                inputType="text"
                            />


<div className="flex md:flex-row flex-col w-full justify-between md:my-0 my-2 md:gap-20">
      <label className="font-semibold" htmlFor="image" id="image">Image</label>
      <div className="inputBorder w-full py-2 rounded-md max-w-xs">
        <div className="relative full w-full px-2">
            {/* <FaFile id="image" className=""/> */}
          <input onChange={handleImageChange} type="file" name="image" id="image" />
             
        </div>
      </div>

      {/* {image && (
        <div className="mt-4">
          <img src={image} className="w-32 h-32 object-cover rounded-md" />
        </div>
      )} */}
    </div>

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[43%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>{isLoading ? "Processing" : "Add New"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Product;
