import {
  AppstoreAddOutlined,
  DownOutlined,
  LoginOutlined,
  LogoutOutlined,
  RedditOutlined,
  SaveOutlined,
  ShoppingCartOutlined,
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
  Button,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';
import logoImg from 'assets/logo-new.png';
import { useNavigate } from 'react-router-dom';
import axiosClient from 'util/axiosClient';
import { useDispatch } from 'react-redux';
import { logoutInitiate } from 'redux/action';
import request from 'util/request';
import { authAction, logoutStart } from 'redux/features/auth/authSlice';
const { Header } = Layout;

const HeaderContainer = () => {
  //Hook

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState([]);
  const [menuItemProduct, setMenuItemProduct] = useState([]);

  //Effect
  useEffect(() => {
    request('/categories', {}, 'GET').then((cates) => setCategories(cates));
    // axiosClient
    //   .get('/user/profile')
    //   .then(({ user }) => setUsername(user.fullName));
  }, []);
  useEffect(() => {
    request('/user/profile', {}, 'GET').then(({ user }) =>
      setUsername(user?.fullName)
    );
  }, [username]);

  const onSearch = async (value) => {
    console.log(value.target.value);
    try {
      const lstProduct = await request(
        '/products/search',
        {
          searchText: value.target.value,
        },
        'POST'
      );
      console.log(lstProduct);
      let index = 0;
      let list = [];
      lstProduct.forEach((item) => {
        index++;
        list.push({
          onClick: () => navigate(`/product-detail/${item._id}`),
          label: item.title,
          key: index,
          icon: <img style={{ width: '50px' }} src={item.thumbnail} />,
        });
      });
      setMenuItemProduct(list);
      console.log(list);
    } catch (error) {
      console.log(error);
    }
  };
  const onLogout = async () => {
    dispatch(authAction.logout());
    navigate('/login');
  };
  const menuGuest = (
    <Menu
      className="header-custom-menu"
      theme="dark"
      style={{ width: 140 }}
      items={[
        {
          icon: <LoginOutlined />,
          key: '4',
          label: <a onClick={() => navigate('/login')}>Đăng nhập</a>,
        },
        {
          key: '5',
          label: <a onClick={() => navigate('/register')}>Đăng ký</a>,
          icon: <RedditOutlined />,
        },
      ]}
    />
  );
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
                  <Dropdown
                    overlay={
                      <Menu
                        // onClick={handleMenuClick}
                        items={menuItemProduct}
                      />
                    }
                    placement="bottom"
                  >
                    <Input.Search
                      style={{ widows: '80%' }}
                      size="large"
                      placeholder="Tìm tên sản phẩm"
                      // onSearch={onSearch}
                      onChange={onSearch}
                      enterButton
                    />
                  </Dropdown>
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
                  <Dropdown
                    overlay={
                      localStorage.getItem('__role') === 'R02' ||
                        !localStorage.getItem('__role')
                        ? menuGuest
                        : menuUser
                    }
                  >
                    <Space>
                      <Typography.Text
                        style={{ color: 'white' }}
                        ellipsis={{
                          rows: 1,
                          // expandable: true,
                        }}
                      >
                        {username}
                      </Typography.Text>
                      <Avatar src="https://joeschmoe.io/api/v1/random" />
                    </Space>
                  </Dropdown>
                  <Button type="link" onClick={() => navigate('/blog')}>
                    Blog
                  </Button>
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
