import {
  Button,
  Col,
  Row,
  Select,
  Avatar,
  DatePicker,
  Form,
  Input,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  HomeOutlined,
  UserOutlined,
  GoogleOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getUserInformation, updateUserInformation } from './service';
// import './styles.less';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  // wrapperCol: {
  //   offset: 8,
  //   span: 16,
  // },
};

const validateMessages = {
  required: 'Nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ProfilePage = () => {
  const [form] = Form.useForm();

  // State
  const naviage = useNavigate();
  const [profile, setProfile] = useState({});

  // useEffect
  const onFinish = async (values) => {
    try {
      const { email, ...userUpdate } = values;
      const user = await updateUserInformation(userUpdate);
      message.success('Cập nhật thành công');
      console.log(user);
    } catch (error) {
      message.error(error.response.data.error);
    }
  };

  useEffect(() => {
    getUserInformation()
      .then((result) => {
        const { address, email, fullName, gender, phone } = result.user;
        const user = { address, email, fullName, gender, phone };
        form.setFieldsValue({ ...user });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <Col
        style={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px',
          marginTop: '100px',
        }}
        span={16}
        offset={4}
      >
        <h3>Thông tin chung</h3>
        <Row>
          <Col span={4} offset={2}>
            <Avatar size={100} icon={<UserOutlined />} />
          </Col>
          <Col span={16}>
            <Form
              size="middle"
              {...layout}
              form={form}
              name="control-hooks"
              validateMessages={validateMessages}
              onFinish={onFinish}
            >
              <Row>
                <Col span={10}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Họ và tên"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: 'true',
                        type: 'email',
                      },
                    ]}
                  >
                    <Input
                      disabled
                      prefix={
                        <GoogleOutlined className="site-form-item-icon" />
                      }
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      allowClear
                    >
                      <Option value="M">male</Option>
                      <Option value="F">female</Option>
                      <Option value="D">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                    <Button
                      onClick={() => naviage('/change-password')}
                      style={{ marginLeft: '20px' }}
                      type="ghost"
                    >
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={12} offset={2}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: 'true',
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
                    label="Địa chỉ"
                    rules={[
                      {
                        required: 'true',
                      },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined className="site-form-item-icon" />}
                      placeholder="Địa chỉ"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    </>
  );
};
export default ProfilePage;
