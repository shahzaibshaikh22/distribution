import { FaChevronDown } from "react-icons/fa";
const SelectBox = ({ options,onChangeFunction,value }) => {
    return (
      <div className="relative full">
        <select onChange={onChangeFunction} value={value} className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
          {options.map((option, index) => (
            <option key={index} value={option} className="bg-gray-300">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <FaChevronDown/>
        </div>
      </div>
    );
  };
  
  export default SelectBox;
  