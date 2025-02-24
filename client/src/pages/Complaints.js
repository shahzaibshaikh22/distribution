import React from "react";
import TopBar from "../components/TopBar";
import SectionBar from "../components/SectionBar";
import FormContainer from "../components/FormContainer";


const Complaints = () => {

  

  return (
    <div className="w-full flex  text-white md:px-4 px-2">
      <div className="w-full ">
        <TopBar/>
        <SectionBar sectionHeading="Complain Management"/>
        <FormContainer/>
      </div>
    </div>
  );
}; 

export default Complaints;
