import {
  AppstoreAddOutlined,
  DownOutlined,
  LeftOutlined,
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
  message,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './styles.less';
import logoImg from 'assets/logo-new.png';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from 'util/axiosClient';
import { useDispatch } from 'react-redux';
import { logoutInitiate } from 'redux/action';
import request from 'util/request';
import { authAction, logoutStart } from 'redux/features/auth/authSlice';
import { uuidv4 } from 'util/file';
const { Header } = Layout;

const HeaderContainer = () => {
  //Hook

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [username, setUsername] = useState([]);
  const [avatar, setAvartar] = useState();
  const [menuItemProduct, setMenuItemProduct] = useState([]);
  const searchTimeOut = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false); //Effect
  useEffect(() => {
    request('/categories', {}, 'GET').then((cates) => setCategories(cates));
  }, []);

  useEffect(() => {
    request('/user/profile', {}, 'GET').then(({ user }) => {
      setUsername(user?.fullName);
      if (user?.avatar) {
        setAvartar({ ...user?.avatar });
      }
    });
  }, [username]);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  const handleSearch = async (data) => {
    try {
      const lstProduct = await request(
        '/products/search',
        {
          searchText: data,
        },
        'POST'
      );
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
    } catch (error) {
      message.error(error.message);
    }
  };

  const onSearch = async (value) => {
    const searchedValue = value.target.value;

    if (searchTimeOut.current) {
      clearTimeout(searchTimeOut.current);
    }

    searchTimeOut.current = setTimeout(() => {
      setSearchValue(searchedValue);
    }, 300);
  };

  const onLogout = async () => {
    dispatch(authAction.logout());
    navigate('/login');
  };

  const menuGuest = (
    <Menu
      className="header-custom-menu"
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
      style={{ width: 200 }}
      items={[
        {
          icon: <UserOutlined />,
          key: '1',
          label: (
            <a style={{ color: 'black' }} onClick={() => navigate('/profile')}>
              {username}
            </a>
          ),
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

  const categoriesMenu = categories.map((item) => ({
    key: item?.name,
    label: <Link to={`/product-list/${item?._id}`}>{item?.name}</Link>,
  }));

  return (
    <div>
      <Affix offsetTop={'-20px'}>
        <Header
          style={{ padding: '0', height: 'auto', backgroundColor: '#fff' }}
        >
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
                        // theme="light"
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
                      style={{ color: 'black', fontSize: '32px' }}
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
                      menuItemProduct?.length > 0 ? (
                        <Menu
                          // onClick={handleMenuClick}
                          items={menuItemProduct}
                        />
                      ) : (
                        <div></div>
                      )
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
                  span={7}
                  offset={2}
                  style={{ display: 'flex', justifyContent: 'right' }}
                >
                  <Typography.Link
                    onClick={() => navigate('/blog')}
                    style={{
                      fontSize: '26px',
                      fontWeight: '600',
                      marginRight: '16px',
                    }}
                  >
                    Blog
                  </Typography.Link>
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
                        style={{ color: 'black', fontSize: '32px' }}
                      />
                    </Badge>
                  </div>
                  <Dropdown
                    overlay={
                      localStorage.getItem('__role') === 'R01'
                        ? menuUser
                        : menuGuest
                    }
                  >
                    <div>
                      <span
                        style={{
                          color: '#8c8c8c',
                          marginRight: '12px',
                          fontSize: '18px',
                        }}
                      >
                        {username}
                      </span>
                      <Avatar
                        src={
                          avatar
                            ? avatar?.img
                            : 'https://joeschmoe.io/api/v1/random'
                        }
                      />
                    </div>
                  </Dropdown>
                  {/* <Button type="link" onClick={() => navigate('/blog')}>
                    Blog
                  </Button> */}
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Row>
            <Col span={16} offset={4}>
              <Row>
                <Col>
                  <Dropdown overlay={<Menu items={categoriesMenu}></Menu>} trigger={['click']}>
                    <Button onClick={() => setOpen(!open)} style={{ width: '300px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        Categories
                        {open ? <LeftOutlined rotate={-90} style={{ fontSize: '10px' }} /> : <LeftOutlined rotate={0} style={{ fontSize: '10px' }} />}

                      </div>
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row> */}
        </Header>
      </Affix>
    </div>
  );
};

export default HeaderContainer;
