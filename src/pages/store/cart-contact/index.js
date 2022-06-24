import {
  Button,
  Col,
  Divider,
  Row,
  Typography,
  Select,
  Form,
  Input,
  message,
} from 'antd';

import {
  InfoCircleOutlined,
  QuestionOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './styles.less';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { useNavigate } from 'react-router-dom';
import {
  createOrder,
  getCartItemList,
  getReceiverInfor,
  setReceiverInforSession,
} from './service';
const { Option } = Select;

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
    offset: 6,
    span: 18,
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

// data
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

const CartContact = () => {
  //State
  const [updated, setUpdated] = useState(true);
  const [receiver, setReceiver] = useState({});
  const [inforDefault, setInforDefault] = useState({});
  const [cart, setCart] = useState({});

  //Hook
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //Method
  // const onUpdate = () => {
  //   setUpdated(!updated);
  // };
  // const onChange = (values, allValues) => {
  //   console.log(allValues);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };

  const onFinish = (values) => {
    if (updated) {
      setUpdated(false);
    } else {
      //set session receiver information:
      setReceiverInforSession(values)
        .then((result) => {
          //Set state and form
          form.setFieldsValue(values);
          setUpdated(true);
          setReceiver(values);
        })
        .catch((error) => {
          message.error(`${error.response.data.error}`);
        });
    }
  };
  const onReset = () => form.setFieldsValue(inforDefault);
  const onClickConfirm = async () => {
    try {
      const order = await createOrder();
      console.log(order);
    } catch (error) {
      message.error(error.response.data.error);
    }
  };

  // useEffect
  useEffect(() => {
    // onFill();
    getReceiverInfor()
      .then((result) => {
        //Set state for receiver information
        setReceiver(result);
        setInforDefault(result);
        form.setFieldsValue(result);

        //Set state for cart item
        getCartItemList()
          .then((result) => {
            setCart(result);
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(receiver);
  console.log(inforDefault);
  console.log(cart);
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
                // onValuesChange={onChange}
                size="middle"
                {...layout}
                form={form}
                name="control-hooks"
                validateMessages={validateMessages}
                onFinish={onFinish}
              >
                <Form.Item
                  // hidden={true}
                  name="fullName"
                  label="Họ và tên"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input disabled={updated} />
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
                    disabled={updated}
                  >
                    <Option value="M">male</Option>
                    <Option value="F">female</Option>
                    <Option value="D">other</Option>
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
                  <Input disabled={updated} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    {
                      required: 'true',
                    },
                  ]}
                >
                  <Input disabled={updated} />
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
                  <Input disabled={updated} />
                </Form.Item>
                <Form.Item name="note" label="Ghi chú">
                  <Input disabled={updated} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    {updated ? 'Cập nhật' : 'Lưu lại'}
                  </Button>
                  <Button
                    type="link"
                    disabled={updated}
                    htmlType="button"
                    onClick={onReset}
                  >
                    Đặt lại
                  </Button>
                </Form.Item>
                {/* <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button> */}
                {/* <Button onClick={onUpdate}>Cập nhật</Button> */}
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
            {cart.items?.map((item) => (
              <div className="cart-value">
                <Row
                  className="cart-form"
                  style={{ width: '100%' }}
                  align="middle"
                >
                  <Col span={2} className="cart-detail-container">
                    <img className="cart-img" src={item.product.thumbnail} />
                  </Col>
                  <Col span={10}>
                    <Typography.Text ellipsis={true} className="cart-title">
                      {item.title}
                    </Typography.Text>
                    <p className="cart-pushlisher">
                      {item.product.briefInformation.publisher}
                    </p>
                    <p className="cart-price">{item.amount}</p>
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
                    {item.totalAmount}
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
              <div className="cart-cost">
                <p>Tổng tiền</p>
                <p
                  className="total-price"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                >
                  {cart.totalCost} đ
                </p>
              </div>
              <div className="cart-cost">
                <p>Tiền ship</p>
                <p
                  className="total-price"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                >
                  {0} đ
                </p>
              </div>
              <div className="cart-cost">
                <p>Thành tiền</p>
                <p className="total-price">{cart.totalCost} đ</p>
              </div>
            </div>
          </Col>
          <Divider style={{ margin: '5px 0 5px 0' }} />
          <Col span={8}>
            <Button type="link" size="large" onClick={() => navigate('/cart')}>
              <ArrowLeftOutlined />
              Trở về giỏ hàng
            </Button>
          </Col>
          <Col span={8} offset={8}>
            <div className="cart-money">
              <button onClick={onClickConfirm} style={{ color: 'white' }}>
                Xác nhận thanh toán
              </button>
            </div>
          </Col>
        </Row>
      </WrapperConentContainer>
    </StoreLayoutContainer>
  );
};

export default CartContact;
