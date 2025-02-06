// import React, { useEffect, useState } from "react";
// import TopBar from "../../components/TopBar";
// import { useDeleteProductMutation, useGetProductsQuery } from "../../redux/features/apiSlices/product/productApiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setProducts } from "../../redux/features/slices/productSlice";



// const ProductRow = ({ product,handleDelete,isUpdate,setIsUpdate,handleEdit }) => (
//   <>
//     <tr className="border-b">
//     <td className="py-3 text-xs px-4">
//       <img className="w-10 h-10 object-cover rounded-sm drop-shadow-sm" src={`http://localhost:5000/uploads/${product.image}`} alt={product.image} />
//     </td>
//     <td className="py-3 text-xs px-4">{product.productname}</td>
//     <td className="py-3 text-xs px-4">{product.brand}</td>
//     <td className="py-3 text-xs px-4">
//       <span className={`px-3 py-1 text-sm rounded-full `}>{product.category}</span>
//     </td>
//     <td className="py-3 text-xs px-4">{product.barcode}</td>
//     <td className="py-3 text-xs px-4">{product.stocklevel}</td>
//     <td className="py-3 text-xs px-4">Rs-{product.wholesaleprice}</td>
//     <td className="py-3 text-xs px-4">Rs-{product.costprice}</td>
//     <td className="py-3 text-xs px-4">Rs-{product.openingcost}</td>
//     <td className="py-3 text-xs px-4">{product.date}</td>
//     <td className="py-3 text-xs px-4">
//       <button onClick={()=>handleEdit(product)} className="px-2 py-1 rounded-md bg-green-400">Edit</button>
//       <button onClick={()=>handleDelete(product._id.toString())}  className="px-2 py-1 rounded-md bg-red-400">delete</button>
//     </td>
//   </tr>

//   {isUpdate && (
//         <div className={`w-full transition-all duration-150 ease-linear ${isUpdate ? 'translate-x-0 ' : '-translate-x-[-100%]'} max-w-7xl mx-auto fixed top-5  md:h-[95%] h-auto bg-white drop-shadow-md rounded-md`}>
//           <span className="absolute top-2 right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-md cursor-pointer" onClick={()=>setIsUpdate(false)}>x</span>

//           <div className="w-full h-full ">
//             <h3>Edit Product {product.stocklevel}</h3>
//           </div>
//           </div>
//       )}
//   </>
// );

// const ViewProducts = () => {

//   const {products} = useSelector((state)=>state.product)
//   const dispatch = useDispatch()
//   const handleEdit = async (product)=>{
//     setIsUpdate(!isUpdate)
//     console.log(product._id);
//   }
//   const [isUpdate, setIsUpdate] = useState(false)


// // products query fetching products
// const {data:productsData} = useGetProductsQuery();

// const [deleteproduct, {isLoading}] = useDeleteProductMutation()


//  // delete product
//  const handleDelete = async(id)=>{
//   const res = await deleteproduct(id)
//   if(res){
//    dispatch(setProducts(products.filter((product) => product._id !== id))) 
//   }
// }

// useEffect(()=>{
//   if(productsData){
//     dispatch(setProducts(productsData.products))
//   }
// },[productsData,dispatch,products])
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 10;

//   // Get current products based on the page
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Handle the load more functionality (pagination)
//   const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
//   const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

//   return (
//     <>
//       <TopBar />
//       <div className="p-6 bg-white shadow rounded-lg">
//         <div className="flex justify-between mb-4 flex-wrap">
//           <h2 className="text-xl font-semibold w-full sm:w-auto">Products</h2>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 sm:mt-0">Add Product</button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 text-xs px-4">Product</th>
//                 <th className="py-3 text-xs px-4">Name</th>
//                 <th className="py-3 text-xs px-4">Brand</th>
//                 <th className="py-3 text-xs px-4">Category</th>
//                 <th className="py-3 text-xs px-4">Barcode</th>
//                 <th className="py-3 text-xs px-4">Stock</th>
//                 <th className="py-3 text-xs px-4">Wholesale Price</th>
//                 <th className="py-3 text-xs px-4">Cost Price</th>
//                 <th className="py-3 text-xs px-4">Openinng Price</th>
//                 <th className="py-3 text-xs px-4">CREATED AT</th>
//                 <th className="py-3 text-xs px-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentProducts.map((product, index) => (
//                 <ProductRow handleEdit={handleEdit} isUpdate={isUpdate} setIsUpdate={setIsUpdate} key={index} handleDelete={()=>handleDelete()} product={product} />
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {products.length > 10 && (
//           <div className="flex gap-4 mt-4 justify-center sm:justify-start">
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 1}
//               className="bg-gray-500 text-white rounded-full px-4 py-2 drop-shadow-sm disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <button
//               onClick={nextPage}
//               disabled={indexOfLastProduct >= products.length}
//               className="bg-blue-700 text-white rounded-full px-4 py-2 drop-shadow-sm disabled:opacity-50"
//             >
//               Load More
//             </button>
//           </div>
//         )}
//       </div>

     
//     </>
//   );
// };

// export default ViewProducts;



import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "../../redux/features/apiSlices/product/productApiSlice";
import { setBrands, setCategory, setProductType, setSubCategory, setUnits } from "../../redux/features/slices/productSlice";

import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/features/slices/productSlice";
import InputField from "../../components/InputField";
import { useGetBrandsQuery } from "../../redux/features/apiSlices/product/brandSlice";
import { useGetUnitsQuery } from "../../redux/features/apiSlices/product/unitSlice";
import { useGetCategoryQuery } from "../../redux/features/apiSlices/product/categorySlice";
import { useGetSubCategoryQuery } from "../../redux/features/apiSlices/product/subCategorySlice";
import { useGetProductTypeQuery } from "../../redux/features/apiSlices/product/productTypeApiSlice";
import { FaChevronDown } from "react-icons/fa";


const ProductRow = ({ product, handleDelete, handleEdit }) => (
  <>
    <tr className="border-b">
      <td className="py-3 text-xs px-4">
        <img className="w-10 h-10 object-cover rounded-sm drop-shadow-sm" src={`http://localhost:5000/uploads/${product.image}`} alt={product.image} />
      </td>
      <td className="py-3 text-xs px-4">{product.productname}</td>
      <td className="py-3 text-xs px-4">{product.brand}</td>
      <td className="py-3 text-xs px-4">
        <span className="px-3 py-1 text-sm rounded-full">{product.category}</span>
      </td>
      <td className="py-3 text-xs px-4">{product.barcode}</td>
      <td className="py-3 text-xs px-4">{product.stocklevel}</td>
      <td className="py-3 text-xs px-4">Rs-{product.wholesaleprice}</td>
      <td className="py-3 text-xs px-4">Rs-{product.costprice}</td>
      <td className="py-3 text-xs px-4">Rs-{product.openingcost}</td>
      <td className="py-3 text-xs px-4">{product.date}</td>
      <td className="py-3 text-xs px-4">
        <button onClick={() => handleEdit(product)} className="px-2 py-1 rounded-md bg-green-400">Edit</button>
        <button onClick={() => handleDelete(product._id)} className="px-2 py-1 rounded-md bg-red-400">Delete</button>
      </td>
    </tr>
  </>
);

const ViewProducts = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

     const { brands, units, category, subCategory, productType } = useSelector((state) => state.product)
  
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
  
  // Edit ke liye state
  const [isUpdate, setIsUpdate] = useState(false);
  const [editProduct, setEditProduct] = useState(null); 

  const handleChange = (e)=>{
    setEditProduct({...editProduct, [e.target.name]: e.target.value})
  }

   // Handle image change
   const handleImageChange = (e) => {
    setEditProduct({ ...editProduct, image: e.target.files[0] });    
};

  // handleEdit function
  const handleEdit = (product) => {
    setEditProduct(product);
    setIsUpdate(true);
  };
  const [updateproduct, {isLoading}] = useUpdateProductMutation();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    for (const key in editProduct) {
        formData.append(key, editProduct[key]);
    }
     // Ensure editProduct and editProduct._id exist
  if (!editProduct || !editProduct._id) {
    console.error("Product ID is missing or invalid:", editProduct);
    return;
  }
    const res = await updateproduct(editProduct);
    if(res.data.msg){
      setIsUpdate(false)
    }
  }

  // Products query fetching products
  const { data: productsData } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  // Delete product function
  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res) {
        dispatch(setProducts(products.filter((product) => product._id !== id)));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData.products));
    }
  }, [productsData,editProduct, dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Get current products based on the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

  // Handle the load more functionality (pagination)
  const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  return (
    <>
      <TopBar />
      <div className="p-6 bg-white shadow rounded-lg">
        <div className="flex justify-between mb-4 flex-wrap">
          <h2 className="text-xl font-semibold w-full sm:w-auto">Products</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 sm:mt-0">Add Product</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Product</th>
                <th className="py-3 text-xs px-4">Name</th>
                <th className="py-3 text-xs px-4">Brand</th>
                <th className="py-3 text-xs px-4">Category</th>
                <th className="py-3 text-xs px-4">Barcode</th>
                <th className="py-3 text-xs px-4">Stock</th>
                <th className="py-3 text-xs px-4">Wholesale Price</th>
                <th className="py-3 text-xs px-4">Cost Price</th>
                <th className="py-3 text-xs px-4">Opening Price</th>
                <th className="py-3 text-xs px-4">Created At</th>
                <th className="py-3 text-xs px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
        {products.length > 10 && (
          <div className="flex gap-4 mt-4 justify-center sm:justify-start">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-500 text-white rounded-full px-4 py-2 drop-shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={indexOfLastProduct >= products.length}
              className="bg-blue-700 text-white rounded-full px-4 py-2 drop-shadow-sm disabled:opacity-50"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {isUpdate && editProduct && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-full max-w-7xl bg-white p-6 rounded-md shadow-md">
          <button onClick={() => setIsUpdate(false)} className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded">X</button>
          <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
          <form onSubmit={handleSubmit} className=' py-4'>
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            {/* units select optiions */}
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Product Type</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select onChange={handleChange} value={editProduct.producttype} name="producttype" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
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
                                        <select onChange={handleChange} value={editProduct.unit} name="unit" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
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
                            <InputField value={editProduct.productname}
                                onChangeFunction={handleChange}
                                placeholderText="Product Name"
                                LabelText="Product Name:"
                                inputName="productname"
                                inputType="text"
                            />

                            <InputField value={editProduct.weight}
                                onChangeFunction={handleChange}
                                placeholderText="Weight"
                                LabelText="Weight:"
                                inputName="weight"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField value={editProduct.barcode}
                                onChangeFunction={handleChange}
                                placeholderText="Barcode"
                                LabelText="Barcode:"
                                inputName="barcode"
                                inputType="number"
                            />

                            <InputField
                                value={editProduct.stocklevel}
                                onChangeFunction={handleChange}
                                placeholderText="Stock Level"
                                LabelText="Stock Level:"
                                inputName="stocklevel"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={editProduct.hscode}
                                onChangeFunction={handleChange}
                                placeholderText="Hscode"
                                LabelText="Hscode:"
                                inputName="hscode"
                                inputType="text"
                            />

                            <InputField
                                value={editProduct.openingbalance}
                                onChangeFunction={handleChange}
                                placeholderText="Opening Balance"
                                LabelText="Opening Balance:"
                                inputName="openingbalance"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={editProduct.openingcost}
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
                                        <select onChange={handleChange} value={editProduct.brand} name="brand" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
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
                                value={editProduct.retailprice}
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
                                        <select onChange={handleChange} value={editProduct.category} name="category" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
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
                                value={editProduct.wholesaleprice}
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
                                        <select onChange={handleChange} value={editProduct.subcategory} name="subcategory" className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
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
                                value={editProduct.distributionprice}
                                onChangeFunction={handleChange}
                                placeholderText="Distribution Price"
                                LabelText="Distribution Price:"
                                inputName="distributionprice"
                                inputType="number"
                            />

                            <InputField
                                value={editProduct.costprice}
                                onChangeFunction={handleChange}
                                placeholderText="Cost Price"
                                LabelText="Cost Price:"
                                inputName="costprice"
                                inputType="number"
                            />

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                value={editProduct.remarks}
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
          <input onChange={handleImageChange}  type="file" name="image" id="image" />
             
        </div>
      </div>
    </div>

                        </div>

                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[43%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>{isLoading ? "updating" :"update"}</button>
                        </div>
                    </form>
        </div>
      )}
    </>
  );
};

export default ViewProducts;

