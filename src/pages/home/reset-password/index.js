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
import { loginInitiate } from 'redux/action';

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

const ResetPassword = (props) => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(value) {
    console.log(value);
    // await dispatch(loginInitiate(username, password));
    // .then((result) => {
    // 	if (!result?.error) {
    // 		let role = localStorage.getItem("__role");
    // 		if (role === "SystemAdministrator") {
    // 			navigate("/admin");
    // 		} else if (role === "SchoolAdmin") {
    // 			navigate("/dashboard");
    // 		} else if (role === "ClubAdmin") {
    // 			navigate("/club");
    // 		}
    // 	}
    // })
    // .catch((error) => message.error(error));
    message.success('Gửi gmail thành công');
    setLoading(true);
    return true;
  }

  // Listen to the Firebase Auth state and set the local state.

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
                {'Đặt lại mật khẩu'}
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
                      name="password"
                      label="Mật khẩu"
                      rules={[
                        {
                          required: true,
                          message: 'Nhập mật khẩu',
                        },
                        {
                          min: 8,
                          message: 'Mật khẩu phải có ít nhất độ dài là 8',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                      name="confirm"
                      label="Nhập lại mật khẩu"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Nhập lại mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error(
                                'Nhập lại mật khẩu không giống với mật khẩu'
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

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
                    <p style={{ textAlign: 'center' }}>
                      Quay lại<Typography.Link> đăng nhập</Typography.Link>
                    </p>
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

export default ResetPassword;
