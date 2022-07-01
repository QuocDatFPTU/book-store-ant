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
import OrderList from 'pages/store/order-list';
import Cart from 'pages/store/cart';
import InformationOrder from 'pages/store/information-order';
import StoreLayoutContainer from 'layouts/store/store.layout';
import ProtectedRoute from 'components/protected-route';
import ManageProductList from 'pages/dashboard/products/product-list.container';
import ManageSliderList from 'pages/dashboard/sliders/slider-list.container';

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
          <Route path="/" element={<StoreLayoutContainer />}>
            //Public route
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product-list/:id" element={<ProductList />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/blog-detail" element={<BlogDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart-contact" element={<CartContact />} />
            {/* </Route> */}
            //Protected route
            {/* <Route element={<ProtectedRoute allowed={['customer']} />}> */}
            <Route path="/order-list" element={<OrderList />} />
            <Route path="/information-order" element={<InformationOrder />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          {/* </Route> */}
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>

        <Routes>
          <Route path="/manage-product-list" element={<ManageProductList />} />
          <Route path="/manage-slider-list" element={<ManageSliderList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
