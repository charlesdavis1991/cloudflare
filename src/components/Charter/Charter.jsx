import React, { useState } from "react";
import './Charter.css'
const Chater = () => {
    const [selectedFormat, setSelectedFormat] = useState("980x240");
    const [includeLogo, setIncludeLogo] = useState(true);

    const handleFormatChange = (event) => {
        setSelectedFormat(event.target.value);
    };

    const handleLogoToggle = () => {
        setIncludeLogo(!includeLogo);
    };

    return (
        <div style ={{display:"flex", flexDirection:'column' ,width :"75%" , alignItems:"center" ,alignContent:"center", justifyItems:"center", justifyContent:"center", marginLeft:"10%", marginRight:"10%" }}>
            {/* Menu Section */}
            {/* Example Section */}
            <div style={{display:"flex", flexDirection:"column", width:"100%", justifyContent:"center",justifyItems:"center" }}>
                <div style={{ display:"flex" ,flexDirection:"column",width: "100%"}}>
                    <div  style={{display:"flex",flexDirection:"column" ,width:"100%  "}}>Charter - all destinations</div>
                    <p style={{marginBottom : "32px", fontSize:"12px",fontWeight:"10px", fontFamily:"Arial"}}>Here are top list links that are suitable for different iframe formats.</p>
                   <div>
                    <p>Choose format</p>

                    <form style={{display:"flex", flexDirection:'column' , width:"100%"}} >
                        <div style={{display:"flex", flexDirection :"column" ,width:"100%   "}}>
                            <div >
                                <select
                                   className="chaterSelect"
                                    name="format"
                                    id="format"
                                    value={selectedFormat}
                                    onChange={handleFormatChange}
                                >
                                    <option disabled>Landscape (one or two columns)</option>
                                    <option value="300x250">300x250</option>
                                    <option value="468x240">468x240</option>
                                    <option value="480x120">480x120</option>
                                    <option value="600x315">600x315</option>
                                    <option value="980x120">980x120</option>
                                    <option value="980x240">980x240 (image)</option>
                                    <option value="980x400">980x400</option>
                                    <option value="980x600">980x600</option>
                                    <option value="1000x600">1000x600</option>
                                    <option value="1250x240">1250x240 (image)</option>
                                    <option disabled>Portrait (one column)</option>
                                    <option value="160x600">160x600 (image)</option>
                                    <option value="250x360">250x360 (image)</option>
                                    <option value="250x600">250x600 (image)</option>
                                    <option value="320x320">320x320</option>
                                    <option value="468x600">468x600 (image)</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div >
                            <div >
                                <label>
                                    <input
                                        name="rg_logo"
                                        id="rg_logo"
                                        type="checkbox"
                                        checked={includeLogo}
                                        onChange={handleLogoToggle}
                                    />
                                    <span className="js-checkbox-rg" style={{fontSize:"12px"}}>With the Travel Guide Logo</span>
                                </label>
                            </div>
                        </div>
                        <br />
                        <button
                            type="button"
                            className="btn "
                        >
                            Show
                        </button>
                    </form>
                     </div>
                    {/* Default Section */}
                    <div  style={{width:"100%",    borderTop:"1px"} }>
                        <div className="example__section-title">Without background image</div>
                        <iframe
                            title="chater without background image"
                            style={{height:"250px"}}
                            scrolling="yes"
                            frameBorder="0"
                            src={`https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=${includeLogo ? "1" : "0"
                                }`}
                        ></iframe>
                        <div className="example__section-subtitle">
                            Link to paste into an iframe
                        </div>
                        <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                            <textarea
                                className="example__code-block "
                                readOnly
                            >
                                https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=1
                            </textarea>
                            <button className="example__copy-btn js-copy-button pull-right">
                                Copy
                            </button>
                        </div>
                    </div>

                    <div className="example__section-subtitle">
                        Link to paste into an iframe
                    </div>
                    <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                        <textarea
                            className="example__code-block js-toplist-link js-code pull-left"
                            readOnly
                        >
                            https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=1
                        </textarea>
                        <button className="example__copy-btn js-copy-button pull-right">
                            Copy
                        </button>
                    </div>
                </div>

                {/* With Background Image */}
                <div >
                    <div className="example__section-title">With background image</div>
                    <iframe
                        title="chater with background image"
                        style={{height:"250px"}}
                        scrolling="no"
                        frameBorder="0"
                        src={`https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=${includeLogo ? "1" : "0"
                            }&background=sky`}
                    ></iframe>
                    
                    <div className="example__section-subtitle">
                        Link to paste into an iframe
                    </div>
                    <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                        <textarea
                            className="example__code-block js-toplist-link js-code pull-left"
                            readOnly
                        >
                            https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=1
                        </textarea>
                        <button className="example__copy-btn js-copy-button pull-right">
                            Copy
                        </button>
                    </div>
                </div>

                {/* With Image */}
                <div className="example__section js-example-div-image">
                    <div className="example__section-title">With Image</div>
                    <iframe
                        title="chater with image"
                        style={{height:"250px"}}
                        scrolling="no"
                        frameBorder="0"
                        src={`https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=${includeLogo ? "1" : "0"
                            }&image=1`}
                    ></iframe>
                    
                    <div className="example__section-subtitle">
                        Link to paste into an iframe
                    </div>
                    <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
                        <textarea
                            className="example__code-block js-toplist-link js-code pull-left"
                            readOnly
                        >
                            https://www.reseguiden.se/widget/toplist/charter?limit=10&slim=1&partner_logo=1
                        </textarea>
                        <button className="example__copy-btn js-copy-button pull-right">
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
  );
};

export default Chater;