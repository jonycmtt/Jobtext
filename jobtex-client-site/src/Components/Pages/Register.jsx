import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  useEffect(() => {
    document.title = 'JobText | Register'
  },[])
  const [registerError, setRegisterError] = useState("");
  const { createUser, updateProfileInfo ,setLoading,googleLogin,loading} = useContext(AuthContext);
  const navigator = useNavigate();
  const navigate = useNavigate()
  const location = useLocation()

  if (loading) {
    return (
      <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;
    console.log({ name, email, password, photoUrl });

    if (password < 6) {
      setRegisterError("Please enter 6 character  Password");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password must contain at least one uppercase letter."
      );
      return;
    } else if (!/[!,#,$,%,*,@]/.test(password)) {
      setRegisterError("Your password must be added !,#,$,%,*.");
      return;
    }
    setRegisterError("");

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateProfileInfo(result?.user, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            console.log("Profile Updated");
            navigator("/");
            toast.success("Successfully Register", {
              autoClose: 1000,
            });
            setLoading(false)
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.error(error.message);
        setRegisterError("Password should be at least 6 characters");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin().then(result => {
      console.log(result.user)
      navigate(location?.state ? location.state : "/");
      toast.success('Registration Success.');
      setLoading(false)
    }).catch(error => {
      console.error(error.message)
    })
  }

  return (
    <div className="mt-5">
      <div className="card w-full max-w-xl shadow mx-auto pb-10">
        <h2 className="text-2xl text-center font-bold mt-5">Register Now</h2>
        <div className="text-center mt-2">
          {registerError && (
            <span className="text-rose-500">{registerError}</span>
          )}
        </div>
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photoUrl"
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral">Register</button>
          </div>
        </form>
        <div className="text-center">
          <span>
            Have an account ? Please{" "}
            <Link className="text-green-600" to="/login">
              Login
            </Link>
          </span>
          <div className="my-4">
          <button onClick={handleGoogleLogin} className="flex w-full items-center gap-6 btn btn-primary  btn-outline text-white">
            <FcGoogle className="text-2xl"></FcGoogle>
            <span>Login With Google</span>
          </button>
        </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
