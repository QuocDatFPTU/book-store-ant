import React, { useEffect, useState } from 'react';
import './styles.less';
import { Button, Col, Divider, Input, message, Row, Typography } from 'antd';

import { getOrderInformation } from './service';
import { useNavigate, useParams } from 'react-router-dom';
import StoreLayoutContainer from 'layouts/store/store.layout';
import axiosClient from 'util/axiosClient';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { DateFormat, MoneyFormat } from 'components/format';

const InformationOrder = () => {
  // State
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  // Run first
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

  useEffect(() => {
    getOrder();
  }, []);

  //Method:
  const onDeleteOrder = async () => {
    axiosClient
      .delete(`/orders/me/${order._id}`)
      .then((result) => {
        console.log(result);
        getOrder();
        message.success('Đơn hàng đã được hủy thành công');
      })
      .catch((error) => {
        console.log(error.response);
        message.error(error.response.data.error);
      });
  };
  const onRebuy = async () => {
    const orderItems = order.items.map((item) => {
      return { id: item.product._id, quantity: 1 };
    });
    axiosClient
      .post(`/cart/rebuy/${order._id}`, orderItems)
      .then((result) => {
        console.log(result);
        navigate('/cart');
      })
      .catch((error) => {
        console.log(error.response);
        message.error(error.response.data.error);
      });
  };

  const statusColor = (status) => {
    if (status === 'submitted')
      return (
        <h3
          style={{
            color: '#fa8c16',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          đợi xác nhận
        </h3>
      );
    else if (status === 'cancelled')
      return (
        <h3
          style={{
            color: '#f5222d',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          đã hủy
        </h3>
      );
    else
      return (
        <h3
          style={{
            color: '#7cb305',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          Thành công
        </h3>
      );
  };

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer>
        <div className="infor-content">Thông Tin Đơn Hàng</div>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row>
          <Col span={12} style={{ width: '95%' }}>
            <Row className="infor-title" style={{ width: '98%' }}>
              <Col span={24}>
                <h1>{order.receiverName}</h1>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Giới tính
                  </Col>
                  <Col span={18}>Nữ</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Email
                  </Col>
                  <Col span={18}>{order.email}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Số điện thoại
                  </Col>
                  <Col span={18}>{order.phone}</Col>
                </Row>
                <Row style={{ marginBottom: '8px' }}>
                  <Col className="order-title-receiver" span={6}>
                    Địa chỉ
                  </Col>
                  <Col span={18}>{order.address}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ width: '95%' }}>
            <Row
              className="infor-title"
              style={{ width: '98%', float: 'right' }}
            >
              <Col span={24}>
                <h1>Đơn Hàng</h1>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    ID
                  </Col>
                  <Col span={18}>{order._id}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Ngày đặt hàng
                  </Col>
                  <Col span={18}>
                    <DateFormat>{order.createdAt}</DateFormat>
                  </Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Tổng tiền
                  </Col>
                  <Col
                    span={18}
                    style={{ fontSize: '18px', fontWeight: '500' }}
                  >
                    <MoneyFormat>{order.totalCost}</MoneyFormat>
                  </Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver status" span={6}>
                    Trạng Thái
                  </Col>
                  <Col span={18} className="infor-wait">
                    {statusColor(order.status)}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="infor-container">
          <Col span={9} style={{ fontWeight: '500', fontSize: '18px' }}>
            Sản phẩm
          </Col>
          <Col span={5} style={{ fontWeight: '500', fontSize: '18px' }}>
            Giá
          </Col>
          <Col span={5} style={{ fontWeight: '500', fontSize: '18px' }}>
            Số lượng
          </Col>
          <Col span={5} style={{ fontWeight: '500', fontSize: '18px' }}>
            Tổng tiền
          </Col>
        </Row>
        {order.items?.map((item) => (
          <Row className="infor-detail" align="middle">
            <Col span={9} className="infor-detail-container">
              <Row className="infor-lock">
                <Col span={6}>
                  <img className="infor-img" src={item.product.thumbnail} />
                </Col>
                <Col span={18} className="infor-form">
                  <Typography.Paragraph
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
        <Row className="infor-form-buy">
          <Col span={8} offset={2}>
            <div className="infor-back">
              <Button danger>Viết nhận xét</Button>
              <Button onClick={onRebuy} danger className="infor-return">
                Mua lại
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="infor-update" align="middle">
          <Col span={5}>
            <Button type="link" onClick={() => navigate(`/order-list`)}>
              {'<< Quay lại đơn hàng của tôi'}
            </Button>
          </Col>
          {order.status === 'submitted' ? (
            <Col span={12} offset={7} style={{ textAlign: 'right' }}>
              <Button
                className="infor-min"
                style={{ backgroundColor: '#f5222d', color: '#fff' }}
                onClick={onDeleteOrder}
                block={false}
              >
                Hủy đơn hàng
              </Button>
              <Button
                block={false}
                className="infor-min"
                style={{
                  backgroundColor: '#1c2260',
                  color: '#fff',
                  marginLeft: '10px',
                }}
              >
                Cập nhật
              </Button>
            </Col>
          ) : undefined}
        </Row>
      </WrapperConentContainer>
    </StoreLayoutContainer>
  );
};

export default InformationOrder;
