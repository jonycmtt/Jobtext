import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  useEffect(() => {
    document.title = "JobText | My Post Jobs";
  }, []);
  const [postJobs, setPostJobs] = useState([]);
  const { user } = useContext(AuthContext);
  const [loaderPage, setLoaderPage] = useState(true);
  // const navigate = useNavigate();
  const url = `https://jobtex-server-site.vercel.app/jobs?email=${user?.email}`;
  useEffect(() => {
    axios.get(url, { withCredentials: true }).then((res) => {
      setPostJobs(res.data);
      setLoaderPage(false);
    });
  }, [url]);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://jobtex-server-site.vercel.app/jobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
        const remaining = postJobs.filter((remain) => remain._id !== id);
        setPostJobs(remaining);
      }
    });
  };
  return (
    <div className="my-10 px-3">
      <div className="md:min-h-[30vh] md:flex justify-center items-center md:border md:shadow mb-16 md:rounded-xl">
        <h2 className="text-4xl text-center font-semibold">
          My Post Jobs
        </h2>
      </div>
      {loaderPage && (
        <div className="flex justify-center w-full">
          <img src="https://i.ibb.co/qysm8Zm/Spinner-1s-200px.gif" alt="" />
          {/* <span className="loading block loading-dots w-20 text-center mx-auto"></span> */}
        </div>
      )}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
        {postJobs.map((job) => (
          <div key={job._id} className="card border shadow">
            <div className="card-body">
              <h2 className="font-bold text-xl">Job Title : {job.title}</h2>
              <p className="text-slate-500">
                <span className="text-black font-semibold">Email</span> :{" "}
                {job.email}
              </p>
              <p className="text-slate-500">
                <span className="text-black font-semibold">Deadline</span> :{" "}
                {job.deadline}
              </p>
              <p className="text-slate-500">
                <span className="text-black font-semibold">Category</span> :{" "}
                {job.category}
              </p>
              <p className="text-slate-500">
                <span className="text-black font-semibold">Min Price</span> :{" "}
                ${job.minPrice}
              </p>
              <p className="text-slate-500">
                <span className="text-black font-semibold">Max Price</span> :{" "}
                ${job.maxPrice}
              </p>
              <p className="my-4 text-slate-500">
                <span className="font-semibold text-lg"><span className="text-black">Description</span> : </span>
                {job.description}
              </p>
              <div className="card-actions">
                <Link to={`/update/${job._id}`}>
                  <button className="btn btn-neutral btn-sm">Update</button>
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostJobs;
