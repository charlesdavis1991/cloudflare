import  { useState, useEffect } from 'react';
import  {Header}  from '../components/Header'
import { Subdomains } from '../components/Subdomains'
import { DisplayBoard } from '../components/DisplayBoard'
import CreateSubdomain from '../components/CreateSubdomain'
import { getAllSubdomains, createSubdomain } from '../services/subdomainService'
import './Home.css'
function Home() {

  const [subdomain, setSubdomain] = useState({})
  const [subdomains, setSubdomains] = useState([])
  const [numberOfSubdomains, setNumberOfSubdomains] = useState(0)

  const subdomainCreate = () => {

      createSubdomain(subdomain)
        .then(response => {
          if (response && response.message) {
            window.alert(`Subdomain created successfully!`);
        } else {
            
            window.alert('Error: Failed to create subdomain. Please try again.');
        }

          console.log(response);
          setNumberOfSubdomains(numberOfSubdomains+1)
      });
  }

  const fetchAllSubdomains = () => {
    console.log('Fetching all subdomains...');
    getAllSubdomains()
      .then(subdomains => {
        console.log(subdomains)
        setSubdomains(subdomains);
        setNumberOfSubdomains(subdomains.subdomains.length)
      });
  }

  useEffect(() => {
    getAllSubdomains()
      .then(subdomains => {
        console.log(subdomains)
        setSubdomains(subdomains);
        setNumberOfSubdomains(subdomains.subdomains.length)
      });
  }, [])

  const onChangeForm = (e) => {
      if (e.target.name === 'ipaddress') {
          subdomain.ipaddress = e.target.value;
      } else if (e.target.name === 'record') {
          subdomain.record = e.target.value;
      } else if (e.target.name === 'owner') {
          subdomain.owner = e.target.value;
      }
      setSubdomain(subdomain)
  }
  
    
    return (
        <div className=" flex flex-col pl-16 h-full w-full bg-[rgba(15,15,16,1)]">
          <Header className="m1-12"></Header>
          <div className="container p-48 ">
            <div className="flex row p-2 justify-between ">
              <div className="flex ">
                  <CreateSubdomain 
                    subdomain={subdomain}
                    onChangeForm={onChangeForm}
                    createSubdomain={subdomainCreate}
                    >
                  </CreateSubdomain>
              </div>
              <div className="col-md-4 flex flex-col">
                  <DisplayBoard
                    numberOfSubdomains={numberOfSubdomains}
                    getAllSubdomains={fetchAllSubdomains}
                  >
                  </DisplayBoard>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            <Subdomains subdomains={subdomains}></Subdomains>
          </div>
        
        </div>
    );
}

export default Home;
