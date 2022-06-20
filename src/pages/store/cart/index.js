import { Col, Row } from 'antd';
import React from 'react';
import './styles.less';
import { Checkbox, Divider } from 'antd';
import { useState } from 'react';
const CheckboxGroup = Checkbox.Group;
const plainOptions = [''];
const defaultCheckedList = [];

const Cart = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

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
  const orderData = [
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
    <div style={{ backgroundColor: '#F0F2F5', height: '200vh' }}>
      <Row>
        <Col className="cart-content" span={8} offset={4}>
          Giỏ hàng
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={4}>
          <Row>
            <Col span={16}>
              <Row className="cart-type">
                <Col span={14}>
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                  >
                    Chọn tất cả (1 sản phẩm)
                  </Checkbox>
                </Col>
                <Col span={5}>Số lượng </Col>
                <Col span={5}>Thành tiền</Col>
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
                    <Col span={5}>{item.quantity}</Col>
                    <Col span={5}>{item.salePrice}</Col>
                  </Row>
                </div>
              ))}
            </Col>

            <Col span={7} offset={1}>
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
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
