import  {useState} from 'react'

// eslint-disable-next-line react/prop-types
export const DisplayBoard = ({numberOfSubdomains, getAllSubdomains}) => {
    const [loading, setLoading] = useState(false); // State for loader

    const handleGetAllSubdomains = async () => {
        setLoading(true); // Show loader
        await getAllSubdomains() // Fetch subdomains
        console.log(numberOfSubdomains);
        setLoading(false); // Hide loader
    };

  
    return(
        <div style={{backgroundColor:'green' }} className=" flex flex-col h-[280px] justify-contents rounded-md p-4  m-2  w-[256px]">
            <h4 style={{color: 'white'}} className="text-[24px]">Subdomain Created</h4>
            <div className="number">
            {numberOfSubdomains}
            </div>
            
                <button type="button" disabled={loading}  onClick={handleGetAllSubdomains} className="mt-8 bg-[rgba(188,39,119,1)] w-[200px] h-[32px] ml-2 rounded-md "> {loading ? 'Loading...' : 'Get all Subdomains'} </button>
        </div>
    )
}