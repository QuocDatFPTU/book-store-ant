import {
  AppstoreAddOutlined,
  LogoutOutlined,
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
} from 'antd';
import React from 'react';
import './styles.less';
import logoImg from 'assets/logo-new.png';
import paymentImg from 'assets/footer-payment.png';
import socialtImg from 'assets/footer-social.png';
import appImg from 'assets/footer-app.png';
import WrapperConentContainer from './wrapper.content';
const { Header } = Layout;

const menu = (
  <Menu
    className="header-custom-menu"
    theme="dark"
    style={{ width: 200 }}
    items={[
      {
        key: '1',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Văn học
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Ngoại ngữ
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Anime
          </a>
        ),
      },
      {
        key: '4',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Manga
          </a>
        ),
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
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Nguyễn Hoàng Anh
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Đơn hàng của tôi
          </a>
        ),
        icon: <SaveOutlined />,
      },
      {
        key: '3',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Thoát tài khoản
          </a>
        ),
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const HeaderContainer = () => {
  const onSearch = (value) => console.log(value);

  return (
    <div>
      <Affix offsetTop={'-20px'}>
        <Header style={{ padding: '0', height: 'auto' }}>
          <Row>
            <Col span={16} offset={4}>
              <Row align="middle" style={{ padding: '3px 0' }}>
                <Col span={2}>
                  <img
                    style={{ height: '48px' }}
                    src={logoImg}
                    alt="logo image"
                  />
                </Col>
                <Col
                  className="header_categories header-item"
                  span={1}
                  style={{}}
                >
                  <Dropdown overlay={menu} placement="bottomLeft">
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
                  // style={{ paddingTop: '10px' }}
                  className="header_cart header-item"
                  span={1}
                  offset={4}
                >
                  <Badge
                    className="custom-badge"
                    color="cyan"
                    count={5}
                    size="small"
                  >
                    <ShoppingCartOutlined
                      style={{ color: 'white', fontSize: '32px' }}
                    />
                  </Badge>
                </Col>
                <Col className="header-item" span={4}>
                  <Dropdown overlay={menuUser}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        Nguyễn Hoàng Anh
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
