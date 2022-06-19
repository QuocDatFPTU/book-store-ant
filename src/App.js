import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.less';
import { store } from '../src/redux/store';
import HomePage from 'pages/store/home';
import Login from 'pages/home/login';
import ProductList from 'pages/store/product-list';
import ProfilePage from 'pages/store/profile';
import { Button } from 'antd';
import OrderList from 'pages/store/order-list';
import Cart from 'pages/store/cart';
import InformationOrder from 'pages/store/information-order';

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
          <Route path="/login" element={<Login />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/information-order" element={<InformationOrder />} />
          {/* </Route> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppWrapper;
