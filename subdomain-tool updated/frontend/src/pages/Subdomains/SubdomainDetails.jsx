
import { Link } from "react-router-dom";


import Loader from "../../components/Loader";

import {

} from "react-icons/fa";

import { useLocation } from "react-router-dom";
const SubdomainDetails = () => {

  const location = useLocation();
  const { subdomain } = location.state || {}; // Access the passed subdomain data

  if (!subdomain) {
    return <p>No subdomain data available</p>;
  }

  const isLoading = !subdomain;
  const data = subdomain;





  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Link
          to="/"
          className="text-white w-[60px] font-semibold hover:underline mt-[10rem]"
        >
          Go Back
        </Link>

      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap justify-items mt-[20%] relative items-between mt-[2rem] ml-[10rem]">
            <div className="flex flex-col justify-between">
              <h2 className="text-4xl font-semibold">{data.name}</h2>
              <p className="my-4 2xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {data.content}
              </p>

              <p className="text-xl my-4 ">${data.id}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">

                    {data.owner}
                  </h1>
                </div>
              </div>



            </div>


          </div>
        </>
      )}
    </div>
  );
};

export default SubdomainDetails;
