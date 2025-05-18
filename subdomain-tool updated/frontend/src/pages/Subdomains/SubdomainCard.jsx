/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";



const SubdomainCard = ({ p }) => {




  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700">
     

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-whiet dark:text-white">{p?.name}</h5>

          <p className="text-black font-semibold text-pink-500">
            {p?.content?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            state={{ subdomain: p }}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          
        </section>
      </div>
    </div>
  );
};

export default SubdomainCard;
