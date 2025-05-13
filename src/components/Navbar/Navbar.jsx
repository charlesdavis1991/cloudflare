import React from "react";

const Navbar = () => {
  return (
    <div style={{width:"13%", display:"flex", flexDirection:"column", padding:"10px", backgroundColor:"rgba(242, 231, 224,1)", borderRadius:"10px", paddingTop:"20px", paddingLeft:"20px"}}>
      <div className="menu__title">Menu</div>

      <div style={{borderBottom:"1px solid #888", paddingBottom:"10px"}} className="menu__subtitle">leaderboard template</div>

      <div >
        <a className="menu__active" href="toplist-example-charter">
          Charter
        </a>
      </div>

      <div className="menu__submenu">
        <div style={{ paddingLeft: "10px" }}>
          <a href="toplist-example-charter-sun">Sun &amp; Swimming</a>
        </div>
        <div style={{ paddingLeft: "10px" }}> 
          <a href="toplist-example-charter-city">Weekend &amp; bigCity</a>
        </div>
        <div style={{ paddingLeft: "10px" }}>
          <a href="toplist-example-charter-snow">Ski trips</a>
        </div>
      </div>

      <div>
        <a  className="menu__active" href="toplist-example-last_minute">Last minute</a>
      </div>
      <div>
        <a  className="menu__active" href="toplist-example-air">Flight</a>
      </div>

      <div className="menu__subtitle" style ={{marginTop:"20px ", borderBottom:"1px solid #888", paddingBottom:"10px"}}>Customization</div>

      <div>
        <a  className="menu__subtitle" href="create-toplist">Create leaderboard</a>
      </div>
    </div>
  );
};

export default Navbar;