import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.less';
// import { store } from '../src/redux/store';
import HomePage from 'pages/store/home';
import Login from 'pages/home/login';
import ProductList from 'pages/store/product-list';
import ProfilePage from 'pages/store/profile';
import ProductDetail from 'pages/store/product-detail';
import BlogDetail from 'pages/store/blog-detail-test';
import CartContact from 'pages/store/cart-contact';
import Register from 'pages/home/register';
import ForgetPassword from 'pages/home/forget-password';
import ResetPassword from 'pages/home/reset-password';
import ChangePassword from 'pages/home/change-password';
import { Button } from 'antd';
import OrderList from 'pages/store/order-list';
import Cart from 'pages/store/cart';
import InformationOrder from 'pages/store/information-order';
import StoreLayoutContainer from 'layouts/store/store.layout';
import ProtectedRoute from 'components/protected-route';
import store, { persistor } from 'redux/rtkStore';
import { PersistGate } from 'redux-persist/integration/react';
import DashboardSider from 'layouts/dashboard/dashboard.sider';
import ManageProductList from 'pages/dashboard/products/product-list.container';
import DashboardLayout from 'layouts/dashboard/dashboard.layout';
import ManagePostList from 'pages/dashboard/posts/post-list.container';
import BlogList from 'pages/store/blog';
import BlogListDetail from 'pages/store/blog-detail';
import ManageSliderList from 'pages/dashboard/slider/slider-list.container';
import AccountList from 'pages/dashboard/student/account-list.container';
import ManageOrderList from 'pages/dashboard/orders/order-list.container';
import ManageCustomerList from 'pages/dashboard/customers/customer-list.container';
import CartCompletion from 'pages/store/cart-completion';
import MarketingDashboard from 'pages/marketing';
import SaleDashboard from 'pages/sale';
import AdminDashboard from 'pages/admin';
import VerifyAccountPage from 'pages/home/verify-account';
import ManageFeedbackList from 'pages/dashboard/feedbacks/feedback-list.container';
import { current } from '@reduxjs/toolkit';
import NotFoundPage from 'pages/home/404';
import NotAuthorizePage from 'pages/home/401';
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      {/* <HomePage /> */}
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StoreLayoutContainer />}>
              //Public route
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/product-list/:id" element={<ProductList />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:blogId" element={<BlogListDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart-contact" element={<CartContact />} />
              <Route path="/cart-completion/:id" element={<CartCompletion />} />
              //Protected route
              <Route element={<ProtectedRoute allowedRoles={['R01']} />}>
                <Route path="/order-list" element={<OrderList />} />
                <Route
                  path="/order-information/:id"
                  element={<InformationOrder />}
                />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password/:id" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/verify-account/:id" element={<VerifyAccountPage />} />
          </Routes>
          <Routes>
            <Route
              element={
                <ProtectedRoute allowedRoles={['R00', 'R03', 'R04', 'R05']} />
              }
            >
              <Route
                path="dashboard"
                element={
                  <DashboardLayout
                    sider={<DashboardSider />}
                    title="Dashboard"
                  />
                }
              >
                {currentUser?.role === 'R00' && (
                  <Route path="" element={<AdminDashboard />} />
                )}
                {(currentUser?.role === 'R05' ||
                  currentUser?.role === 'R04') && (
                    <Route path="" element={<SaleDashboard />} />
                  )}
                {currentUser?.role === 'R03' && (
                  <Route path="" element={<MarketingDashboard />} />
                )}
                <Route element={<ProtectedRoute allowedRoles={['R00']} />}>
                  <Route path="user" element={<AccountList />} />
                </Route>
                <Route element={<ProtectedRoute allowedRoles={['R03']} />}>
                  <Route path="product" element={<ManageProductList />} />
                  <Route path="customer" element={<ManageCustomerList />} />
                  <Route path="post" element={<ManagePostList />} />
                  <Route path="slider" element={<ManageSliderList />} />
                  <Route path="feedback" element={<ManageFeedbackList />} />
                </Route>
                <Route
                  element={<ProtectedRoute allowedRoles={['R04', 'R05']} />}
                >
                  <Route path="order" element={<ManageOrderList />} />
                </Route>
                <Route path="/dashboard/*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
          <Routes>
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/401" element={<NotAuthorizePage />} />
            {/* <Route path="/*" element={<NotFoundPage />} /> */}
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </>
  );
};

export default AppWrapper;
