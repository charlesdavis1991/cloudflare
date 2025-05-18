/* eslint-disable no-unused-vars */

import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const CreateSubdomain = ({ onChangeForm, createSubdomain }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCreateSubdomain = async () => {
        const subdomainData = {
            ipaddress: document.getElementById("ipaddress").value,
            record: document.getElementById("record").value,
            owner: document.getElementById("owner").value,
          };
      
          // Dispatch the subdomain data to the cart
          dispatch(addToCart({ ...subdomainData, id: Date.now() }))
        //  await createSubdomain();
          navigate("/cart");
        // Clear the notification after 3 seconds
        setTimeout(() => { console.log('Notification dismissed'); }, 10000);
    };
    return (
        <div className="flex">
            <div className="flex flex-row row    ">
                <div className="col-md-7 ">
                    <h2 className="text-[24px] mb-4" >Subdomain</h2>
                    {/* Notification Popup */}

                    <form className="flex flex-col h-[264px] p-2 justify-between items-even">
                        <div className= "flex flex-row ">
                        <div className="flex flex-col justify-center items-even ">
                            <div className="mb-6">
                            <label htmlFor="exampleInputEmail1">IP address</label>
                            </div>
                            
                            <div className="mb-6">
                            <label htmlFor="exampleInputPassword1">Record</label>
                            </div>
                            
                            <div className="mb-6">
                            <label htmlFor="exampleInputEmail1">Owner</label>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center ml-6">
                            <div>
                            <input type="text"  className="rounded-md p-2 text-black mb-6 h-8" onChange={(e) => onChangeForm(e)}  name="ipaddress" id="ipaddress" aria-describedby="emailHelp" placeholder="IP Address" />
                            </div>
                            <div>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="rounded-md p-2 text-black mb-6 h-8" name="record" id="record" placeholder="Record" />
                            </div>
                            <div>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="rounded-md p-2 text-black mb-6 h-8" name="owner" id="owner" aria-describedby="emailHelp" placeholder="Owner" />
                            </div>                       
                        </div>
                        </div>  
                        <button type="button" onClick={handleCreateSubdomain} className="bg-[rgba(219,39,119,1)] w-[200px] h-[36px] mt-[24px] rounded-md ">Purchase Subdomain</button>
                                          
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateSubdomain