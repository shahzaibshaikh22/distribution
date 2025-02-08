import React, { useState } from "react";

const PurchaseOrderForm = ({ products, vendors, warehouses }) => {
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [dcNo, setDcNo] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    if (!productId) return;
    
    const product = products.find((p) => p._id === productId);
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p._id === product._id);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1, total: product.costprice }];
    });
  };

  const updateQuantity = (id, increment) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p._id === id
          ? {
              ...p,
              quantity: Math.max(1, p.quantity + increment),
              total: p.costprice * Math.max(1, p.quantity + increment),
            }
          : p
      )
    );
  };

  const deleteProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const totalAmount = selectedProducts.reduce((sum, p) => sum + p.total, 0);

  const handleSubmit = async () => {
    const order = {
      vendor: selectedVendor,
      warehouse: selectedWarehouse,
      vehicleNo,
      dcNo,
      products: selectedProducts.map(({ _id, quantity, total }) => ({
        product: _id,
        quantity,
        price: total,
      })),
      totalAmount,
    };
    console.log("Submitting Order:", order);
    // Backend API Call Here
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Purchase Order</h2>
      <div className="grid grid-cols-2 gap-4">
        <select value={selectedWarehouse} onChange={(e) => setSelectedWarehouse(e.target.value)}>
          <option value="">Select Warehouse</option>
          {warehouses?.map((wh) => (
            <option key={wh.id} value={wh.warehouse}>{wh.warehouse}</option>
          ))}
        </select>
        <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
          <option value="">Select Vendor</option>
          {vendors?.map((v) => (
            <option key={v.id} value={v.vendor}>{v.vendor}</option>
          ))}
        </select>
        <input type="text" placeholder="Vehicle No" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} />
        <input type="text" placeholder="DC No" value={dcNo} onChange={(e) => setDcNo(e.target.value)} />
      </div>

      <h3 className="mt-4 text-lg font-semibold">Select Product</h3>
      <select onChange={handleProductSelect} className="w-full p-2 border">
        <option value="">Select a Product</option>
        {products?.map((product) => (
          <option key={product._id} value={product._id}>{product.productname}</option>
        ))}
      </select>

      <h3 className="mt-4 text-lg font-semibold">Selected Products</h3>
      <table className="w-full mt-2 border bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Product</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.productname}</td>
              <td className="p-2">
                <button className="px-2 bg-gray-200" onClick={() => updateQuantity(p._id, -1)}>-</button>
                <span className="px-2">{p.quantity}</span>
                <button className="px-2 bg-gray-200" onClick={() => updateQuantity(p._id, 1)}>+</button>
              </td>
              <td className="p-2">Rs. {p.total}</td>
              <td className="p-2">
                <button className="px-2 bg-red-500 text-white" onClick={() => deleteProduct(p._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="mt-2 text-lg font-bold">Total Amount: Rs.{totalAmount}</h3>

      <div className="mt-4">
        <button onClick={() => setShowInvoice(true)} className="mr-2 p-2 bg-blue-500 text-white">View Invoice</button>
        <button onClick={handleSubmit} className="p-2 bg-green-500 text-white">Submit Order</button>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Invoice</h2>
            <p><strong>Vendor:</strong> {selectedVendor}</p>
            <p><strong>Warehouse:</strong> {selectedWarehouse}</p>
            <p><strong>Vehicle No:</strong> {vehicleNo}</p>
            <p><strong>DC No:</strong> {dcNo}</p>
            <hr className="my-2" />
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Product</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((p) => (
                  <tr key={p._id} className="border-t">
                    <td className="p-2">{p.productname}</td>
                    <td className="p-2">{p.quantity}</td>
                    <td className="p-2">Rs. {p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="mt-2 text-lg font-bold text-right">Total: Rs.{totalAmount}</h3>
            <div className="mt-4 text-right">
              <button onClick={() => setShowInvoice(false)} className="px-4 py-2 bg-gray-500 text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrderForm;
