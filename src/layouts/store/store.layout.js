import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterContainer from './footer';
import HeaderContainer from './header';

const StoreLayoutContainer = () => {
  return (
    <Layout>
      <HeaderContainer />
      <Outlet />
      {/* <Layout.Content>{props.children}</Layout.Content> */}
      <FooterContainer />
    </Layout>
  );
};

export default StoreLayoutContainer;
