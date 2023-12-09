import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const MyBids = () => {
  useEffect(() => {
    document.title = "JobText | My Bids";
  }, []);
  const [bids, setBids] = useState([]);
  const { user } = useContext(AuthContext);
  const [loaderPage, setLoaderPage] = useState(true);

  // if(loaderPage) {
  //   setLoaderPage(true)
  // }

  const url = `https://jobtex-server-site.vercel.app/mybids?email=${user?.email}`;
  useEffect(() => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        setBids(res.data);
        console.log(res.data);
        setLoaderPage(false);
      });
  }, [url]);

  const handleComplete = (id) => {
    console.log(id);
    const url = `https://jobtex-server-site.vercel.app/mybids/${id}`;

    const statusInfo = { status: "complete" };

    axios.patch(url, statusInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Product Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        const remaining = bids.filter((req) => req._id !== id);
        console.log(remaining);
        const completed = bids.find((update) => update._id === id);
        completed.status = "complete";
        const newBids = [completed, ...remaining];
        setBids(newBids);
      }
    });
  };
  return (
    <div className="my-12 relative">
      <h1 className="text-4xl font-semibold text-center">My Bids</h1>
      
      <div className="overflow-x-auto mt-12 min-h-[30vh]">
        
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Complete</th>
            </tr>
          </thead>
          
          <tbody className="relative">
            
            {bids.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.title} </td>
                <td>{bid.yourEmail}</td>
                <td>{bid.yourDeadline}</td>
                <td>
                  {bid.status === "complete" && (
                    <span className="btn btn-sm btn-info cursor-text">
                      Completed
                    </span>
                  )}
                  {bid.status === "accept" && (
                    <span className="btn btn-success btn-sm text-sm cursor-text">
                      In Progress
                    </span>
                  )}
                  {bid.status === "reject" && (
                    <span className="btn btn-error btn-sm text-sm cursor-text">
                      Canceled
                    </span>
                  )}

                  {bid.status === "pending" && (
                    <span className="btn btn-sm btn-neutral text-sm cursor-text">
                      Pending
                    </span>
                  )}
                </td>
                <td>
                  {bid.status === "accept" ? (
                    <button
                      onClick={() => handleComplete(bid._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Complete
                    </button>
                  ) : (
                    <button disabled className="btn btn-sm btn-primary">
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loaderPage && (
              <div className="flex justify-center w-full">
                <img src="https://i.ibb.co/qysm8Zm/Spinner-1s-200px.gif" alt="" />
                {/* <span className="loading block loading-dots w-20 text-center mx-auto"></span> */}
              </div>
            )}
      </div>
    </div>
  );
};

export default MyBids;
