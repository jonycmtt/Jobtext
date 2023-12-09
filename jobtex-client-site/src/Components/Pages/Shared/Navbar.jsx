import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Auth/AuthProvider";

const Navbar = () => {
    const {user,logOutUser} = useContext(AuthContext)

    const handleLogout = () => {
        logOutUser()
        .then(() => {
            toast.success('LogOut', {
                autoClose: 1000,
            })
        }).catch(error => {
            console.log(error.message)
        })
    }
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addJob"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Add Job
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/postedJob"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          My Posted Job
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myBids"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          My Bids
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bidRequest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Bid Request
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-black text-white">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown ">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 bg-slate-500"
            >
              {navLinks}
            </ul>
          </div>
          <div>
            <Link to="/">
              <img
                className="w-40"
                src="https://i.ibb.co/7NK8Pbp/download-1.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" items-center gap-4 menu-horizontal px-1 text-[17px]">{navLinks}</ul>
        </div>
        <div className="navbar-end">
            {user ? <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-500 rounded-box w-52"
            >
              <li>
                <span className="justify-between text-lg my-2">
                  {user?.displayName}
                </span>
              </li>
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <span onClick={handleLogout} className="btn btn-sm hover:bg-dark">Logout</span>
              </li>
            </ul>
          </div>
          :
          <Link to='/login'>
             <button className="btn btn-primary">Login</button>
          </Link>
          }
           
          
        </div>
      </div>
      <ToastContainer position="top-center"></ToastContainer>
    </div>
  );
};

export default Navbar;
