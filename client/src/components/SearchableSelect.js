import { useEffect, useState } from "react";



const  SearchableSelect =({products,selected,setSelected,setSelectedId}) => {
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = products?.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

    // // Select / Deselect Product
    // const handleSelect = (product) => {
    //     setSelected((prev) =>
    //       prev.includes(product)
    //         ? prev.filter((item) => item !== product) // Remove if already selected
    //         : [...prev, product] // Add if not selected
    //     );
    //   };

    const handleSelect = (product) => {
        setSelected((prev) =>
          prev.some((item) => item.id === product.id)
            ? prev.filter((item) => item.id !== product.id) // Deselect
            : [...prev, product] // Select
        );
        setSelectedId((prev) =>
          prev.some((item) => item.id === product.id)
            ? prev.filter((item) => item.id !== product.id) // Deselect
            : [...prev, product.id] // Select
        );
      };


  return (
    <div className="relative w-64">
      {/* Selected Value (Dropdown Button) */}
      <button
      type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-gray-300 bg-white rounded-md text-left flex justify-between items-center"
      >
        Select an item
        <span className="ml-2">&#9662;</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border-b border-gray-200 outline-none"
          />

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(product)}
                  className={`p-2 cursor-pointer ${
                    selected.includes(product)
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {product.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default SearchableSelect
