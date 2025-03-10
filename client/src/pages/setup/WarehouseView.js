import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import InputField from "../../components/InputField";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteWarehouseMutation, useGetWarehouseQuery, useUpdateWaurehouseMutation } from "../../redux/features/apiSlices/setup/warehouse";
import { setWarehouses } from "../../redux/features/slices/productSlice";

const WarehouseView = () => {
  const { warehouses } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { data: warehouseData, refetch } = useGetWarehouseQuery();

  const [deletewarehouse] = useDeleteWarehouseMutation();
  const [updatewarehouse] = useUpdateWaurehouseMutation()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [warehouse, setWarehouse] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (warehouseData) {
      dispatch(setWarehouses(warehouseData.warehouse));
      console.log(warehouseData.warehouse);
      
    }
  }, [dispatch, warehouseData, refetch]);

  const handleDelete = async (id) => {
    const res = await deletewarehouse(id);
    if (res.data.msg) {
      alert(res.data.msg);
      refetch();
    }
  };

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouse(warehouse.warehouse);
    setCode(warehouse.code);
    setIsModalOpen(true);
    
  };

  const handleUpdate = async () => {
    if (selectedWarehouse) {
    const res =   await updatewarehouse({ id: selectedWarehouse._id.toString(), warehouse });
    if(res.data.msg){
        alert(res.data.msg)
        setIsModalOpen(false);
    }
    }
  };

  return (
    <div className="w-full flex text-white px-4">
      <div className="w-full">
        <TopBar />
        <SectionBar sectionHeading="Warehouses"  secRedirect="/warehouse" view="/warehouse-view"/>

        <div className="w-full my-4 rounded-md p-6 bg-white text-gray-800">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="bg-gray-100">
                <th className=" px-4 py-2">#Serial No</th>
                <th className=" px-4 py-2">Name</th>
                <th className=" px-4 py-2">Code</th>
                <th className=" px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {warehouses?.map((w,index) => (
                <tr key={w._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className=" px-4 py-2">{index +1 }</td>
                  <td className=" px-4 py-2">{w.warehouse}</td>
                  <td className=" px-4 py-2">{w.code}</td>
                  <td className=" flex items-center gap-2 px-4 py-2">
                    <button onClick={() => handleDelete(w._id.toString())} className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                    <FaTrashAlt />
                    </button>
                    <button onClick={() => handleEdit(w)} className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
                    <FaPencilAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white flex flex-col  items-center gap-2 p-6 rounded-md shadow-md md:w-[40%] w-[80%] text-black">
              <h2 className="text-lg font-bold mb-4">Edit Warehouse</h2>
             <InputField
              value={warehouse}
              onChangeFunction={(e)=>setWarehouse(e.target.value)}
              placeholderText="Warehouse"
              LabelText="Warehouse:"
              inputName="warehouse"
              inputType="text"
             />
             <InputField
                    placeholderText="code"
                  value={code}
                  readOnly
                  onChangeFunction={(e)=>e.target.value}
                  LabelText="Code:"
                  inputName="address"
                  inputType="text"
             />
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

export default WarehouseView;