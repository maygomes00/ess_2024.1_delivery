import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import CreateTest from './app/home/pages/CreateTest';
import ListTests from './app/home/pages/ListTests';
import MenuEditor from './app/home/pages/MenuEditor';
import UsersPage from './app/home/pages/UserPage/UserPage';
import UserHistory from "./app/home/pages/UserHistory";
import UserStatistics from "./app/home/pages/UserStatistics";
import LoginClientPage from './app/home/pages/LoginClientePage/LoginClientePage';
import HomeClientePage from './app/home/pages/HomeClientePage/HomeClientePage'; 
import AddEditItem from './app/home/pages/AddEditItem';
import ForgotPasswordPage from './app/home/pages/EsqueciClientePage/ForgotPage';
import ResetPasswordPage from './app/home/pages/EsqueciClientePage/ResetPage';

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
    path: "/:restaurant_id/menu-editor",
    element: <MenuEditor />,
  },
  {
    path: "/:restaurant_id/menu-editor/:page",
    element: <MenuEditor />,
  },
  {
    path: "/:restaurant_id/add-item",
    element: <AddEditItem type='add' />,
  },
  {
    path: "/:restaurant_id/edit-item/:item_id",
    element: <AddEditItem type='edit' />,
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
    path: "/home-client",
    element: <HomeClientePage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/forgot-password/reset/:token",
    element: <ResetPasswordPage />,
  },
  {
    path: "/",
    element: <Navigate to="/login-client" replace />,
  },
  {
    path: "*",
    element: <h1>Página não encontrada</h1>,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
