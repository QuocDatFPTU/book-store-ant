import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgLogin from 'assets/bgLogin.png';
import logo from 'assets/logo-new.png';
import { loginInitiate } from 'redux/action';
import './styles.less';
import axiosClient from 'util/axiosClient';
import { async } from '@firebase/util';

const validateMessages = {
  required: 'Nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    // number: '${label} is not a valid number!',
  },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
};

//CHECK DATABASE CÓ EMAIL NHƯ VẬY KHÔNG VÀ GỬI GMAIL

const ForgetPassword = (props) => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const checkEmailExist = async (email) => {
    console.log(email);
    try {
      await axiosClient.post('/user/forgotten', { email });
      message.success('Gửi gmail thành công');
    } catch (error) {
      message.error('Email không tồn tại!');
    }
  };
  async function handleSubmit(value) {
    setLoading(true);
    checkEmailExist(value.email);
    setLoading(false);
    // console.log(value);
    return true;
  }

  return (
    <div className="login-page">
      <Row
        justify="space-between"
        style={{ height: '100vh', backgroundColor: '#fafafa' }}
      >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <div className="login-logo">
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ height: 80 }}
            />
          </div>
          <Row style={{ paddingTop: '130px' }}>
            <Col
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
              }}
              span={8}
              offset={8}
            >
              <h3
                className="logo-title"
                style={{
                  marginBottom: 20,
                  textAlign: 'center',
                  fontSize: '2rem',
                }}
              >
                {'Quên mật khẩu'}
              </h3>
              <Row justify="center">
                <Col
                  lg={24}
                  md={24}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Form
                    layout="vertical"
                    name="normal_login"
                    className="login-form"
                    onFinish={handleSubmit}
                    style={{ width: 300 }}
                    validateMessages={validateMessages}
                  >
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: 'true',
                        },
                        {
                          type: 'email',
                        },
                      ]}
                    >
                      <Input placeholder="Nhập Email liên kết" />
                    </Form.Item>
                    <div style={{ color: '#bfbfbf', marginBottom: '10px' }}>
                      <span style={{ color: 'red' }}>(*) </span>
                      <span style={{ fontWeight: 'bold' }}>Quên mật khẩu?</span>
                      Chúng tôi sẽ gửi đến địa chỉ email một link liên kết giúp
                      bạn đặt lại mật khẩu.
                    </div>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loading}
                      >
                        Lấy lại mật khẩu
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          style={{
            backgroundImage: `url(${bgLogin})`,
            width: '100%',
            backgroundSize: 'cover',
            overflow: 'hidden',
            padding: 5,
            borderRadius: 20,
          }}
        ></Col>
      </Row>
    </div>
  );
};

export default ForgetPassword;
