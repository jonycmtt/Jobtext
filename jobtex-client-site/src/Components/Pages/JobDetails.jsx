import { useContext, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

const JobDetails = () => {
  useEffect(() => {
    document.title = 'JobText | Job Details'
  },[])
  const jobData = useLoaderData();
  const { user } = useContext(AuthContext);
  const { title, deadline, minPrice, maxPrice, description, email } = jobData;
  const navigate = useNavigate()
  const handleBidProject = event => {
    event.preventDefault();
    const form = event.target;
    const price = form.price.value;
    const yourDeadline = form.deadline.value;
    const yourEmail = user?.email;
    const buyerEmail = email;

    const bidProject = {price,yourDeadline,yourEmail,buyerEmail,title,status:'pending'}
    // const bidRequests = {price,yourDeadline,yourEmail,buyerEmail,title : title}
    // console.log(bidProject)

    axios.post('https://jobtex-server-site.vercel.app/myBids',bidProject,{
      withCredentials :true
    })
    .then(res => {
        console.log(res.data)
        if(res.data.insertedId) {
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
        }
        navigate('/myBids')
        
        form.reset()
    });
    // axios.post('http://localhost:5000/bidRequest',bidRequests,{
    //   withCredentials :true
    // })
    // .then(res => {
    //     console.log(res.data)
    //     if(res.data.insertedId) {
    //         Swal.fire(
    //             'Good job!',
    //             'You clicked the button!',
    //             'success'
    //           )
    //     }
    //     navigate('/myBids')

    //     form.reset()
    // })
  }

  return (
    <div className="my-10">
      
      <h3 className="text-4xl font-semibold text-center mb-10">Job Details</h3>
      <div>
      <div className="card shadow border relative overflow-hidden">
      <div className="absolute -top-3/4 -right-3/4 bg-success w-full h-full opacity-20 -rotate-45"></div>
      <div className="card-body text-left ">
        <h2 className="text-3xl font-semibold  mb-5">{title}</h2>
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
          <span className="text-[#64666c]">{description}</span>
        </p>
      </div>
    </div>
        <section className="mt-10">
          <div className="card w-full shadow mx-auto pb-10 ">
            <h2 className="text-3xl text-center font-semibold mt-6">
              Place Your Bid
            </h2>
            <form onSubmit={handleBidProject} className="card-body gap-6">
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Your bidding amount"
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
                    <span className="label-text">Your Email</span>
                  </label>
                  <input
                    readOnly
                    type="email"
                    name="yourEmail"
                    placeholder="Email"
                    defaultValue={user?.email}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Buyer Email</span>
                  </label>
                  <input
                    readOnly
                    type="email"
                    name="buyerEmail"
                    placeholder="Buyer Email"
                    defaultValue={email}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                {user?.email === email ? <button disabled className="btn btn-neutral">
                  Bid on the project
                </button>
                :
                <button className="btn btn-neutral">
                  Bid on the project
                </button>
              
              }
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
