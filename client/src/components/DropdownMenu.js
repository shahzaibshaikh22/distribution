import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = ({ links, menuText, menuIcon, sideBarCollapes, modes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={` transition-all duration-500 ease-in-out rounded-md h-auto ${isOpen} ${modes === "dark" ? 'text-white hover:bg-darkprimary' : 'text-black hover:bg-lightsecondary'}`} ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full  flex justify-between rounded-full p-2`}>
                <div className="w-6 h-6 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6">
                        {menuIcon}
                    </div>
                    <span className={`text-xs pl-5 mt-1   ${sideBarCollapes === "show" ? "block" : "hidden"}`}>
                    {menuText}
                </span>
                </div>
                { sideBarCollapes === "show" ? isOpen ? ( <FaChevronDown className="pt-2  h-full"/>) : (<FaChevronRight className="pt-2  h-full"/>) : ''}
               
                
            </div>

            {isOpen && (
                <div className=" text-xs mt-2 w-32 ml-12 z-10">
                    {links.map((link) => (
                        <Link
                            to={link.path}
                            key={link.id}
                            className={`w-full flex items-center gap-5 p-1 rounded-sm cursor-pointer transition 
                ${sideBarCollapes === "show" ? "" : "justify-center"}
                ${modes === "dark"
                                    ? location.pathname === link.path
                                        ? "bg-grayPrimary text-white"  // Active state in dark mode
                                        : "text-white hover:bg-darkprimary"
                                    : location.pathname === link.path
                                        ? "bg-lightsecondary text-black"  // Active state in light mode
                                        : "text-black hover:bg-lightsecondary"
                                }
              `}
                        >

                            {link.text}

                        </Link>
                    ))}
                </div>
            )}

        </div>
    );
};

export default DropdownMenu;
