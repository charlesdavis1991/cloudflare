import React, {useState} from 'react'


const CreateSubdomain = ({onChangeForm, createSubdomain }) => {

    const [notification, setNotification] = useState(null); // State for notification

    const handleCreateSubdomain = async () => {
        const response = await createSubdomain();
       
        // Clear the notification after 3 seconds
        setTimeout(() => { console.log('Notification dismissed');}, 10000);
    };
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create Subdomain</h2>
                 {/* Notification Popup */}
                 
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail1">IP address</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="ipaddress" id="ipaddress" aria-describedby="emailHelp" placeholder="IP Address" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputPassword1">Record</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="record" id="record" placeholder="Record" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Owner</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="owner" id="owner" aria-describedby="emailHelp" placeholder="Owner" />
                        </div>
                    </div>
                    <button type="button" onClick= { handleCreateSubdomain} className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateSubdomain