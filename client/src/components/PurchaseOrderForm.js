import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { usePurchaseOrderMutation } from "../redux/features/apiSlices/purchase/purchaseOrderSlice";

const PurchaseOrderForm = ({ products, vendors, warehouses }) => {
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [vehicleno, setVehicleNo] = useState("");
  const [dcno, setDcNo] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef();

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

  useEffect(() => {
    setTotalAmount(selectedProducts.reduce((sum, p) => sum + p.total, 0));
  }, [selectedProducts,totalAmount]);

  const printInvoice = () => {
    window.print();
  };

  const downloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    });
  };

  const orderData = {
    vendor: selectedVendor, // This should be a valid ObjectId
    warehouse: selectedWarehouse, // This should be a valid ObjectId
    vehicleno,
    dcno,
    products: selectedProducts.map((p) => ({
      product: p._id.toString(), // Ensuring only product ID is sent
      quantity: p.quantity,
      total: p.total,
    })),
    totalAmount,
  };

  const [purchaseOrder] = usePurchaseOrderMutation();

  const handlePurchaseOrder = async (e) => {
    try {
      e.preventDefault();
      const res = await purchaseOrder(orderData)
  
      if (res) {
        console.log("Order Created Successfully:", res);
        alert("Purchase Order Created Successfully!");
      }
    } catch (error) {
      console.error("Error Creating Purchase Order:", error);
      alert("Failed to create purchase order. Please check the data.");
    }
  };

  return (
    <form onSubmit={handlePurchaseOrder} className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Purchase Order</h2>
      <div className="grid grid-cols-2 gap-4">
        <select value={selectedWarehouse} name="warehouse" onChange={(e) => setSelectedWarehouse(e.target.value)}>
          <option value="">Select Warehouse</option>
          {warehouses?.map((wh) => (
            <option key={wh.id} value={wh.warehouse}>{wh.warehouse}</option>
          ))}
        </select>
        <select value={selectedVendor} name="vendor" onChange={(e) => setSelectedVendor(e.target.value)}>
          <option value="">Select Vendor</option>
          {vendors?.map((v) => (
            <option key={v.id} value={v.vendor}>{v.vendor}</option>
          ))}
        </select>
        <input type="text" value={vehicleno} onChange={(e)=>setVehicleNo(e.target.value)} name="vehicleno" placeholder="vehicleno" />
        <input type="text" value={dcno} onChange={(e)=>setDcNo(e.target.value)} name="dcno" placeholder="dcno" />
      </div>

      <h3 className="mt-4 text-lg font-semibold">Select Product</h3>
      <select onChange={handleProductSelect} name="product" className="w-full p-2 border">
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
                <button type="button" onClick={() => updateQuantity(p._id, -1)}>-</button>
                <span className="px-2">{p.quantity}</span>
                <button type="button" onClick={() => updateQuantity(p._id, 1)}>+</button>
              </td>
              <td className="p-2">Rs. {p.total}</td>
              <td className="p-2">
                <button type="button" onClick={() => deleteProduct(p._id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="mt-2 text-lg font-bold">Total Amount: Rs.{totalAmount}</h3>

      <button type="button" onClick={() => setShowInvoice(true)} className="p-2 bg-blue-500 text-white">View Invoice</button>
      <button type="submit" className="p-2 bg-blue-500 text-white">create order</button>

      {showInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={invoiceRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Invoice</h2>
            <p><strong>Vendor:</strong> {selectedVendor}</p>
            <p><strong>Warehouse:</strong> {selectedWarehouse}</p>
            <p><strong>Vehicle No:</strong> {vehicleno}</p>
            <p><strong>DC No:</strong> {dcno}</p>
            <table className="w-full border mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((p) => (
                  <tr key={p._id}>
                    <td>{p.productname}</td>
                    <td>{p.quantity}</td>
                    <td>Rs. {p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="mt-2 text-lg font-bold text-right">Total: Rs.{totalAmount}</h3>
            <button onClick={printInvoice} className="mr-2 bg-blue-500 text-white px-4 py-2">Print</button>
            <button onClick={downloadPDF} className="bg-green-500 text-white px-4 py-2">Download PDF</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default PurchaseOrderForm;
