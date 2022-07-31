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
  Result,
} from 'antd';

import {
  InfoCircleOutlined,
  QuestionOutlined,
  ArrowLeftOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import './styles.less';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createOrder,
  createOrderGuest,
  getCartItemList,
  getCartItemListGuest,
  getOrderInformation,
  getReceiverInfor,
  getReceiverInforGuest,
  setReceiverInforSession,
} from './service';
import axiosClient from 'util/axiosClient';
import { MoneyFormat } from 'components/format';
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

const CartCompletion = () => {
  // State
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  // Method
  const getOrder = async () => {
    getOrderInformation(id)
      .then((result) => {
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Method
  const getOrderGuest = async () => {
    axiosClient
      .get(`/orders/guest/${id}`)
      .then((result) => {
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect
  useEffect(() => {
    if (localStorage.getItem('__role') === 'R02') getOrderGuest();
    else getOrder();
  }, []);

  return (
    <>
      <WrapperConentContainer>
        <Result
          status="success"
          icon={<SmileOutlined />}
          title="Qúy khách đã đặt hàng thành công rồi a"
          extra={[
            <Button type="primary" key="console" onClick={() => navigate('/')}>
              Quay lại trang chủ
            </Button>,
          ]}
        />
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row>
          <Col
            style={{
              backgroundColor: 'white',
              padding: '10px',
              width: '100%',
              borderRadius: '10px',
            }}
            span={17}
          >
            <Row style={{ width: '100%' }} justify="space-between">
              <h2
                style={{
                  fontSize: '22px',
                }}
              >
                Thông tin đơn hàng
              </h2>
              {localStorage.getItem('__role') !== 'R02' && (
                <Button
                  onClick={() => navigate(`/order-information/${order._id}`)}
                  type="link"
                >
                  Xem chi tiết đơn hàng
                </Button>
              )}
            </Row>
            <Divider style={{ margin: '6px 0' }} />
            {order.items?.map((item) => (
              <Row
                style={{ width: '100%' }}
                className="infor-detail"
                align="middle"
              >
                <Col span={9} className="infor-detail-container">
                  <Row className="infor-lock">
                    <Col span={7}>
                      <img
                        className="infor-img"
                        style={{ width: '100px' }}
                        src={item.product.thumbnail}
                      />
                    </Col>
                    <Col span={17} className="infor-form">
                      <Typography.Paragraph
                        style={{ marginBottom: '5px' }}
                        ellipsis={{
                          rows: 1,
                          // expandable: true,
                        }}
                        className="infor-type"
                      >
                        {item.title}
                      </Typography.Paragraph>
                      <p className="infor-pushlisher">
                        {item.product.briefInformation.publisher}
                      </p>
                      {/* <p className="infor-category">{item.Category}</p> */}
                    </Col>
                  </Row>
                </Col>
                <Col style={{ display: 'flex' }} span={5}>
                  <MoneyFormat>{item.amount}</MoneyFormat>
                </Col>
                <Col span={5}>{item.quantity}</Col>
                <Col span={5}>
                  <MoneyFormat>{item.totalAmount}</MoneyFormat>
                </Col>
              </Row>
            ))}
          </Col>
          <Col span={6} offset={1}>
            <Row className="cart-main">
              <Col span={24}>
                <div className="cart-money">
                  <h2>Thành tiền</h2>
                  <div className="cart-cost">
                    <p>Tổng cộng</p>
                    <p>
                      <MoneyFormat>{order.totalCost}</MoneyFormat>
                    </p>
                  </div>
                  <div className="cart-cost">
                    <p>Tiền ship</p>
                    <p>0 đ</p>
                  </div>
                  <div className="cart-cost">
                    <p>Tổng Tiền</p>
                    <p className="total-price">
                      <MoneyFormat>{order.totalCost}</MoneyFormat>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </WrapperConentContainer>
    </>
  );
};

export default CartCompletion;
