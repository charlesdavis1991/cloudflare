import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SubdomainCard from "./Subdomains/SubdomainCard"
import { getAllSubdomains } from "../services/subdomainService";
const Subdomain = () => {

  const [subdomains, setSubdomains] = useState([])
  const [, setNumberOfSubdomains] = useState(0)
  useEffect(() => {
    getAllSubdomains()
      .then(subdomains => {
        console.log(subdomains)
        setSubdomains(subdomains.subdomains);
        setNumberOfSubdomains(subdomains.subdomains.length)
      });
  }, [])
  
  return (
    <>
      <div className="container mx-auto flex justify-items justify-even ml-[10%]">
        <div className="flex flex-3 justify-items justify-even">

          <div className="p-3">
            <h2 className="h4 text-2xl text-center text-cyan-400 mb-4">{subdomains?.length} Subdomains</h2>
            <div className="flex flex-wrap">
              {subdomains.length === 0 ? (
                <Loader />
              ) : (
                subdomains?.map((p) => (
                  <div className="p-3 w-[30%] ml-[32px]" key={p._id}>
                    <SubdomainCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subdomain;
