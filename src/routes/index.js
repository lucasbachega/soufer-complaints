import { Navigate, Route, Routes } from "react-router-dom";
import AdminWrapper from "../pages/admin/AdminWrapper";
import AllOccurrences from "../pages/admin/settings/AllOccurrences";
import Categories from "../pages/admin/settings/Categories";
import Products from "../pages/admin/settings/Products";
import Sectors from "../pages/admin/settings/Sectors";
import Units from "../pages/admin/settings/Units";
import Users from "../pages/admin/settings/Users";
import AuthWrapper from "../pages/auth/AuthWrapper";
import Login from "../pages/auth/Login";
import Gestor from "../pages/gestor";
import Home from "../pages/home";
import Insecurity from "../pages/insecurity";
import MyOccurrences from "../pages/my-occurrences";
import NewOccurrence from "../pages/new-occurrence";
import Transport from "../pages/transport";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route
        path="/home"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/my-occurrences"
        element={
          <ProtectedRoutes>
            <MyOccurrences />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/insecurity"
        element={
          <ProtectedRoutes>
            <Insecurity />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/new-occurrence"
        element={
          <ProtectedRoutes>
            <NewOccurrence />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/gestor"
        element={
          <ProtectedRoutes>
            <Gestor />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/transport"
        element={
          <ProtectedRoutes>
            <Transport />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoutes>
            <AdminWrapper />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Navigate replace to={"occurrences"} />} />
        <Route path="occurrences" element={<AllOccurrences />} />
        <Route path="users" element={<Users />} />
        <Route path="units" element={<Units />} />
        <Route path="sectors" element={<Sectors />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route
        path="/login"
        element={
          <PublicRoutes>
            <AuthWrapper />
          </PublicRoutes>
        }
      >
        <Route index element={<Login />} />
      </Route>
    </Routes>
  );
}
