import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import CreateTest from './app/home/pages/CreateTest';
import ListTests from './app/home/pages/ListTests';
import MenuEditor from './app/home/pages/MenuEditor';
import UsersPage from './app/home/pages/UserPage/UserPage';
import LoginClientPage from './app/home/pages/LoginClientePage/LoginClientePage';
import HomeClientePage from './app/home/pages/HomeClientePage/HomeClientePage'; 
import AddItem from './app/home/pages/AddItem';

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
    path: "/:restaurant_id/add_item",
    element: <AddItem />,
  },
  {
    path: "/users",
    element: <UsersPage />,
  },
  {
    path: "/login-client",
    element: <LoginClientPage />,
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
