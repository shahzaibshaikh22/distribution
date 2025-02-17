import React, {useState} from "react"
import { HiDotsHorizontal } from "react-icons/hi"

const OrderStatus = ({ id, handleDelivered, step }) => {
    const [showOptions, setShowOptions] = useState(false);

   

    return (
        <div className="relative">
            <span onClick={() => setShowOptions(!showOptions)} className="text-sm px-2 py-1 rounded-sm text-black cursor-pointer">
                <HiDotsHorizontal />
            </span>

            {showOptions && (
                <div className="absolute z-10 right-0 mt-2 w-40 bg-white shadow-md rounded-md border">
                    {step === 1 &&(
                        <button
                        onClick={() => {
                            handleDelivered(id); 
                            setShowOptions(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        In process
                    </button>
                    )}
                   {step === 2&&(
                     <button
                     onClick={() => {
                         handleDelivered(id); 
                         setShowOptions(false);
                     }}
                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                 >
                     Ready to ship
                 </button>
                   )}
                    {step === 3 &&(
                        <button
                        onClick={() => {
                            handleDelivered(id); 
                            setShowOptions(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Mark as delivered
                    </button>
                    )}
                    {step === 4 &&(
                        <button
                        onClick={() => {
                            handleDelivered(id); 
                            setShowOptions(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Order completed
                    </button>
                    )}
                    <button
                        onClick={() => setShowOptions(false)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderStatus
