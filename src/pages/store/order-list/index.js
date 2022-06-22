import { Col, Divider, Row } from 'antd';
import Item from 'antd/lib/list/Item';
import StoreLayoutContainer from 'layouts/store/store.layout';
import React from 'react';
import './styles.less';
const OrderList = () => {
  const orderData = [
    {
      id: '0458',
      receiver: 'Lê Duy Nam Em',
      orderDate: '28/06/2001',
      address: '321 Hoàng Hữu Nam',
      phoneNumber: '098934985',
      status: 'Đợi xác nhận',
      products: [
        {
          imgLink:
            'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
          title: 'Miền đất hứa',
          salePrice: '20.200đ',
          publisher: 'NXB Trẻ',
          quantity: 2,
          totalAmount: '40.400đ',
        },
      ],
    },
    {
      id: '0456',
      receiver: 'Nguyễn Hoàng Anh',
      orderDate: '28/06/2001',
      address: '197 Lê Lai',
      phoneNumber: '083934912',
      status: 'Thành công',
      products: [
        {
          imgLink:
            'https://cdn0.fahasa.com/media/catalog/product/i/m/image_182308.jpg',
          title: 'Tam quốc diễn nghĩa',
          salePrice: '207.200đ',
          publisher: 'NXB Trẻ',
          quantity: 1,
          totalAmount: '207.200đ',
        },
      ],
    },
  ];

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
          {orderData.map((item) => (
            <div className="order-value">
              <Row className="order-list">
                <Col span={4}>{item.id}</Col>
                <Col span={4}>{item.receiver}</Col>
                <Col span={4}>{item.orderDate}</Col>
                <Col span={4}>{item.address}</Col>
                <Col span={4}>{item.phoneNumber}</Col>
                <Col className="order-status" span={4}>
                  {item.status}
                </Col>
              </Row>
              <Divider style={{ margin: '15px 0 ' }} />
              {item.products.map((product) => (
                <Row className="order-products" align="middle">
                  <Col
                    className="product-detail-container"
                    span={12}
                    offset={4}
                  >
                    <img className="product-img" src={product.imgLink} />
                    <div className="product-detail">
                      <p className="product-title">{product.title}</p>
                      <p className="product-pushlisher">{product.publisher}</p>
                      <p className="product-price">{product.salePrice}</p>
                    </div>
                  </Col>
                  <Col span={4} className="product-quantity">
                    x{product.quantity}
                  </Col>
                  <Col span={4} className="product-totalamount">
                    {product.totalAmount}
                  </Col>
                </Row>
              ))}
              <Row className="product-cost">
                <Col span={6} offset={18}>
                  Tổng tiền: <span>40.400đ </span>
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
