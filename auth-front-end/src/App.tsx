import React from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider, Navigate} from 'react-router-dom';
import Home from "./pages/Home";
import AuthLayout from "./pages/auth/AuthLayout";
import NavbarLayout from "./pages/NavbarLayout";
import UserDetails from "./pages/landing/UserDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Authenticated from "./pages/landing/Authenticated";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet />}>
            <Route element={<NavbarLayout />}>
                <Route index element={<Home />} />
                <Route path="landing" element={<Authenticated />}>
                    <Route index element={<UserDetails />} />
                </Route>
            </Route>
            <Route path="auth" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Route>
    )
)

export default function App() {
  return (
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  );
}


