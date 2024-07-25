import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import MenuEditor from "./app/home/pages/MenuEditor";
import UsersPage from "./app/home/pages/UserPage/UserPage";
import UsersConfigPage from "./app/home/pages/UsersConfigPage/UsersConfigPage";
import EditUserPage from "./app/home/pages/UsersEditPage/EditUserPage";
import UserHistory from "./app/home/pages/UserHistory";
import UserStatistics from "./app/home/pages/UserStatistics";
import LoginClientPage from "./app/home/pages/LoginClientePage/LoginClientePage";
import HomeClientePage from "./app/home/pages/HomeClientePage/HomeClientePage";
import LoginRestaurantPage from "./app/home/pages/LoginRestaurantePage/LoginRestaurantePage";
import HomeRestaurantePage from "./app/home/pages/HomeRestaurantePage/HomeRestaurantePage";
import AddEditItem from "./app/home/pages/AddEditItem";
import ForgotPasswordPage from "./app/home/pages/EsqueciClientePage/ForgotPage";
import ResetPasswordPage from "./app/home/pages/EsqueciClientePage/ResetPage";
import RestaurantRegistrationPage from "./app/home/pages/RestaurantRegistration/RestaurantRegistrationPage";
import RestaurantProfilePage from "./app/home/pages/RestaurantProfilePage";
import RestaurantCRUD from "./app/home/pages/RestaurantCRUDPage/RestaurantCRUD";
import Layout from "./shared/components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/create-test",
        element: <CreateTest />,
      },
      {
        path: "/tests",
        element: <ListTests />,
      },
      {
        path: "/restaurant/:restaurant_id",
        element: <RestaurantProfilePage />,
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
        element: <AddEditItem type="add" />,
      },
      {
        path: "/:restaurant_id/edit-item/:item_id",
        element: <AddEditItem type="edit" />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/config",
        element: <UsersConfigPage />,
      },
      {
        path: "/users/config/edit/:userId",
        element: <EditUserPage />,
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
        path: "/login-client",
        element: <LoginClientPage />,
      },
      {
        path: "/home-client",
        element: <HomeClientePage />,
      },
      {
        path: "/login-restaurant",
        element: <LoginRestaurantPage />,
      },
      {
        path: "/home-restaurant",
        element: <HomeRestaurantePage />,
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
        path: "/register-restaurant",
        element: <RestaurantRegistrationPage />,
      },
      {
        path: "/restaurantsCRUD",
        element: <RestaurantCRUD />,
      },
      {
        path: "*",
        element: <h1>Página não encontrada</h1>,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
