import React from "react";
import TopBar from "./TopBar";
import { useSelector } from "react-redux";
import BarChart from "./BarChart";
import DashboardAssests from "./DashboardAssests";
// import PhoneMenu from "./PhoneMenu";

const Overview = () => {
  const { modes } = useSelector((state)=>state.mode)

  const totalAssests = [
    {
      id:1,
      assetsType: "Fixed Assets",
      assetLength: 0
    },
    {
      id:2,
      assetsType: "Long Term Investment",
      assetLength: 0
    },
    {
      id:3,
      assetsType: "Current Assets",
      assetLength: 0
    },
    {
      id:4,
      assetsType: "Cash In Hand",
      assetLength: 0
    },
    {
      id:5,
      assetsType: "Receivable",
      assetLength: 0
    },
    {
      id:6,
      assetsType: "Short Term Investment",
      assetLength: 0
    },
    {
      id:7,
      assetsType: "Fixed Assets",
      assetLength: 0
    },
    {
      id:8,
      assetsType: "Furniture & Future",
      assetLength: 0
    },
    {
      id:9,
      assetsType: "Ahmed",
      assetLength: 0
    },
    {
      id:10,
      assetsType: "Total",
      assetLength: 0
    },
  ]
  const Liabilities = [
    {
      id:1,
      assetsType:"Long Term Liabilities",
      assetLength:0

    },
    {
      id:2,
      assetsType:"Current liabilities",
      assetLength:0

    },
    {
      id:3,
      assetsType:"Capital",
      assetLength:0

    },
    {
      id:4,
      assetsType:"Stock In Hand",
      assetLength:0

    },
    {
      id:5,
      assetsType:"Stock Purchased",
      assetLength:0

    },
    {
      id:6,
      assetsType:"Equity Capital",
      assetLength:0

    },
    {
      id:7,
      assetsType:"Vendor -  R",
      assetLength:0

    },
    {
      id:8,
      assetsType:"Total",
      assetLength:0

    },
   
  ]
  const Expenses = [
    {
      id:1,
      assetsType:"Indirect Cost",
      assetLength:0

    },
    {
      id:2,
      assetsType:"Admin & Selling Expenses",
      assetLength:0

    },
    {
      id:3,
      assetsType:"Total",
      assetLength:0

    }
  ]
  const ChartsOfAccunts = [
    {
      id:1,
      assetsType:"Assets (Dr)",
      assetLength:0

    },
    {
      id:2,
      assetsType:"Labilities (Dr)",
      assetLength:0

    },
    {
      id:3,
      assetsType:"Revenue (Dr)",
      assetLength:0

    },
    {
      id:4,
      assetsType:"Cost OF Sale (Dr)",
      assetLength:0

    },
    {
      id:5,
      assetsType:"Operating Expenses (Dr)",
      assetLength:0

    },
    {
      id:6,
      assetsType:"Total",
      assetLength:0

    }
  ]
  

  return (
    <div className="w-full flex  text-white px-4">
      {/* <PhoneMenu/> */}
      <div className="w-full ">
        <TopBar/>
        {/* Filter Buttons */}
        <div className="flex w-full max-w-7xl gap-2 md:flex-wrap md:overflow-x-hidden overflow-x-scroll py-1">
          {["Products", "Users", "Vendors", "Clients", "Employee", "Journal","Bank Payment", "Bank Reciept", "Cash Payment", "Cash Reciept", "Purchase", "Accounts", "Pos","Stock",  "Trial Balance", "Party Form", "Sace/Car Wash", "Demages"].map(
            (item, index) => (
              <button
                key={index}
                className={`drop-shadow-md ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-black'} px-4 py-2 rounded-full whitespace-nowrap text-xs hover:bg-gray-600`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Stats Cards */}
        <div className="w-full max-w-7xl grid grid-cols-1 mt-2 md:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-4">
         <div>
         <DashboardAssests
          totalAssests={totalAssests}
          heading="Total Assets"
         />
         </div>
         <div>
         <DashboardAssests
          totalAssests={Liabilities}
          heading="Liabilities"
         />
         </div>
         <div>
         <DashboardAssests
          totalAssests={Expenses}
          heading="Expenses"
         />
         </div>
         <div>
         <DashboardAssests
          totalAssests={ChartsOfAccunts}
          heading="Charts Of Accunts"
         />
         </div>
        </div>

        {/* Charts */}
        <div className="w-full max-w-7xl grid grid-cols-1 h-[5rem] md:grid-cols-3 gap-4 mt-2">
          <div className="w-full">
            <BarChart
             chartLabel="Total Purchase Amount"
             chartColor="#8F5FFF"
             chartData={[600,200,300,500,600,700]}
             />
          </div>
          <div className="w-full">
            <BarChart
             chartLabel="Total Sale Amount"
             chartColor="#FF0004"
             chartData={[10,20,30,40,50,60,70]}
             />
          </div>
          <div className="w-full">
          <BarChart
             chartLabel="Total Saleman Amount"
             chartColor="#00FFBB"
             chartData={[10,20,30,100,50,60,70,80,90]}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
