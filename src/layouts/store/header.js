import {
  AppstoreAddOutlined,
  LogoutOutlined,
  SaveOutlined,
  ShoppingCartOutlined,
  StepForwardOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Input,
  Menu,
  Row,
  Space,
  Layout,
  Affix,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';
import logoImg from 'assets/logo-new.png';
import { useNavigate } from 'react-router-dom';
import axiosClient from 'util/axiosClient';
import { useDispatch } from 'react-redux';
import { logoutInitiate } from 'redux/action';
const { Header } = Layout;

const HeaderContainer = () => {
  //Hook
  const onSearch = (value) => console.log(value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState([]);

  //Effect
  useEffect(() => {
    axiosClient.get('/categories').then((cates) => setCategories(cates));
    // axiosClient
    //   .get('/user/profile')
    //   .then(({ user }) => setUsername(user.fullName));
  }, []);
  useEffect(() => {
    axiosClient
      .get('/user/profile')
      .then(({ user }) => setUsername(user.fullName));
  }, [username]);

  const onLogout = async () => {
    dispatch(logoutInitiate());
    navigate('/login');
  };
  const menuUser = (
    <Menu
      className="header-custom-menu"
      theme="dark"
      style={{ width: 200 }}
      items={[
        {
          icon: <UserOutlined />,
          key: '1',
          label: <a onClick={() => navigate('/profile')}>{username}</a>,
        },
        {
          key: '2',
          label: (
            <a onClick={() => navigate('/order-list')}>Đơn hàng của tôi</a>
          ),
          icon: <SaveOutlined />,
        },
        {
          key: '3',
          label: <a onClick={onLogout}>Thoát tài khoản</a>,
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div>
      <Affix offsetTop={'-20px'}>
        <Header style={{ padding: '0', height: 'auto' }}>
          <Row>
            <Col span={16} offset={4}>
              <Row align="middle" style={{ padding: '3px 0' }}>
                <Col span={2}>
                  <a onClick={() => navigate('/')}>
                    <img
                      style={{ height: '48px' }}
                      src={logoImg}
                      alt="logo image"
                    />
                  </a>
                </Col>
                <Col className="header_categories header-item" span={1}>
                  <Dropdown
                    overlay={
                      <Menu
                        className="header-custom-menu"
                        theme="dark"
                        style={{ width: 200 }}
                      >
                        {categories.map((cate) => (
                          <Menu.Item>
                            <a
                              onClick={() =>
                                navigate(`/product-list/${cate._id}`)
                              }
                            >
                              {cate.name}
                            </a>
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    placement="bottomLeft"
                  >
                    <AppstoreAddOutlined
                      style={{ color: 'white', fontSize: '40px' }}
                    />
                  </Dropdown>
                </Col>
                <Col
                  className="header_search_form header-item"
                  span={10}
                  offset={2}
                >
                  <Input.Search
                    style={{ widows: '80%' }}
                    size="large"
                    placeholder="Tìm tên sản phẩm"
                    onSearch={onSearch}
                    enterButton
                  />
                </Col>
                <Col
                  className="header-item"
                  span={5}
                  offset={4}
                  style={{ display: 'flex', justifyContent: 'right' }}
                >
                  <div
                    className="header_cart header-item"
                    style={{ marginRight: '20px', marginTop: '10px' }}
                  >
                    <Badge
                      className="custom-badge"
                      color="cyan"
                      //Add count for badge
                      // count={5}
                      size="small"
                    >
                      <ShoppingCartOutlined
                        onClick={() => navigate('/cart')}
                        style={{ color: 'white', fontSize: '32px' }}
                      />
                    </Badge>
                  </div>
                  <Dropdown overlay={menuUser}>
                    <a onClick={() => navigate(`/profile`)}>
                      <Space>
                        {username}
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      </Space>
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
      </Affix>
    </div>
  );
};

export default HeaderContainer;
