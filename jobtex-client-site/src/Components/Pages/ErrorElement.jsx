import { Link } from "react-router-dom"

const ErrorElement = () => {
  return (
    <div className="flex gap-6 justify-center flex-col items-center h-screen">
      <img className="w-60" src="https://i.ibb.co/bzHVPYV/8157731-404-error-sign-removebg-preview.png" alt="" />
      <h2 className="text-4xl font-semibold">Not found page</h2>
     <Link to='/'> <button  className="btn btn-neutral">Back To Home</button></Link>
    </div>
  )
}

export default ErrorElement
