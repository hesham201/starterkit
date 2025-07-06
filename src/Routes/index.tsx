import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LayoutRoutes from "./LayoutRoutes";
import Login from "../Component/Authentication/Login";
import { useAuth } from "../context/AuthContext";

const RouterData = () => {
  const { isAuthenticated } = useAuth();
  // const login = localStorage.getItem("login");
  return (
    <BrowserRouter basename={"/"}>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path={"/"} element={<Navigate to={`/pages/samplepage`} />} />
          </>
        ) : (
          ""
        )}
        <Route path={"/"} element={<PrivateRoute />}>
          <Route path={`/*`} element={<LayoutRoutes />} />
        </Route>
        <Route path={`/login`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterData;
