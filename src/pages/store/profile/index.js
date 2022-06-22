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
  TreeSelect
} from "antd";
import { Link, Route, Routes } from "react-router-dom";
import logoImg from "assets/logo-new.png";
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
  GoogleOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import StoreLayoutContainer from "layouts/store/store.layout";
// import './styles.less';
const { Option } = Select;
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};
const tailLayout = {
  // wrapperCol: {
  //   offset: 8,
  //   span: 16,
  // },
};

const validateMessages = {
  required: "Nhập ${label}!",
  types: {
    email: "${label} không hợp lệ!",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};

const ProfilePage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      fullName: "Nguyễn Hoàng Anh",
      gender: "male",
      email: "hoanganhgo28062001@gmail.com",
      phoneNumber: "0375627583",
      address: "36/38 Đường Trần Việt Châu",
      note: "Chú cc"
    });
  };

  // useEffect
  useEffect(() => {
    onFill();
  });

  return (
    <StoreLayoutContainer>
      <Col
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px"
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
                        required: true
                      }
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
                        required: "true",
                        type: "email"
                      }
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
                        required: true
                      }
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
                  <Form.Item {...tailLayout}>
                    <Button type="link" htmlType="button" onClick={onFill}>
                      Hủy
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                    <Button style={{ marginLeft: "20px" }} type="ghost">
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={12} offset={2}>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: "true"
                      }
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
                        required: "true"
                      }
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
    </StoreLayoutContainer>
  );
};
export default ProfilePage;
