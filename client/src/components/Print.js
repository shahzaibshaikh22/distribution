import React from "react";

const Print = () => {
  return (
    <div className="container mx-auto mt-4 p-4 border print:w-full">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <img src="logo.png" alt="Company Logo" className="w-32" />
        <h5 className="text-xl font-bold text-center">
          HZINS International (Pvt.) Ltd.<br /> Hyderabad
        </h5>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold">Process Order For Packaging</h3>
      </div>

      {/* Process Order Details */}
      <div className="flex justify-between my-4">
        <div>
          <p>Process Order NO <br /> 8300020</p>
        </div>
        <div className="text-right">
          <p>PO Released Date <br /> 20-Jan-2025</p>
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full border border-gray-300 text-center text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Product Code</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Batch Size</th>
            <th className="border border-gray-300 p-2">UoM</th>
            <th className="border border-gray-300 p-2">Batch Number</th>
            <th className="border border-gray-300 p-2">Quality to Produce</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">sf60001</td>
            <td className="border border-gray-300 p-2">Polypropylene</td>
            <td className="border border-gray-300 p-2">200</td>
            <td className="border border-gray-300 p-2">kg</td>
            <td className="border border-gray-300 p-2">2410601</td>
            <td className="border border-gray-300 p-2">17500</td>
          </tr>
        </tbody>
      </table>

      {/* Material Table */}
      <table className="w-full border border-gray-300 text-center text-sm mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">S. No.</th>
            <th className="border border-gray-300 p-2">Material Code</th>
            <th className="border border-gray-300 p-2">Material Description</th>
            <th className="border border-gray-300 p-2">Required Qty</th>
            <th className="border border-gray-300 p-2">UoM</th>
            <th className="border border-gray-300 p-2">Lot Number</th>
            <th className="border border-gray-300 p-2">Issued Qty</th>
            <th className="border border-gray-300 p-2">EXP Date</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, code: "RM0001", desc: "POLYPROPYLENE-SPIKE CAPS", qty: "50.00", uom: "KG", lot: "R60001", issued: "50.00", exp: "1-Oct-27" },
            { id: 2, code: "RM0002", desc: "ACRYLONITRILE BUTADIENE STYRENE-SPIKE INJECTION", qty: "250.00", uom: "KG", lot: "R60004", issued: "250.00", exp: "1-Oct-27" },
            { id: 3, code: "RM0003", desc: "POLYVINYL CHLORIDE-DRIP CHAMBER", qty: "375.00", uom: "KG", lot: "R60003", issued: "375.00", exp: "1-Oct-27" },
            { id: 4, code: "RM0004", desc: "POLYPROPYLENE-AIRVENT", qty: "50.00", uom: "KG", lot: "R60001", issued: "50.00", exp: "1-Oct-27" },
          ].map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2">{item.id}</td>
              <td className="border border-gray-300 p-2">{item.code}</td>
              <td className="border border-gray-300 p-2">{item.desc}</td>
              <td className="border border-gray-300 p-2">{item.qty}</td>
              <td className="border border-gray-300 p-2">{item.uom}</td>
              <td className="border border-gray-300 p-2">{item.lot}</td>
              <td className="border border-gray-300 p-2">{item.issued}</td>
              <td className="border border-gray-300 p-2">{item.exp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex justify-between mt-6 text-sm">
        <p>PO Generate by: <br /> Production Officer</p>
        <p>Issued by: <br /> Dispensing/Warehouse Officer</p>
        <p>Received by: <br /> Production Officer</p>
        <p>Checked by: <br /> QA Officer</p>
      </div>

      {/* Print Button */}
      <div className="text-center mt-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default Print;
