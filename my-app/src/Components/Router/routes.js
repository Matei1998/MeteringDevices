import { createBrowserRouter } from "react-router-dom";
import Administrator from '../../AdministratorPage/Administrator';
import Login from '../../LoginPage/Login';
import User from '../../UserPage/User';
import Register from '../../RegisterPage/Register'
import ProtectedRoute from './ProtectedRoute'; 

const routes = [
    {
        path: "/Administrator",
        element: (
            <ProtectedRoute allowedRoles={['administrator']}>
                <Administrator />
            </ProtectedRoute>
        )
    },
    {
        path: "/User/:userId",
        element: (
            <ProtectedRoute allowedRoles={['user']}>
                <User />
            </ProtectedRoute>
        )
    },
    
    {
        path:"/Register",
        element:<Register />
    },
    {
        path: "/",  
        element: <Login />
    }
];

export const router = createBrowserRouter(routes);
