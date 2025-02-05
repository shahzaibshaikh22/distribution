import { IoSunnyOutline } from "react-icons/io5";
import { BsMoonStars } from "react-icons/bs";
import { setMode } from "../redux/features/slices/modeSlice"
import { useDispatch, useSelector } from 'react-redux'
const ToggleMode = () => {
    const { modes } = useSelector((state) =>state.mode)
    const dispatch = useDispatch()
    const handleMode = ()=>{
        dispatch(setMode())
    }


  return (
    <button
    onClick={handleMode}
      className={`relative  items-center bg-gray-300 w-16 h-8 rounded-full p-1 transition-colors duration-300`}
    >
      <div
        className={`w-6 h-6 ${modes === "dark" ? 'bg-darkprimary text-white' : 'bg-white text-black'}  rounded-full flex items-center justify-center shadow-md transform transition-transform duration-300`}
        style={{ transform: modes === "dark" ? "translateX(30px)" : "translateX(0)" }}
       
      >
        {modes === "dark" ? <BsMoonStars size={16} /> : <IoSunnyOutline size={16} />}
      </div>
    </button>
  );
};

export default ToggleMode;
