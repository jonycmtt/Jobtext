import axios from "axios";
import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/AuthProvider";

const UpdatedJobs = () => {
  const update = useLoaderData();
  const {user} = useContext(AuthContext)
    const navigate = useNavigate()
  const handleUpdateInfo = (event) => {
    event.preventDefault();
    const { _id } = update;
    const form = event.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const category = form.category.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const description = form.description.value;

    const updateJobInfo = {
      title,
      deadline,
      category,
      minPrice,
      maxPrice,
      description,
    };
    console.log(updateJobInfo);

    axios
      .put(`https://jobtex-server-site.vercel.app/jobs/${_id}`, updateJobInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Product Updated Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate(-1)
        }
      });
  };
  return (
    <div className="card w-full shadow mx-auto pb-10 my-10">
        <h3 className="text-center text-3xl font-bold mt-5">Edit Job : <span className="text-slate-500">{update.title}</span></h3>
      <form onSubmit={handleUpdateInfo} className="card-body gap-6">
        <div className="flex gap-4 flex-col">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Job Title</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={update.title}
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
              defaultValue={update.deadline}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        {/* 2md */}
        <div className="flex gap-4 flex-col">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              disabled
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
            <select className="select select-bordered w-full " name="category">
              <option selected>{update.category}</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphics Design">Graphics Design</option>
            </select>
          </div>
        </div>
        {/* 3rd */}
        <div className="flex gap-4 flex-col">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Minimum Price</span>
            </label>
            <input
              defaultValue={update.minPrice}
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
              defaultValue={update.maxPrice}
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
            defaultValue={update.description}
            name="description"
            className="w-full input input-bordered h-32 resize-none"
          ></textarea>
        </div>
        <div className="text-center mt-6">
          <button className="btn btn-neutral btn-block">Updated Job</button>
        </div>
      </form>
    </div>
  );
};

export default UpdatedJobs;
