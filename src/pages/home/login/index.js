import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgLogin from 'assets/bgLogin.png';
import logo from 'assets/logo-new.png';
import { loginInitiate } from 'redux/action';
import './styles.less';
import axiosClient from 'util/axiosClient';
import { authAction, loginStart, selectRole } from 'redux/features/auth/authSlice';

import { result } from 'lodash';
import request from 'util/request';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  async function handleSubmit(value) {
    const { username, password } = value;
    dispatch(authAction.loginStart({ username, password }));
    setIsLogin(true);
  }
  useEffect(async () => {
    //đang đăng nhập
    //+ bình thường: isLogin=false, role=R02
    //+ đang load: isLogin=true, role=R02, local=null
    //+ load xong fail: isLogin=true, role=R02, local=null báo lỗi
    //+ load xong success: isLogin=true, role=R03, local=R03,navigate

    //đang đăng nhập
    //+ đang load: role=R02
    //+ load xong fail: role=R02
    //+ load xong success: role=R03
    if (isLogin) {
      //Load xong success
      if (currentUser?.role !== 'R02') {
        if (currentUser?.role === 'R03') {
          message.success('Đăng nhập thành công');
          setLoading(true);
          navigate('/dashboard');
          return;
        }

        if (currentUser?.role === 'R04' || currentUser?.role === 'R05') {
          message.success('Đăng nhập thành công');
          setLoading(true);
          navigate('/dashboard');
          return;
        }

        if (currentUser?.role === 'R00') {
          message.success('Đăng nhập thành công');
          setLoading(true);
          navigate('/dashboard');
          return;
        }

        if (currentUser?.role === 'R01') {
          try {
            //Take all cart item of guest to customer
            const cartGuest = await request('/cart/guest', {}, 'GET');
            for (let i = 0; i < cartGuest.items.length; i++) {
              const productId = cartGuest.items[i].product._id;
              const quantity = cartGuest.items[i].quantity;
              //Update lại cart item của customer:
              try {
                await request('/cart', { productId, quantity }, 'POST');
              } catch (error) {
                console.log(error);
              }
            }
          } catch (error) {
            console.log(error.response);
          }
          //Delete session: dù fail hoặc sucess lấy cart item
          await axiosClient.delete('/session');
        }

        message.success('Đăng nhập thành công');
        setTimeout(() => {
          navigate('/');
        }, 3000);

        setIsLogin(false);
      }
    }

    // if (isLogin && role) {
    //   //When login Success
    //   if (role && role !== 'R02') {
    //     if (role === 'R03') {
    //       message.success('Đăng nhập thành công');
    //       setLoading(true);
    //       navigate('/dashboard/product');
    //       return;
    //     }

    //     if (role === 'R01') {
    //       try {
    //         //Take all cart item of guest to customer
    //         const cartGuest = await request('/cart/guest', {}, 'GET');
    //         for (let i = 0; i < cartGuest.items.length; i++) {
    //           const productId = cartGuest.items[i].product._id;
    //           const quantity = cartGuest.items[i].quantity;
    //           //Update lại cart item của customer:
    //           try {
    //             await request('/cart', { productId, quantity }, 'POST');
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         }
    //       } catch (error) {
    //         console.log(error.response);
    //       }
    //       //Delete session: dù fail hoặc sucess lấy cart item
    //       await axiosClient.delete('/session');
    //     }
    //     message.success('Đăng nhập thành công');
    //     setTimeout(() => {
    //       navigate('/');
    //     }, 3000);
    //   } //When login fail
    //   else message.error('Đăng nhập không thành công');
    //   //Set is Login to false
    //   setIsLogin(false);
    // }
  });

  //LOGIN SUCESS
  // .then(async (result) => {
  //   if (localStorage.getItem('__role') === 'R01') {
  //     console.log('ĐANG LẤY ĐỒ CHƠI NÀY');
  //     try {
  //       //Take all cart item of guest to customer
  //       const cartGuest = await axiosClient.get('/cart/guest');
  //       console.log('CART CỦA GUEST NÀY---------------');
  //       console.log(cartGuest);
  //       for (let i = 0; i < cartGuest.items.length; i++) {
  //         const productId = cartGuest.items[i].product._id;
  //         const quantity = cartGuest.items[i].quantity;
  //         console.log(productId, quantity, '------------');

  //         //Update lại cart item của customer:
  //         try {
  //           await axiosClient.post('/cart', { productId, quantity });
  //         } catch (error) {
  //           console.log('LỖI Ở CUSTOMER CART ITEM++++++++++++');
  //           console.log(error);
  //           console.log('++++++++++++++++++++');
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //     //Delete session: dù fail hoặc sucess lấy cart item
  //     await axiosClient.delete('/session');
  //   }
  //   if (localStorage.getItem('__role') === 'R03') {
  //     message.success('Login success');
  //     setLoading(true);
  //     navigate('/dashboard/product');
  //     return;
  //   }

  //   // Move to User homepage
  //   message.success('Đăng nhập thành công');
  //   setLoading(true);
  //   setTimeout(() => {
  //     navigate('/');
  //   }, 3000);
  //   return true;
  // })
  // //LOGIN FAIL
  // .catch((error) => {
  //   console.log(error.message);
  //   message.error('Đăng nhập không thành công');
  // });

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
                src={logo}
                alt="logo"
                className="logo"
                style={{ height: 80 }}
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
              paddingTop: 141,
            }}
          >
            {'Đăng nhập'}
          </h3>
          <Row justify="center">
            <Col
              lg={24}
              md={24}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Form
                name="normal_login"
                className="login-form"
                onFinish={handleSubmit}
                style={{ width: 300 }}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Nhập tài khoản!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Tên đăng nhập "
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Mật khẩu"
                    autoComplete="new-password"
                    allowClear
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: '10px' }}>
                  <a
                    className="login-form-forgot"
                    onClick={() => navigate('/forget-password')}
                  >
                    Quên mật khẩu?
                  </a>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <a
                    style={{ color: 'black', fontWeight: '500' }}
                    onClick={() => navigate('/register')}
                  >
                    Chưa có tài khoản?
                  </a>
                </Form.Item>
              </Form>
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

export default Login;
