import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import InputField from "../../components/InputField";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { setPattyCategory, setTowns } from "../../redux/features/slices/setup";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteCategoryMutation, useGetPattyCategoryQuery, useUpdatePattyCategoryMutation } from "../../redux/features/apiSlices/setup/pattyexpencecategory";

const PattyCategoryView = () => {
  const { pattyExpenceCategory } = useSelector((state) => state.setup);
  const dispatch = useDispatch();

  const { data: pattyCategoryData, refetch } = useGetPattyCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdatePattyCategoryMutation()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (pattyCategoryData) {
      dispatch(setPattyCategory(pattyCategoryData));
    }
  }, [dispatch, pattyCategoryData, refetch]);

  const handleDelete = async (id) => {
    const res = await deleteCategory(id);
    if (res.data.msg) {
      alert(res.data.msg);
      refetch();
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategory(category.category);
    setCode(category.code);
    setIsModalOpen(true);

  };

  const handleUpdate = async () => {
    if (selectedCategory) {
      await updateCategory({ id: selectedCategory._id.toString(), category });
      setIsModalOpen(false);
      //   refetch();
    }
  };

  return (
    <div className="w-full flex text-white px-4">
      <div className="w-full">
        <TopBar />
        <SectionBar sectionHeading="Patty Category" secRedirect="/add-patty-category" view="/patty-category-view" />

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
              {pattyExpenceCategory?.map((t,index) => (
                <tr key={t._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className=" px-4 py-2">{index + 1}</td>
                  <td className=" px-4 py-2">{t.category}</td>
                  <td className=" px-4 py-2">{t.code}</td>
                  <td className=" flex items-center gap-2 px-4 py-2">
                    <button onClick={() => handleDelete(t._id.toString())} className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                      <FaTrashAlt />
                    </button>
                    <button onClick={() => handleEdit(t)} className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
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
              <h2 className="text-lg font-bold mb-4">Edit Town</h2>
              <InputField
                value={category}
                onChangeFunction={(e) => setCategory(e.target.value)}
                placeholderText="Category"
                LabelText="Category:"
                inputName="category"
                inputType="text"
              />
              <InputField
                placeholderText="code"
                value={code}
                readOnly
                onChangeFunction={(e) => e.target.value}
                LabelText="Code:"
                inputName="code"
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

export default PattyCategoryView;