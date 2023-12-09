import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddJobs = () => {
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'JobText | Add Job'
  },[])
  const { user } = useContext(AuthContext);
  

  const handleAddJobs = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const email = user?.email;
    const category = form.category.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const description = form.description.value;

    const jobItems = {
      title,
      deadline,
      email,
      category,
      minPrice,
      maxPrice,
      description,
    };
    // console.log(jobItems)

    axios.post("https://jobtex-server-site.vercel.app/jobs", jobItems,{
      withCredentials : true
    }).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire("Good job!", "You clicked the button!", "success");
      }
      navigate('/postedJob')
      form.reset();
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-center capitalize font-bold my-10">
        add jobs
      </h2>
      <div className="card w-full shadow mx-auto pb-10 ">
        <form onSubmit={handleAddJobs} className="card-body gap-6">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                type="date"
                name="deadline"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          {/* 2md */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                readOnly
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={user?.email}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full "
                name="category"
              >
                <option disabled selected>
                  Selected Category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphics Design">Graphics Design</option>
              </select>
            </div>
          </div>
          {/* 3rd */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Minimum Price</span>
              </label>
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Maximum Price</span>
              </label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                className="input input-bordered"
                required
              />
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Job Description</span>
            </label>
            <textarea
              name="description"
              className="w-full input input-bordered h-52 resize-none"
            ></textarea>
          </div>
          <div className="text-center mt-6">
            <button className="btn btn-neutral btn-block">Add Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobs;
