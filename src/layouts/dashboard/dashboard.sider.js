import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import logo from 'assets/logo-new.png';
import './styles.less';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;

const DashboardSider = () => {
  const [collapse, setCollapse] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <Menu.Item
          key="1"
          icon={<PieChartOutlined />}
          onClick={() => navigate('/dashboard/clubs')}
        >
          Club
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<PieChartOutlined />}
          onClick={() => navigate('/dashboard/departments')}
        >
          Department
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<PieChartOutlined />}
          onClick={() => navigate('/dashboard/account')}
        >
          Account
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default DashboardSider;
