import {
  Comment,
  Affix,
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Divider,
  Image,
  Layout,
  Menu,
  Rate,
  Row,
  Typography,
  Breadcrumb,
  Select,
  Pagination,
  Descriptions,
  InputNumber,
  Tooltip,
  Avatar,
  List,
  Cascader,
  DatePicker,
  Form,
  Input,
  Radio,
  Switch,
  TreeSelect,
} from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import logoImg from 'assets/logo-new.png';
import {
  AntDesignOutlined,
  FireOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  PlusOutlined,
  MinusOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
  BookOutlined,
  CommentOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './styles.less';
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
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

const CartContact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      fullName: 'Nguyễn Hoàng Anh',
      gender: 'male',
      email: 'hoanganhgo28062001@gmail.com',
      phoneNumber: '0375627583',
      address: '36/38 Đường Trần Việt Châu',
      note: 'Chú cc',
    });
  };

  // useEffect
  useEffect(() => {
    onFill();
  });

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={logoImg} alt="logo image" />
        </div>
        <div className="header_search__form"></div>
      </Header>
      <Content>
        <Row className="container">
          <Col className="contact-infor" span={16} offset={4}>
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '22px',
              }}
            >
              <InfoCircleOutlined
                style={{
                  fontSize: '28px',
                  marginRight: '5px',
                  color: 'red',
                }}
              />
              Thông tin nhận hàng
            </h2>
            <Divider style={{ margin: '18px 0' }} />
            <Row className="form-contact-container" justify="space-evenly">
              <Col span={14}>
                <Form
                  size="middle"
                  {...layout}
                  form={form}
                  name="control-hooks"
                  validateMessages={validateMessages}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
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
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
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
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: 'true',
                      },
                    ]}
                  >
                    <Input />
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
                    <Input />
                  </Form.Item>
                  <Form.Item name="note" label="Ghi chú">
                    <Input />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                      Fill form
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CartContact;
