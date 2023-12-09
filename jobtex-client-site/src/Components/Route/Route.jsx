import { createBrowserRouter } from "react-router-dom"
import ErrorElement from "../Pages/ErrorElement"
import Root from "../Root/Root"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import AddJobs from "../Pages/AddJobs"
import JobDetails from "../Pages/JobDetails"
import MyBids from "../Pages/MyBids"
import PostJobs from "../Pages/PostJobs"
import BidRequest from "../Pages/BidRequest"
import PrivetRoute from "../Auth/PrivetRoute"
import UpdatedJobs from "../Pages/UpdatedJobs"

const Route = createBrowserRouter([
    {
        path : '/',
        errorElement : <ErrorElement></ErrorElement>,
        element : <Root></Root>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : 'login',
                element : <Login></Login>
            },
            {
                path : 'register',
                element : <Register></Register>
            },
            {
                path : 'addJob',
                element : <PrivetRoute><AddJobs></AddJobs></PrivetRoute>
            },
            {
                path : 'jobs/:id',
                element : <PrivetRoute><JobDetails></JobDetails></PrivetRoute>,
                loader : ({params}) => fetch(`https://jobtex-server-site.vercel.app/jobs/${params.id}`)
            },
            {
                path : 'myBids',
                element : <PrivetRoute><MyBids></MyBids></PrivetRoute>
            },
            {
                path : 'postedJob',
                element : <PrivetRoute><PostJobs></PostJobs></PrivetRoute>
            },
            {
                path : 'bidRequest',
                element : <PrivetRoute><BidRequest></BidRequest></PrivetRoute>,
                // loader : () => fetch("http://localhost:5000/mybids")
            },
            {
                path : 'update/:id',
                element : <PrivetRoute><UpdatedJobs></UpdatedJobs></PrivetRoute>,
                loader : ({params}) => fetch(`https://jobtex-server-site.vercel.app/jobs/${params.id}`)
            },


        ]
    }
])

export default Route
