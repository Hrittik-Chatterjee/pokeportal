import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import Details from "../pages/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details",
        element: <Details />,
      },
    ],
  },
]);
