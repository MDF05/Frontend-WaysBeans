import { createBrowserRouter, RouterProvider } from "react-router-dom";

import BaseLayout from "../features/USER/base-layout/component/Base-Layout";
import Home from "../features/USER/home/component/Home";
import Profile from "../features/USER/profile/component/Profile";
import BaseAuthLayout from "../features/USER/auth/component/Base-Auth-Layout";
import Login from "../features/USER/auth/login/component/Login";
import Register from "../features/USER/auth/register/component/Register";
import AdminProduct from "../features/ADMIN/product/component/Admin-Product";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <BaseLayout></BaseLayout>,
      children: [
        { path: "/admin", element: <Home></Home> },
        { path: "/admin/product", element: <AdminProduct></AdminProduct> },
      ],
    },
    {
      path: "/",
      element: <BaseLayout></BaseLayout>,
      children: [
        { path: "/", element: <Home></Home> },
        { path: "/profile/:name", element: <Profile></Profile> },
      ],
    },
    {
      path: "/",
      element: <BaseAuthLayout />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
