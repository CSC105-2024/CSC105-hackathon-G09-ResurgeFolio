import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitPortfolio from './pages/SubmitPortfolio';
import UserEdit from './pages/UserEdit';
import BrowseResume from './pages/BrowseResume';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
    {
    path: "/login",
    element: <Login/>
  },
      {
    path: "/register",
    element: <Register/>
  },
        {
    path: "/submit",
    element: <SubmitPortfolio/>
  },
          {
    path: "/useredit",
    element: <UserEdit/>
  },
            {
    path: "/browse",
    element: <BrowseResume/>
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Provide the router to the app */}
  </StrictMode>
);
