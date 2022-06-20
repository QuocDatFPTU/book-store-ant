import React from 'react';
import './styles.less';
import { Col, Divider, Row } from 'antd';

const InformationOrder = () => {
  const orderData = [
    {
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
      title: 'Miền đất hứa',
      Category: 'Mangan',
      publisher: 'NXB Trẻ',
      quantity: 2,
      totalAmount: '40.400đ',
    },
  ];
  return (
    <div style={{ backgroundColor: '#F0F2F5', height: '200vh' }}>
      <Row className="infor-content">
        <Col span={8} offset={4}>
          Thông tin đơn hàng
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <Row>
            <Col span={12}>
              <Row className="infor-title">
                <Col span={24}>
                  <div>
                    <h1>Lê Duy Nam Em</h1>
                    <p>Giới tính: Nữ</p>
                    <p>Email: narutodateyobatyo@gmail.com</p>
                    <p>Số điện thoại: 0912345261</p>
                    <p>
                      Địa chỉ: 123/32 An Phọ, phường An Dương, Thành phố HCM
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
                    <p>ID: 0458</p>
                    <p>Ngày đặt hàng: 28/06/2021</p>
                    <p>Tổng tiền: 40.400đ</p>
                    <p className="status">
                      Trạng Thái: <span>Đợi xác nhận</span>
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
          {orderData.map((item) => (
            <Row className="infor-detail" align="middle">
              <Col span={9} className="infor-detail-container">
                <img className="infor-img" src={item.imgLink} />
                <div className="infor-form">
                  <p className="infor-type">{item.title}</p>
                  <p className="infor-pushlisher">{item.publisher}</p>
                  <p className="infor-category">{item.Category}</p>
                </div>
              </Col>
              <Col span={5}>20.200đ</Col>
              <Col span={5}>2</Col>
              <Col span={5}>40.400đ</Col>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default InformationOrder;