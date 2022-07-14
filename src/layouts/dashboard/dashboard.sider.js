import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Icon, { PieChartOutlined } from '@ant-design/icons';
import logo from 'assets/logo-new.png';
import './styles.less';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CustomerIconSvg,
  OrderIconSvg,
  PostIconSvg,
} from 'components/icon-svg';
const { Sider } = Layout;
const { SubMenu } = Menu;

const DashboardSider = () => {
  const [collapse, setCollapse] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  return (
    <Sider
      className="sider"
      collapsible
      style={{ minHeight: '100vh' }}
      onCollapse={() => setCollapse(!collapse)}
      theme="light"
    >
      {collapse === true ? (
        <div className="logo-wrapper">
          <img
            src={logo}
            alt="logo"
            style={{ height: 60 }}
            className="logo"
            onClick={() => navigate('/dashboard')}
          />
        </div>
      ) : (
        <div className="logo-wrapper">
          <img
            src={logo}
            alt="logo"
            style={{ width: 80, height: 60 }}
            className="logoCollapse"
          />
        </div>
      )}
      <Menu theme="light" mode="inline" className="menu-list">
        <>
          {role === 'R03' && (
            <>
              <Menu.Item
                key="1"
                icon={<PieChartOutlined />}
                onClick={() => navigate('/dashboard/product')}
              >
                Sản phẩm
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => navigate('/dashboard/customer')}
              >
                Customer
              </Menu.Item>{' '}
              <Menu.Item
                key="4"
                // icon={<PostIconSvg />}
                onClick={() => navigate('/dashboard/post')}
              >
                Post
              </Menu.Item>
              <Menu.Item
                key="5"
                // icon={<PostIconSvg />}
                onClick={() => navigate('/dashboard/slider')}
              >
                Slider
              </Menu.Item>
            </>
          )}
          {role === 'R04' && (
            <>
              {' '}
              <Menu.Item
                key="3"
                // icon={<OrderIconSvg />}
                onClick={() => navigate('/dashboard/order')}
              >
                Order
              </Menu.Item>
            </>
          )}
          {role === 'R00' && (
            <>
              <Menu.Item
                key="6"
                // icon={<PostIconSvg />}
                onClick={() => navigate('/dashboard/user')}
              >
                User
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    </Sider>
  );
};

export default DashboardSider;
