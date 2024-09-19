/* eslint-disable react/prop-types */
import {
  IconHome,
  IconLogin,
  IconShoppingBag,
  IconTimeDurationOff,
} from "@tabler/icons-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/SignUp";
import Home from "../components/Home";
import Cart from "../components/Cart";
import Shop from "../components/Shop";
import History from "../components/History";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import OtpCode from "../components/Auth/Otp";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  return isAuthenticated() ? element : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ element }) => {
  return element;
};

const Path = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const [isAuth, setIsAuth] = useState(isAuthenticated());
//  console.log(isAuthenticated())
  useEffect(() => {
    const unsubscribe = useUserStore.subscribe(
      (state) => state.userToken,
      () => setIsAuth(isAuthenticated())
    );
    return () => unsubscribe();
  }, [isAuthenticated]);

  const publicRoutes = [
    {
      path: "/",
      element: <Home />,
      icon: <IconHome />,
    },
    {
      path: "/shop",
      element: <Shop />,
      icon: <IconHome />,
    },
  ];

  const privateRoutes = [
    {
      path: "/history",
      element: <History />,
      icon: <IconTimeDurationOff />,
    },
    {
      path: "/cart",
      element: <Cart />,
      icon: <IconShoppingBag />,
    },
  ];

  const authRoutes = [
    {
      path: "/auth/login",
      element: <Login />,
      icon: <IconLogin />,
    },
    {
      path: "/auth/signup",
      element: <Signup />,
      icon: <IconLogin />,
    },
    {
      path: "/auth/otp",
      element: <OtpCode />,
      icon: <IconLogin />,
    },
  ];

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicRoute element={route.element} />}
        />
      ))}

      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedRoute element={route.element} />}
        />
      ))}

      {authRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={isAuth ? <Navigate to="/" replace /> : route.element}
        />
      ))}

      <Route
        path="*"
        element={
          isAuth ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default Path;
