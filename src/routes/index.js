import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminWrapper from "../pages/admin/AdminWrapper";
import AuthWrapper from "../pages/admin/auth/AuthWrapper";
import Login from "../pages/admin/auth/Login";
import AllOccurrences from "../pages/admin/settings/AllOccurrences";
import Categories from "../pages/admin/settings/Categories";
import Products from "../pages/admin/settings/Products";
import Sectors from "../pages/admin/settings/Sectors";
import Units from "../pages/admin/settings/Units";
import Home from "../pages/home";
import NewOccurrence from "../pages/new-occurrence";

export default function () {
  const isLogged = useSelector((state) => state.userInfo.isLogged);
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

        {/* Login STACK  */}
        {!isLogged && (
          <Route path="login" element={<AuthWrapper />}>
            <Route index element={<Login />} />
          </Route>
        )}
      </Route>
    </Routes>
  );
}
