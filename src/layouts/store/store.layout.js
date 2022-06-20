import { Layout } from 'antd';
import React from 'react';
import FooterContainer from './footer';
import HeaderContainer from './header';

const StoreLayoutContainer = (props) => {
  return (
    <Layout>
      <HeaderContainer />
      <Layout.Content>{props.children}</Layout.Content>
      <FooterContainer />
    </Layout>
  );
};

export default StoreLayoutContainer;
