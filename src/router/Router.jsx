import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Home from "../pages/home/Home";
import Dashbord from "../pages/dashbord/Dashbord";
import Layout from "../layout/Layout";
import Profile from "../pages/profile/Profile";

const router = createBrowserRouter([
    
    {
        path:'/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
            index:true,
            element:<Home/>
            },
            {
            path:'home',
            element:<Home/>
            },
            {
                path:'dashbord',
                element:<Dashbord/>

            },
            {
                path:'profile',
                element:<Profile />

            }
        ]



  
    }

])

export default router

