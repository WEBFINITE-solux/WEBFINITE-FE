import React from 'react';

const NoDataComponent: React.FC = () => {
    return(
        <div style={{ height: "100%", padding: '20px', fontSize: '16px', backgroundColor: "rgba(0, 0, 0, 0.50)", display: "flex", alignItems:"center", justifyContent: "center" }}>
            <div style={{backgroundColor: "white", borderRadius: "11px", padding:"15px", width: "380px", textAlign: "center"}}>
            <p style={{fontWeight: "bold", fontSize:"18px"}}>아직 등록된 내용이 없습니다.</p>
            </div>
        </div>
    )

}
export default NoDataComponent;