import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const BidRequest = () => {
  useEffect(() => {
    document.title = "JobText | Bid Request";
  }, []);
  const { user, loading } = useContext(AuthContext);
  const [requestBid, setRequestBid] = useState([]);
  const [loaderPage, setLoaderPage] = useState(true);

  useEffect(() => {
    axios
      .get(`https://jobtex-server-site.vercel.app/bidsRequest?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setRequestBid(res.data);
        setLoaderPage(false)
      });
  }, []);

  const handleAccept = (id) => {
    console.log(id);
    const url = `https://jobtex-server-site.vercel.app/bidsRequest/${id}`;

    const statusInfo = { status: "accept" };

    axios.patch(url, statusInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Product Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        const remaining = requestBid.filter((req) => req._id !== id);
        const updated = requestBid.find((update) => update._id === id);
        updated.status = "accept";
        const newBids = [updated, ...remaining];
        setRequestBid(newBids);
      }
    });
  };
  const handleReject = (id) => {
    const url = `https://jobtex-server-site.vercel.app/bidsRequest/${id}`;

    const statusInfo = { status: "reject" };

    axios.patch(url, statusInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Product Updated Successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        const remaining = requestBid.filter((req) => req._id !== id);
        console.log(remaining);
        const rejected = requestBid.find((update) => update._id === id);
        rejected.status = "reject";
        const newBids = [...remaining, rejected];
        setRequestBid(newBids);
      }
    });
  };
  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className="my-10">
      <h2 className="text-4xl text-center font-semibold">Bid Request</h2>
      <div className="overflow-x-auto mt-12 min-h-[30vh]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requestBid.map((bid) => (
              <tr key={bid._id}>
                <td>{bid.title}</td>
                <td>{bid.yourEmail}</td>
                <td>{bid.yourDeadline}</td>
                <td>{bid.price}</td>
                <td>
                  {bid.status === "complete" && (
                    <span className="btn btn-sm btn-info cursor-text">
                      Completed
                    </span>
                  )}

                  {bid?.status === "accept" && (
                    <span className="btn-success p-2 rounded-lg mr-2">
                      In Progress
                    </span>
                  )}

                  {bid?.status === "reject" && (
                    <span className="btn-success p-2 rounded-lg mr-2">
                      Rejected
                    </span>
                  )}
                  
                  {bid.status === "pending" && (
                    <span className="btn btn-sm btn-neutral text-sm cursor-text">
                      Pending
                    </span>
                  )}
                   

                </td>

                <td>
                  {bid?.status === "accept" || bid?.status === "complete" ||  bid?.status === "reject"? (
                    <>
                      <div className="flex gap-2">
                      <button disabled className="btn btn-sm btn-primary mr-2">
                        Accept
                      </button>
                      <button disabled className="btn btn-sm btn-primary mr-2">
                        Reject
                      </button>
                      </div>
                    </>
                  ) : (
                   <>
                     <div className="flex gap-2">
                     <button
                      onClick={() => handleAccept(bid._id)}
                      className="btn btn-sm btn-primary mr-2"
                    >
                      Accept
                    </button>
                    <button onClick={()=> handleReject(bid._id)} className="btn btn-sm btn-error">Reject</button>
                     </div>
                   </>
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

export default BidRequest;
