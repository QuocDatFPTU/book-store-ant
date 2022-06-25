import React, { useEffect } from 'react';
import './styles.less';
import { Button, Col, Divider, Input, Row, Typography } from 'antd';
import { useState } from 'react';
import { getOrderInformation } from './service';
import { useParams } from 'react-router-dom';
import StoreLayoutContainer from 'layouts/store/store.layout';

const InformationOrder = () => {
  //State
  const { id } = useParams();
  const [order, setOrder] = useState({});

  //Run first
  useEffect(() => {
    getOrderInformation(id)
      .then((result) => {
        console.log(result);
        setOrder(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <StoreLayoutContainer>
      <Row className="infor-content">
        <Col span={8} offset={4}>
          Thông Tin Đơn Hàng
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <Row>
            <Col span={12}>
              <Row className="infor-title">
                <Col span={24}>
                  <div>
                    <h1>{order.receiverName}</h1>
                    <p>
                      <span className="order-title-receiver">Giới tính: </span>
                      Nữ
                    </p>
                    <p>
                      <span className="order-title-receiver">Email: </span>
                      {order.email}
                    </p>
                    <p>
                      <span className="order-title-receiver">
                        Số điện thoại:{' '}
                      </span>{' '}
                      {order.phone}
                    </p>
                    <p>
                      <span className="order-title-receiver">Địa chỉ: </span>{' '}
                      {order.address}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={11} offset={1}>
              <Row className="infor-title">
                <Col span={24}>
                  <div>
                    <h1>Đơn Hàng</h1>
                    <p>ID: {order._id}</p>
                    <p>Ngày đặt hàng: {order.createdAt}</p>
                    <p>Tổng tiền: {order.totalCost}đ</p>
                    <p className="status">
                      Trạng Thái:{' '}
                      <span className="infor-wait">{order.status}</span>
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="infor-container">
            <Col span={9}>Sản phẩm</Col>
            <Col span={5}>Giá</Col>
            <Col span={5}>Số lượng</Col>
            <Col span={5}>Tổng tiền</Col>
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
                {item.amount}
              </Col>
              <Col span={5}>{item.quantity}</Col>
              <Col span={5}>{item.totalAmount}đ</Col>
            </Row>
          ))}
          <Row className="infor-form-buy">
            <Col span={8} offset={2}>
              <div className="infor-back">
                <Button danger>Viết nhận xét</Button>
                <Button danger className="infor-return">
                  Mua lại
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="infor-update">
            <Col span={4} offset={20}>
              <Button
                className="infor-min"
                style={{ backgroundColor: '#1c2260', color: '#fff' }}
              >
                Cập nhật
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </StoreLayoutContainer>
  );
};

export default InformationOrder;
