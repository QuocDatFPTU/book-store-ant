import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Icon, {
  ApartmentOutlined,
  CopyOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  SlidersOutlined,
  StarOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons';
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
  const { currentUser } = useSelector((state) => state.auth);
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
      <Menu theme="light" mode="inline" className="menu-list" defaultSelectedKeys={['0']}>
        <>
          <Menu.Item
            key="0"
            icon={<DashboardOutlined />}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Menu.Item>
          {localStorage.getItem('__role') === 'R03' && (
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
                icon={<ApartmentOutlined />}
                onClick={() => navigate('/dashboard/customer')}
              >
                Customer
              </Menu.Item>
              <Menu.Item
                key="4"
                icon={<CopyOutlined />}
                onClick={() => navigate('/dashboard/post')}
              >
                Post
              </Menu.Item>
              <Menu.Item
                key="5"
                icon={<SlidersOutlined />}
                onClick={() => navigate('/dashboard/slider')}
              >
                Slider
              </Menu.Item>
              <Menu.Item
                key="9"
                icon={<StarOutlined />}
                onClick={() => navigate('/dashboard/feedback')}
              >
                Feedback
              </Menu.Item>
            </>
          )}
          {(localStorage.getItem('__role') === 'R04' ||
            localStorage.getItem('__role') === 'R05') && (
              <Menu.Item
                key="3"
                icon={<OrderedListOutlined />}
                onClick={() => navigate('/dashboard/order')}
              >
                Order
              </Menu.Item>
            )}
          {localStorage.getItem('__role') === 'R00' && (
            <Menu.Item
              key="6"
              icon={<UsergroupDeleteOutlined />}
              // icon={<PostIconSvg />}
              onClick={() => navigate('/dashboard/user')}
            >
              User
            </Menu.Item>
          )}
        </>
      </Menu>
    </Sider>
  );
};

export default DashboardSider;
