import { Col, Divider, List, Row, Typography } from 'antd';
import Item from 'antd/lib/list/Item';
import StoreLayoutContainer from 'layouts/store/store.layout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderList } from './service';
import './styles.less';
const OrderList = () => {
  // State
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  //Use Effect
  useEffect(() => {
    getOrderList()
      .then((lstOrders) => {
        console.log(lstOrders);
        setOrders(lstOrders);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <StoreLayoutContainer>
      <Row className="order-content">
        <Col span={8} offset={4}>
          Danh sách đơn hàng
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <Row className="order-type">
            <Col span={4}>ID</Col>
            <Col span={4}>Người nhận</Col>
            <Col span={4}>Ngày đặt hàng</Col>
            <Col span={4}>Địa chỉ</Col>
            <Col span={4}>Số điện thoại</Col>
            <Col span={4}>Tình trạng</Col>
          </Row>
          {orders.map((item) => (
            <div className="order-value">
              <Row className="order-list">
                <Col span={4}>
                  <Typography.Link
                    onClick={() => navigate(`/order-information/${item._id}`)}
                  >
                    {item._id}
                  </Typography.Link>
                </Col>
                <Col span={4}>{item.receiverName}</Col>
                <Col span={4}>{item.createdAt}</Col>
                <Col span={4}>{item.address}</Col>
                <Col span={4}>{item.phone}</Col>
                <Col className="order-status" span={4}>
                  {item.status}
                </Col>
              </Row>
              <Divider style={{ margin: '15px 0 ' }} />
              {item.items.map((orderItem) => (
                <Row className="order-products" align="middle">
                  <Col
                    className="product-detail-container"
                    span={12}
                    offset={4}
                  >
                    <Row style={{ width: '100%' }}>
                      <Col span={4}>
                        <img
                          className="product-img"
                          src={orderItem.product.thumbnail}
                        />
                      </Col>
                      <Col className="product-detail" span={20}>
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 1,
                            // expandable: true,
                          }}
                          className="product-title"
                        >
                          {orderItem.title}
                        </Typography.Paragraph>
                        <p className="product-pushlisher">
                          {orderItem.product.briefInformation.publisher}
                        </p>
                        <p className="product-price">{orderItem.amount}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={4} className="product-quantity">
                    x{orderItem.quantity}
                  </Col>
                  <Col span={4} className="product-totalamount">
                    {orderItem.totalAmount}
                  </Col>
                </Row>
              ))}
              <Row className="product-cost">
                <Col span={6} offset={18}>
                  Tổng tiền: <span>{item.totalCost}đ </span>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </StoreLayoutContainer>
  );
};

export default OrderList;
