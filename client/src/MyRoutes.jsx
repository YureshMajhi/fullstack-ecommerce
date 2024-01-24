import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Layouts from "./components/Layouts";
import HomePage from "./pages/HomePage";
import NewIn from "./pages/NewIn";
import BestSellers from "./pages/BestSellers";
import Pricing from "./pages/Pricing";
import ShopAll from "./pages/ShopAll";
import About from "./pages/About";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import EmailVerification from "./pages/EmailVerification";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminCategory from "./components/Admin/Category/AdminCategory";
import AddCategory from "./components/Admin/Category/AddCategory";
import UpdateCategory from "./components/Admin/Category/UpdateCategory";
import AdminProduct from "./components/Admin/Product/AdminProduct";
import AddProduct from "./components/Admin/Product/AddProduct";
import UpdateProduct from "./components/Admin/Product/UpdateProduct";
import AdminRoute from "./selectiveRoutes/AdminRoute";
import CheckoutForm from "./pages/CheckoutForm";
import PaymentMain from "./pages/PaymentMain";
import PaymentSuccess from "./pages/PaymentSuccess";
import Profile from "./pages/Profile";
import UsersMain from "./components/Admin/UsersMain";
import OrdersMain from "./components/Admin/OrdersMain";
import OrderDetails from "./components/Admin/OrderDetails";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          {/* Customer */}
          <Route index element={<HomePage />} />
          <Route path="newIn" element={<NewIn />} />
          <Route path="userprofile" element={<Profile />} />
          {/*View order using userProfile  */}
          <Route path="userprofile/:id" element={<OrderDetails />} />{" "}
          <Route path="bestsellers" element={<BestSellers />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="shopAll" element={<ShopAll />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="forgotpassword" element={<ForgetPassword />} />
          <Route path="checkout" element={<CheckoutForm />} />
          <Route path="payment" element={<PaymentMain />} />
          <Route path="payment/success" element={<PaymentSuccess />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} />
          <Route
            path="emailverification/:token"
            element={<EmailVerification />}
          />
          {/* admin  */}
          <Route path="/" element={<AdminRoute />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

              {/* Category */}
              <Route path="category" element={<AdminCategory />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="category/update/:id" element={<UpdateCategory />} />

              {/* Product */}
              <Route path="product" element={<AdminProduct />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="product/update/:id" element={<UpdateProduct />} />

              <Route path="user" element={<UsersMain />} />
              <Route path="order" element={<OrdersMain />} />
              <Route path="order/:id" element={<OrderDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default MyRoutes;
