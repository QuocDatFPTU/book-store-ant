import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.less';
import { store } from '../src/redux/store';
import HomePage from 'pages/store/home';
import Login from 'pages/home/login';
import ProductList from 'pages/store/product-list';
import ProfilePage from 'pages/store/profile';
import ProductDetail from 'pages/store/product-detail';
import BlogDetail from 'pages/store/blog-detail';
import CartContact from 'pages/store/cart-contact';
import Register from 'pages/home/register';
import ForgetPassword from 'pages/home/forget-password';
import ResetPassword from 'pages/home/reset-password';
import ChangePassword from 'pages/home/change-password';
import OrderList from 'pages/store/order-list';
import Cart from 'pages/store/cart';
import InformationOrder from 'pages/store/information-order';
import ScrollToTop from 'components/scroll-to-top';
import CartCompletion from 'pages/store/cart-completion';
import ManageProductList from 'pages/dashboard/products/product-list.container';
import DashboardSider from 'layouts/dashboard/dashboard.sider';
import DashboardLayout from 'layouts/dashboard/dashboard.layout';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {/* <HomePage /> */}
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product-list/:id" element={<ProductList />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            {/* <Route path="/blog-detail" element={<BlogDetail />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart-contact" element={<CartContact />} />
            <Route path="/cart-completion/:id" element={<CartCompletion />} />
            <Route path="/order-list" element={<OrderList />} />
            <Route
              path="/order-information/:id"
              element={<InformationOrder />}
            />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
            {currentUser?.role === 'R03' && (
              <Route
                path="dashboard"
                element={
                  <DashboardLayout sider={<DashboardSider />} title="Admin" />
                }
              >
                <Route path="product" element={<ManageProductList />} />
              </Route>
            )}
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
