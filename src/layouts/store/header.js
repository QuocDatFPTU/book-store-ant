import { AppstoreAddOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Affix, Badge, Col, Dropdown, Input, Row, Space } from 'antd';
import React from 'react';
import WrapperConentContainer from './wrapper.content';

const HeaderContainer = () => {
  return (
    <Affix offsetTop={0}>
      <Header style={{ padding: '0', height: 'auto' }}>
        <WrapperConentContainer>
          <Row align="middle" style={{ padding: '3px 0' }}>
            <Col span={2}>
              <img style={{ height: '48px' }} src={logoImg} alt="logo image" />
            </Col>
            <Col className="header_categories header-item" span={1} style={{}}>
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
        </WrapperConentContainer>
      </Header>
    </Affix>
  );
};

export default HeaderContainer;
