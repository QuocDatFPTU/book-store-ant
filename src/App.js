import React from 'react';
import { Provider } from 'react-redux';
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

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App = () => {
  // const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {/* <HomePage /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          <Route path="/cart-contact" element={<CartContact />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
