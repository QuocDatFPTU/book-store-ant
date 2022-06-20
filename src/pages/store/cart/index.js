import { Col, Row } from 'antd';
import React from 'react';
import './styles.less';
import { Checkbox, Divider } from 'antd';
import { useState } from 'react';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
const CheckboxGroup = Checkbox.Group;
const plainOptions = [''];
const defaultCheckedList = [];

const Cart = () => {
  //state
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  //method
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  //data
  const orderData = [
    {
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
      title: 'Miền đất hứa sẽ đưa chúng ta đến khoái lạc',
      salePrice: '26.000.200đ',
      publisher: 'NXB Trẻ',
      quantity: 2,
      totalAmount: '40.400đ',
    },
    {
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
      title: 'Miền đất hứa',
      salePrice: '20.200đ',
      publisher: 'NXB Trẻ',
      quantity: 2,
      totalAmount: '40.400đ',
    },
    {
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
      title: 'Miền đất hứa',
      salePrice: '20.200đ',
      publisher: 'NXB Trẻ',
      quantity: 2,
      totalAmount: '40.400đ',
    },
  ];

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer>
        <div className="cart-content">Giỏ hàng</div>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row>
          <Col span={17}>
            <Row className="cart-type">
              <Col
                className="cart-type-title"
                style={{ textAlign: 'left' }}
                span={14}
              >
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  Chọn tất cả (1 sản phẩm)
                </Checkbox>
              </Col>
              <Col className="cart-type-title" span={2}>
                Số lượng
              </Col>
              <Col className="cart-type-title" span={4} offset={3}>
                Thành tiền
              </Col>
            </Row>
            {orderData.map((item) => (
              <div className="cart-value">
                <Row className="cart-form" align="middle">
                  <Col span={1}>
                    <CheckboxGroup
                      options={plainOptions}
                      value={checkedList}
                      onChange={onChange}
                    />
                  </Col>
                  <Col span={13} className="cart-detail-container">
                    <img className="cart-img" src={item.imgLink} />
                    <div className="cart-detail">
                      <p className="cart-title">{item.title}</p>
                      <p className="cart-pushlisher">{item.publisher}</p>
                      <p className="cart-price">{item.salePrice}</p>
                    </div>
                  </Col>
                  <Col style={{ textAlign: 'center' }} span={2}>
                    {item.quantity}
                  </Col>
                  <Col
                    className="cart-productitem-saleprice"
                    style={{ textAlign: 'center' }}
                    span={4}
                    offset={3}
                  >
                    {item.salePrice}
                  </Col>
                </Row>
              </div>
            ))}
          </Col>

          <Col span={6} offset={1}>
            <Row className="cart-main">
              <Col span={24}>
                <div class="cart-money">
                  <h2>Thành tiền</h2>
                  <div class="cart-cost">
                    <p>Tổng cộng</p>
                    <p>448.800 đ</p>
                  </div>
                  <div class="cart-cost">
                    <p>Tiền ship</p>
                    <p>20.000 đ</p>
                  </div>
                  <div class="cart-cost">
                    <p>Tổng Tiền</p>
                    <p class="total-price">468.800 đ</p>
                  </div>
                  <button>
                    <a href="">Thanh toán</a>
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </WrapperConentContainer>
    </StoreLayoutContainer>
  );
};

export default Cart;
