import React from "react";

interface PlanProps {
  week: number;
  planTitle: string;
  planDescription: string;
}

const Plan: React.FC<PlanProps> = ({ week, planTitle, planDescription }) => {
  return (
    <div style={{marginBottom: "17px"}}>
      <div style={{borderRadius: "15px", background: "var(--c-9-ceff-2, #C9CEFF)", width: "80px", height: "30px", display: "flex", justifyContent: "center"}}>
        <p style={{fontSize: "15px", marginTop: "auto", marginBottom: "auto"}}>
          Week, {week}
        </p>
      </div>
      <div style={{marginTop: "7px", borderRadius: "10px", background: "var(--f-5-f-6-fb, #F5F6FB)", padding: "15px"}}>
        <p style={{fontWeight: "bold", fontSize:"15px"}}>{planTitle}</p>
        <p style={{color:"#5F5F5F", marginTop: "10px"}}>{planDescription}</p>
      </div>
      
    </div>
  );
};

export default Plan;