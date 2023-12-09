/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const JobItem = ({ item }) => {
  const { title, deadline, minPrice, maxPrice, description, _id } = item;
  // console.log(item);
  return (
    <div className="card shadow border relative overflow-hidden">
      <div className="absolute -top-3/4 -right-3/4 bg-success w-full h-full opacity-20 -rotate-45"></div>
      <div className="card-body text-left ">
        <h2 className="text-3xl font-semibold text-center mb-5">{title}</h2>
        <p className="font-semibold text-lg ">Job Deadline : <span className="text-[#64666c]">{deadline}</span></p>
        {/* <p className="font-semibold text-lg">Category : {category}</p> */}
        <span className="font-semibold text-lg"> Price Range : </span>
        <div className="flex gap-2">
          <span className="border border-blue-600 text-[#64666c] rounded p-1 px-2">
            Min Price: ${minPrice}
          </span>
          <span className="border border-green-600 text-[#64666c] rounded p-1 px-2">
            Max Price: ${maxPrice}
          </span>
        </div>
        <p className="my-3">
          <span className="font-bold">Job Description</span> :
          <span className="text-[#64666c]">{description.length >= 120 ?  description.slice(0, 120) + '...' : description}</span>
        </p>
        <div className="card-actions">
          <Link to={`jobs/${_id}`}>
            <button className="btn btn-sm btn-neutral btn-outline">
              Bid now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
