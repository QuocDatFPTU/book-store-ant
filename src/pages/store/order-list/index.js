import { Button, Col, Divider, List, Result, Row, Typography } from 'antd';
import Item from 'antd/lib/list/Item';
import { DateFormat, MoneyFormat } from 'components/format';
import StatusFormat from 'components/format-status';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderList } from './service';
import './styles.less';
const OrderList = () => {
  // State
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Use Effect
  useEffect(() => {
    getOrderList({ sortedBy: 'updatedAt_desc' })
      .then(({ orders, count }) => {
        setOrders(orders);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <Row className="order-content">
        <Col span={8} offset={4}>
          Danh sách đơn hàng
        </Col>
      </Row>
      {orders.length === 0 ? (
        <WrapperConentContainer>
          <Result
            status="404"
            // title="404"
            subTitle="Danh sách đơn hàng của bạn đang trống, không có cái gì để xem đâu á"
            extra={
              <Button onClick={() => navigate('/')} type="primary">
                {'Đi đặt hàng thôi <3'}
              </Button>
            }
          />
        </WrapperConentContainer>
      ) : (
        <Row>
          <Col span={16} offset={4}>
            <Row
              className="order-type"
              style={{ fontWeight: '600', fontSize: '18px' }}
            >
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
                  <Col span={4}>
                    <DateFormat>{item.createdAt}</DateFormat>
                  </Col>
                  <Col span={4}>{item.address}</Col>
                  <Col span={4}>{item.phone}</Col>
                  <Col className="order-status" span={4}>
                    <StatusFormat>{item.status}</StatusFormat>
                  </Col>
                </Row>
                <Divider style={{ margin: '15px 0 ' }} />
                {item.items.map((orderItem) => (
                  <Row className="order-products" align="middle">
                    <Col
                      className="product-detail-container"
                      span={13}
                      offset={3}
                    >
                      <Row style={{ width: '100%' }}>
                        <Col span={5} style={{ textAlign: 'right' }}>
                          <img
                            className="product-img"
                            src={orderItem.product.thumbnail}
                          />
                        </Col>
                        <Col className="product-detail" span={19}>
                          <a
                            onClick={() =>
                              navigate(
                                `/product-detail/${orderItem.product._id}`
                              )
                            }
                          >
                            <Typography.Paragraph
                              ellipsis={{
                                rows: 1,
                                // expandable: true,
                              }}
                              className="product-title"
                            >
                              {orderItem.title}
                            </Typography.Paragraph>
                          </a>
                          <p className="product-pushlisher">
                            {orderItem.product.briefInformation.publisher}
                          </p>
                          <p className="product-price">
                            <MoneyFormat>{orderItem.amount}</MoneyFormat>
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4} className="product-quantity">
                      x{orderItem.quantity}
                    </Col>
                    <Col span={4} className="product-totalamount">
                      <MoneyFormat>{orderItem.totalAmount}</MoneyFormat>
                    </Col>
                  </Row>
                ))}
                <Row className="product-cost">
                  <Col span={6} offset={18}>
                    Tổng tiền:{' '}
                    <span>
                      <MoneyFormat>{item.totalCost}</MoneyFormat>
                    </span>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderList;
