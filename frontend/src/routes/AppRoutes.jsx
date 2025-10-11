import { createBrowserRouter } from "react-router";

import Home from "../pages/Home/Home";
import Layout from "../components/layout/Layout";
import Profile from "../pages/Profile/Profile";
import Categories from "../pages/catagory/Catagories";
import Products from "../pages/Product/Products";
import ProductDetails from "../pages/Product/ProductDetails";
import ProtectedRoute from "../components/ProtectedRoutes";
import Login from "../features/auth/Login";
import Account from "../pages/account/Account";
import WishList from "../pages/userChooses/WishList";
import CartList from "../pages/userChooses/CartList";
import SingleProductLocal from "../pages/userChooses/SingleProductLocal";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout wraps all children
    children: [
     {
        index:true,
        element:<Home/>
     },
      {
        path: "products", // child path: "/products"
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "catagories", // child path: "/catagories"
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
  { path: ":slug", element: <Home /> }, // dynamic route, e.g., "/laptops"
  { path: "userChooses/WishList", element: <WishList /> },
  { path: "userChooses/CartList", element: <CartList /> },
  { path: "userChooses/product/:id", element: <SingleProductLocal /> },
      {
        path: "account", // this is the user’s private page
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "login", element: <Login /> }, // public login page
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
  path: "/profile",
  element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
}
]);
