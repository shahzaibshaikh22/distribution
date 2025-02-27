import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
const NestedSidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 space-y-2">
      {/* Parent Item */}
      <div className="relative">
        <button
          onClick={() => toggleMenu("menu1")}
          className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
        >
          Menu 1
          <FaChevronRight
            className={`w-4 h-4 transform transition-all ${
              openMenus["menu1"] ? "rotate-90" : ""
            }`}
          />
        </button>

        {/* First Dropdown */}
        <div
          className={`absolute left-full top-0 ml-2 bg-gray-800 w-48 p-2 rounded-md shadow-lg transition-all duration-300 ease-in-out origin-left ${
            openMenus["menu1"] ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={() => toggleMenu("submenu1")}
            className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            Submenu 1
            <FaChevronRight
              className={`w-4 h-4 transform transition-all ${
                openMenus["submenu1"] ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Second Nested Dropdown */}
          <div
            className={`absolute left-full top-0 ml-2 bg-gray-700 w-40 p-2 rounded-md shadow-lg transition-all duration-300 ease-in-out origin-left ${
              openMenus["submenu1"]
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
          >
            <button className="w-full px-3 py-2 rounded-md hover:bg-gray-600 transition-all">
              Submenu 1.1
            </button>
            <button className="w-full px-3 py-2 rounded-md hover:bg-gray-600 transition-all">
              Submenu 1.2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedSidebar;
