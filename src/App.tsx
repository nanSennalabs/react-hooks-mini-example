import { hookRoutes } from "features/hook/hookRoutes";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

export function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Navigate to="" />,
    },
    {
      path: "*",
      element: <Navigate to="" />,
    },
    ...hookRoutes,
  ]);

  return <RouterProvider router={router} />;
}
