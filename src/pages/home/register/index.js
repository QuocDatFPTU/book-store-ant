import React, { useEffect, useState } from 'react';
import {
  GoogleOutlined,
  HomeOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgLogin from 'assets/bgLogin.png';
import logo from 'assets/logo-new.png';
import { loginInitiate, registerInitiate } from 'redux/action';
import logo1 from 'assets/logo_1.png';
import './styles.less';
import axiosClient from 'util/axiosClient';

// SHOW MESSAGE ANNOUNCE: VERIFY EMAIL
const validateMessages = {
  //   required: 'Nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    // number: '${label} is not a valid number!',
  },
  //   number: {
  //     range: '${label} must be between ${min} and ${max}',
  //   },
};

const Register = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [registerUser, setRegisterUser] = useState();

  async function handleSubmit(value) {
    // setLoading(true);
    localStorage.removeItem('__email');
    await dispatch(registerInitiate(value))
      //REGISTER SUCESS
      .then(async (result) => {
        console.log(result);
        setIsSendingEmail(true);
        // if (localStorage.getItem('__role') === 'R01') {
        //   console.log('ĐANG LẤY ĐỒ CHƠI NÀY');
        //   try {
        //     //Take all cart item of guest to customer
        //     const cartGuest = await axiosClient.get('/cart/guest');
        //     console.log('CART CỦA GUEST NÀY---------------');
        //     console.log(cartGuest);
        //     for (let i = 0; i < cartGuest.items.length; i++) {
        //       const productId = cartGuest.items[i].product._id;
        //       const quantity = cartGuest.items[i].quantity;
        //       console.log(productId, quantity, '------------');

        //       //Update lại cart item của customer:
        //       try {
        //         await axiosClient.post('/cart', { productId, quantity });
        //       } catch (error) {
        //         console.log('LỖI Ở CUSTOMER CART ITEM++++++++++++');
        //         console.log(error);
        //         console.log('++++++++++++++++++++');
        //       }
        //     }
        //   } catch (error) {
        //     console.log(error.response);
        //   }
        //   //Delete session: dù fail hoặc sucess lấy cart item
        //   await axiosClient.delete('/session');
        // }

        // Move to User homepage

        message.success('Đăng ký thành công');
        return true;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        setLoading(false);
        message.error(error.message);
      });
    return true;
  }

  async function handleSendEmailAgain() {
    const email = localStorage.getItem('__email');
    try {
      await axiosClient.post('/user/resend-email-verify', { email });
      message.success('Gửi email thành công');
    } catch (error) {
      message.error(error?.response?.data?.error);
    }
  }
  // Listen to the Firebase Auth state and set the local state.
  return (
    <div className="login-page">
      <Row justify="space-between" style={{ height: window.innerHeight }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 12 }}
        >
          <div className="login-logo">
            <a onClick={() => navigate('/')}>
              <img
                src={logo1}
                alt="logo"
                className="logo"
                style={{ height: 130, width: 276, objectFit: 'cover', marginTop: '10px' }}
              />
            </a>
          </div>
          <h3
            className="logo-title"
            style={{
              marginTop: 20,
              marginBottom: 20,
              textAlign: 'center',
              fontSize: '2rem',
              paddingTop: 90,
            }}
          >
            {'Đăng ký'}
          </h3>
          <Row justify="center">
            <Col
              lg={24}
              md={24}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              {!isSendingEmail && (
                <Form
                  layout="horizontal"
                  name="normal_login"
                  className="login-form"
                  onFinish={handleSubmit}
                  style={{ width: 300 }}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: 'Nhập họ và tên!' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Họ và tên"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: 'true',
                        message: 'Nhập Email!',
                      },
                      {
                        type: 'email',
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <GoogleOutlined className="site-form-item-icon" />
                      }
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: 'true',
                        message: 'Nhập số điện thoại!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: 'true',
                        message: 'Nhập địa chỉ!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined className="site-form-item-icon" />}
                      placeholder="Địa chỉ"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Nhập mật khẩu!' },
                      {
                        min: 8,
                        message: 'Mật khẩu phải có ít nhất độ dài là 8',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Mật khẩu"
                      autoComplete="new-password"
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Chọn giới tính',
                      },
                    ]}
                  >
                    <Select placeholder="Giới tính" allowClear>
                      <Select.Option value="M">male</Select.Option>
                      <Select.Option value="F">female</Select.Option>
                      <Select.Option value="D">other</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      loading={loading}
                    >
                      Đăng ký
                    </Button>
                  </Form.Item>
                  <p style={{ textAlign: 'center' }}>
                    Quay lại <span> </span>
                    <Typography.Link onClick={() => navigate('/login')}>
                      đăng nhập
                    </Typography.Link>
                  </p>
                </Form>
              )}
              {isSendingEmail && (
                <Row>
                  <Col
                    style={{
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '10px',
                      boxShadow:
                        'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
                    }}
                    span={10}
                    offset={7}
                  >
                    <Row justify="center">
                      <Col
                        lg={24}
                        md={24}
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <div style={{ color: '#bfbfbf', marginBottom: '10px' }}>
                          <span style={{ color: 'red' }}>(*) </span>
                          <span style={{ fontWeight: 'bold' }}>Xác nhận? </span>
                          Chúng tôi đã gửi đến địa chỉ email một link liên kết
                          giúp bạn xác nhận tài khoản.
                          <div>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                              loading={loading}
                              style={{ marginTop: '10px' }}
                              onClick={handleSendEmailAgain}
                            >
                              Gửi lại Email
                            </Button>
                            <div
                              style={{
                                textAlign: 'center',
                                fontSize: '14px',
                                marginTop: '8px',
                                width: '100%',
                              }}
                            >
                              <Typography.Link
                                style={{
                                  textAlign: 'center',
                                  fontSize: '14px',
                                  margin: '0',
                                }}
                              >
                                Không nhận được email?
                              </Typography.Link>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )}
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

export default Register;
