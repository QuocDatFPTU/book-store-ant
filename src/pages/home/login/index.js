import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgLogin from 'assets/bgLogin.png';
import logo from 'assets/logo-new.png';
import { loginInitiate } from 'redux/action';
import './styles.less';

// if (!result?.error) {
// 	let role = localStorage.getItem("__role");
// 	if (role === "SystemAdministrator") {
// 		navigate("/admin");
// 	} else if (role === "SchoolAdmin") {
// 		navigate("/dashboard");
// 	} else if (role === "ClubAdmin") {
// 		navigate("/club");
// 	}
// }

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(value) {
    const { username, password } = value;
    await dispatch(loginInitiate(username, password))
      .then((result) => {
        // Move to User homepage
        message.success('Đăng nhập thành công');
        setLoading(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
        return true;
      })
      .catch((error) => {
        console.log(error.message);
        message.error('Đăng nhập không thành công');
      });
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
            <img
              src={logo}
              alt="logo"
              className="logo"
              style={{ height: 80 }}
            />
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
                <Form.Item>
                  <a className="login-form-forgot" href="">
                    Quên mật khẩu
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
