import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  useEffect(() => {
    document.title = 'JobText | Login'
  },[])
    const {loginUser,googleLogin,setLoading} = useContext(AuthContext);
    const [errorMessage,setErrorMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
        loginUser(email,password)
        .then(result => {
            console.log(result.user)
            navigate(location?.state ? location.state : '/')
            toast.success("Login" , {
                autoClose: 1000,
            })
            
        }).catch(error => {
            console.log(error.message)
            setErrorMessage("Email and password do not match!")
            toast.error('Email and password do not match!')
            setLoading(false)
        })
    }
    const handleGoogleLogin = () => {
      googleLogin().then(result => {
        console.log(result.user)
        navigate(location?.state ? location.state : "/");
        toast.success('Login Success.');
        setLoading(false)
      }).catch(error => {
        console.error(error.message)
      })
    }
  
  return (
    <div className="mt-10">
      <div className="card w-full max-w-xl shadow mx-auto pb-10">
      <h2 className="text-2xl text-center font-bold mt-5">Login Now</h2>
      <div className="text-center">
            {errorMessage && (
              <span className="text-lg text-red-600">{errorMessage}</span>
            )}
          </div>
        <form onSubmit={handleLogin} className="card-body">
     
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
            name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
            name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral">Login</button>
          </div>
        </form>
        <div className="text-center">
            <span>Do you not have an account? Please <Link className="text-green-600" to='/register'>Register</Link></span>
        </div>
        <div className="my-4">
          <button onClick={handleGoogleLogin} className="flex w-full items-center gap-6 btn btn-primary  btn-outline text-white">
            <FcGoogle className="text-2xl"></FcGoogle>
            <span>Login With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
