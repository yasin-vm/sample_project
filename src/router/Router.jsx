import { createBrowserRouter } from "react-router";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Dashbord from "../pages/dashbord/Dashbord";
import Layout from "../layout/Layout";
import Profile from "../pages/profile/Profile";
import AddTransaction from "../components/buttons/AddTransaction";
const router = createBrowserRouter([
    
    {
    path:'/',
    element:<Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path:'/app',
        element:<Layout/>,
       children:[
    {
        index:true,
        element:<Dashbord/>
    },
    {
        path:'dashbord',
        element:<Dashbord/>
    },
    {
        path: 'addTransaction', // Your new sub-page path. Accessible at /app/add-transaction
        element: <AddTransaction />
      },
    {
        path:'profile',
        element:<Profile/>
    }
]


  
    }

])

export default router

