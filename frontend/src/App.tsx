import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import MenuEditor from "./app/home/pages/MenuEditor";
import UsersPage from "./app/home/pages/UserPage/UserPage";
import UserHistory from "./app/home/pages/UserHistory";
import UserStatistics from "./app/home/pages/UserStatistics";

const router = createBrowserRouter([
  {
    path: "/create-test",
    element: <CreateTest />,
  },
  {
    path: "/tests",
    element: <ListTests />,
  },
  {
    path: "/:restaurant_id/menu_editor",
    element: <MenuEditor />,
  },
  {
    path: "/:restaurant_id/menu_editor/:page",
    element: <MenuEditor />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/:user_id/history",
    element: <UserHistory />,
  },
  {
    path: "/:user_id/statistics",
    element: <UserStatistics />,
  },
  {
    path: "/",
    element: <Navigate to="/create-test" replace />,
  },
  {
    path: "*",
    element: <h1>Página não encontrada</h1>,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
