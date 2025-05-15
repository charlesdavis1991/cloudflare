import React , {useState} from 'react'

export const DisplayBoard = ({numberOfSubdomains, getAllSubdomains}) => {
    const [loading, setLoading] = useState(false); // State for loader

    const handleGetAllSubdomains = async () => {
        setLoading(true); // Show loader
        await getAllSubdomains() // Fetch subdomains
        console.log(numberOfSubdomains);
        setLoading(false); // Hide loader
    };

    const headerStyle = {

        width: '100%',
        padding: '2%',
        backgroundColor: "red",
        color: 'white',
        textAlign: 'center'
    }
    
    return(
        <div style={{backgroundColor:'green'}} className="display-board">
            <h4 style={{color: 'white'}}>Subdomain Created</h4>
            <div className="number">
            {numberOfSubdomains}
            </div>
            <div className="btn">
                <button type="button" disabled={loading}  onClick={handleGetAllSubdomains} className="btn btn-warning"> {loading ? 'Loading...' : 'Get all Subdomains'} </button>
            </div>
        </div>
    )
}