import { Navigate, Route, Routes } from "react-router-dom";
import AdminWrapper from "../pages/admin/AdminWrapper";
import AuthWrapper from "../pages/admin/auth/AuthWrapper";
import ForgotPassword from "../pages/admin/auth/ForgotPassword";
import Login from "../pages/admin/auth/Login";
import AllOccurrences from "../pages/admin/settings/AllOccurrences";
import Categories from "../pages/admin/settings/Categories";
import Products from "../pages/admin/settings/Products";
import Sectors from "../pages/admin/settings/Sectors";
import Units from "../pages/admin/settings/Units";
import Home from "../pages/home";
import NewOccurrence from "../pages/new-occurrence";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-occurrence" element={<NewOccurrence />} />
      <Route path="/admin" element={<AdminWrapper />}>
        <Route index element={<Navigate replace to={"occurrences"} />} />
        <Route path="occurrences" element={<AllOccurrences />} />
        <Route path="units" element={<Units />} />
        <Route path="sectors" element={<Sectors />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      {/* Login STACK  */}
      <Route path="/auth" element={<AuthWrapper />}>
        <Route index element={<Navigate replace to={"login"} />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
