import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = ({ 
    modes, links, menuText, sideBarCollapes, menuIcon, 
    openDropdown, setOpenDropdown 
}) => {
    const isOpen = openDropdown === menuText;
    const location = useLocation();
    const dropdownRef = useRef(null);

    // Check if any link inside the dropdown is active
    const isAnyLinkActive = links.some(link => location.pathname === link.path);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [setOpenDropdown]);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown Button */}
            <div 
                onClick={(event) => {
                    event.stopPropagation(); // Prevent closing when clicking inside
                    setOpenDropdown(isOpen ? null : menuText);
                }}
                className={`flex items-center gap-5 p-2 rounded-full cursor-pointer w-full transition-all
                    ${sideBarCollapes === "show" ? "" : "justify-center"}
                    ${modes === "dark" ? 
                        (isOpen || isAnyLinkActive ? "bg-darkprimary text-white" : "text-white hover:bg-darkprimary") :
                        (isOpen || isAnyLinkActive ? "bg-gray-300 text-black" : "text-black hover:bg-lightsecondary")
                    }
                `}
            >
                {/* Icon Container - Stays Active If Any Dropdown Link is Active */}
                <div className={`w-6 h-6 flex items-center justify-center rounded-full transition-all
                    
                `}>
                    {menuIcon}
                </div>

                <span className={`${sideBarCollapes === "show" ? "block" : "hidden"} text-xs`}>
                    {menuText}
                </span>
            </div>

            {/* Dropdown Links */}
            {isOpen && (
                <div 
                    className={` px-2 absolute h-64 overflow-y-auto left-full top-0 bg-white shadow-md rounded-md w-48 py-2 z-50 
                        ${modes === "dark" ? "bg-darksecondary text-white" : "bg-white text-black"}
                    `}
                    onClick={(event) => event.stopPropagation()} // Prevent closing when clicking inside
                >
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;

                        return (
                            <Link 
                                key={link.id} 
                                to={link.path} 
                                className={`block border-b text-xs px-4 py-2 hover:bg-gray-200 
                                    ${isActive ? "bg-gray-300  font-bold" : ""}
                                `}
                                onClick={() => setOpenDropdown(null)} // Close dropdown on link click
                            >
                                {link.text}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
