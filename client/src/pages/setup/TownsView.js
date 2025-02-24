import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import InputField from "../../components/InputField";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { setTowns } from "../../redux/features/slices/setup";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteTownMutation, useGetTownsQuery, useUpdateTownMutation } from "../../redux/features/apiSlices/setup/town";

const TownsView = () => {
  const { towns } = useSelector((state) => state.setup);
  const dispatch = useDispatch();

  const { data: townsData, refetch } = useGetTownsQuery();
  const [deleteTown] = useDeleteTownMutation();
  const [updateTown] = useUpdateTownMutation()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTown, setSelectedTown] = useState(null);
  const [townname, setTownName] = useState("");
  const [townCode, setTownCode] = useState("");

  useEffect(() => {
    if (townsData) {
      dispatch(setTowns(townsData));
    }
  }, [dispatch, townsData, refetch]);

  const handleDelete = async (id) => {
    const res = await deleteTown(id);
    if (res.data.msg) {
      alert(res.data.msg);
      refetch();
    }
  };

  const handleEdit = (town) => {
    setSelectedTown(town);
    setTownName(town.townname);
    setTownCode(town.code);
    setIsModalOpen(true);
    
  };

  const handleUpdate = async () => {
    if (selectedTown) {
      await updateTown({ id: selectedTown._id.toString(), townname });
      setIsModalOpen(false);
    //   refetch();
    }
  };

  return (
    <div className="w-full flex text-white px-4">
      <div className="w-full">
        <TopBar />
        <SectionBar sectionHeading="Towns" />

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
              {towns?.map((t) => (
                <tr key={t._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className=" px-4 py-2">{t.code}</td>
                  <td className=" px-4 py-2">{t.townname}</td>
                  <td className=" px-4 py-2">{t.code}</td>
                  <td className=" flex items-center gap-2 px-4 py-2">
                    <FaTrashAlt onClick={() => handleDelete(t._id.toString())} className="text-red-600 cursor-pointer" />
                    <FaPencilAlt onClick={() => handleEdit(t)} className="text-blue-600 cursor-pointer" />
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
              value={townname}
              onChangeFunction={(e)=>setTownName(e.target.value)}
              placeholderText="Town Name"
              LabelText="Town Name:"
              inputName="townname"
              inputType="text"
             />
             <InputField
                    placeholderText="code"
                  value={townCode}
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

export default TownsView;