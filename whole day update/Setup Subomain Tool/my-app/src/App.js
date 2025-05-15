import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Subdomains } from './components/Subdomains'
import { DisplayBoard } from './components/DisplayBoard'
import CreateSubdomain from './components/CreateSubdomain'
import { getAllSubdomains, createSubdomain } from './services/SubdomainService'

function App() {

  const [subdomain, setSubdomain] = useState({})
  const [subdomains, setSubdomains] = useState([])
  const [numberOfSubdomains, setNumberOfSubdomains] = useState(0)


  const subdomainCreate = (e) => {

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
        <div className="App">
          <Header></Header>
          <div className="container mrgnbtm">
            <div className="row">
              <div className="col-md-8">
                  <CreateSubdomain 
                    subdomain={subdomain}
                    onChangeForm={onChangeForm}
                    createSubdomain={subdomainCreate}
                    >
                  </CreateSubdomain>
              </div>
              <div className="col-md-4">
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

export default App;
