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
  QuestionOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './styles.less';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
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

  //data
  const orderData = [
    {
      _id: '123',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
      title:
        'Miền đất hứa sẽ đưa chúng ta đến khoái lạc ta đến khoái lta đến khoái lta đến khoái lta đến khoái l',
      salePrice: '26.000.200đ',
      publisher: 'NXB Trẻ',
      quantity: 2,
      totalAmount: '40.400đ',
    },
    {
      _id: '124',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/d/r/dragon-ball-full-color---phan-bon---frieza-dai-de-_-tap-2_1.jpg',
      title:
        'Dragon Ball Full Color - Phần Bốn: Frieza Đại Đế - Tập 2 - Tặng Kèm Ngẫu Nhiên 1 Trong 2 Mẫu Postcard',
      salePrice: '77.000 đ',
      publisher: 'NXB Trẻ',
      quantity: 1,
      totalAmount: '77.400đ',
    },
    {
      _id: '125',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/b/i/bia-sieu-nhi-hoi-nha-khoa-hoc-tra-loi---b_a-full_2.jpg',
      title: 'Siêu Nhí Hỏi Nhà Khoa Học Trả Lời',
      salePrice: '162.000 đ',
      publisher: 'NXB Dân Trí',
      quantity: 2,
      totalAmount: '324.000đ',
    },
  ];

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer>
        <div className="contact-infor">
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
        </div>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row style={{ backgroundColor: 'white', padding: '10px' }}>
          <Col span={24}>
            <Row>
              <Col span={24}></Col>
              <h2
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '22px',
                }}
              >
                <QuestionOutlined
                  style={{
                    fontSize: '28px',
                    marginRight: '5px',
                    color: 'red',
                  }}
                />
                Kiểm tra lại đơn hàng
              </h2>
            </Row>
            <Divider style={{ margin: '18px 0' }} />
            {orderData.map((item) => (
              <div className="cart-value">
                <Row
                  className="cart-form"
                  style={{ width: '100%' }}
                  align="middle"
                >
                  <Col span={2} className="cart-detail-container">
                    <img className="cart-img" src={item.imgLink} />
                  </Col>
                  <Col span={10}>
                    <Typography.Text ellipsis={true} className="cart-title">
                      {item.title}
                    </Typography.Text>
                    <p className="cart-pushlisher">{item.publisher}</p>
                    <p className="cart-price">{item.salePrice}</p>
                  </Col>
                  <Col
                    style={{ textAlign: 'center', fontSize: '27px' }}
                    span={4}
                    offset={1}
                  >
                    {item.quantity}
                  </Col>
                  <Col
                    className="cart-productitem-saleprice"
                    style={{ textAlign: 'center' }}
                    span={4}
                    offset={1}
                  >
                    {item.salePrice}
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <Col span={8} offset={16}>
            <div className="cart-money">
              <div class="cart-cost">
                <p>Thành tiền</p>
                <p class="total-price">468.800 đ</p>
              </div>
            </div>
          </Col>
          <Divider style={{ margin: '5px 0 5px 0' }} />
          <Col span={8}>
            <Button type="link" size="large">
              <ArrowLeftOutlined />
              Trở về giỏ hàng
            </Button>
          </Col>
          <Col span={8} offset={8}>
            <div class="cart-money">
              <button>
                <a href="">Xác nhận thanh toán</a>
              </button>
            </div>
          </Col>
        </Row>
      </WrapperConentContainer>
    </StoreLayoutContainer>
  );
};

export default CartContact;
