import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Pages
import Home from "./pages/private/admin_home.jsx";
import SignIn from "./pages/private/signin.jsx";
import ManagePost from './pages/private/managepost.jsx';
import CreatePost from "./pages/private/create_post.jsx";
import Article from "./pages/article.jsx";
import Modify from "./pages/private/article.jsx";
import Update_Article from './pages/private/update_article.jsx';
import ErrorPage from './pages/error_page.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from "./pages/private/privateroute.jsx"

const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement:<ErrorPage />
        },
        {
            path: "admin",
            element: <SignIn />,
            errorElement:<ErrorPage />
        },
        {
            path: "home",
            element: (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Home />
                </PrivateRoute>
            ),
            errorElement:<ErrorPage />,
            children: [
                {
                    path: "createpost",
                    element: (
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <CreatePost />
                        </PrivateRoute>
                    ),
                    errorElement:<ErrorPage />
                },
                {
                    path: "managepost",
                    element: (
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <ManagePost />
                        </PrivateRoute>
                    ),
                    errorElement:<ErrorPage />
                },
            ],
        },
        {
            path:"modify/:id",
            element:<PrivateRoute isAuthenticated={isAuthenticated}>
                <Modify />
            </PrivateRoute>,
            errorElement:<ErrorPage />,  
        }, 
        {
            path:"article/update/:id",
            element: <PrivateRoute isAuthenticated={isAuthenticated}>
            <Update_Article />
            </PrivateRoute>    
        },       
        {
            path: "article/:slug",
            element: <Article />,
            errorElement:<ErrorPage />
        },
        {
            path: "managepost",
            element: <ManagePost />,
            errorElement:<ErrorPage />
        },
    ]);

    return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>,
);
