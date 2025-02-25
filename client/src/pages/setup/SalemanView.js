import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import InputField from "../../components/InputField";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import {  setSalemans } from "../../redux/features/slices/setup";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useDeleteSalemanMutation, useGetSalemansQuery, useUpdateSalemanMutation } from "../../redux/features/apiSlices/setup/saleman";

const SalemanView = () => {
    const { salemans } = useSelector((state) => state.setup);
    const dispatch = useDispatch();

    const { data: salemanData, refetch } = useGetSalemansQuery();
    const [deletesaleman] = useDeleteSalemanMutation();
    const [updatesaleman] = useUpdateSalemanMutation()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSaleman, setSelectedSaleman] = useState(null);
    const [saleman, setSaleman] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        if (salemanData) {
            dispatch(setSalemans(salemanData));
        }
    }, [dispatch, salemanData, refetch]);

    const handleDelete = async (id) => {
        const res = await deletesaleman(id);
        if (res.data.msg) {
            alert(res.data.msg);
            refetch();
        }
    };

    const handleEdit = (saleman) => {
        setSelectedSaleman(saleman);
        setSaleman(saleman.saleman);
        setCode(saleman.code);
        setIsModalOpen(true);

    };

    const handleUpdate = async () => {
        if (selectedSaleman) {
            await updatesaleman({ id: selectedSaleman._id.toString(), saleman });
            setIsModalOpen(false);
              refetch();
        }
    };

    return (
        <div className="w-full flex text-white px-4">
            <div className="w-full">
                <TopBar />
                <SectionBar sectionHeading="Salesmans" secRedirect={"/add-saleman"} view="/saleman-view" />

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
                            {salemans?.map((s) => (
                                <tr key={s._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className=" px-4 py-2">{s.code}</td>
                                    <td className=" px-4 py-2">{s.saleman}</td>
                                    <td className=" px-4 py-2">{s.code}</td>
                                    <td className=" flex items-center gap-2 px-4 py-2">
                                        <button onClick={() => handleDelete(s._id.toString())} className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                                            <FaTrashAlt />
                                        </button>
                                        <button onClick={() => handleEdit(s)} className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
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
                            <h2 className="text-lg font-bold mb-4">Edit Saleman</h2>
                            <InputField
                                value={saleman}
                                onChangeFunction={(e) => setSaleman(e.target.value)}
                                placeholderText="Saleman Name"
                                LabelText="Saleman Name:"
                                inputName="saleman"
                                inputType="text"
                            />
                            <InputField
                                placeholderText="code"
                                value={code}
                                readOnly
                                onChangeFunction={(e) => e.target.value}
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

export default SalemanView;