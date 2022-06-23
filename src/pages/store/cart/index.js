import {
  Button,
  Col,
  Input,
  InputNumber,
  Row,
  Typography,
  Checkbox,
  Divider,
  Modal,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';

import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  deleteCartItem,
  getCartItemList,
  getProductById,
  onCheckout,
  updateCartItemQuantity,
} from './service';
import axiosClient from 'util/axiosClient';
import { useNavigate } from 'react-router-dom';
const CheckboxGroup = Checkbox.Group;
const { confirm } = Modal;
const plainOptions = ['123', '124', '125'];
const defaultCheckedList = [];

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

const Cart = () => {
  // state
  const navigate = useNavigate();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [checkAll, setCheckAll] = useState(false);
  const [qProduct, setQProduct] = useState(1);
  const [cart, setCart] = useState({});

  //Hook
  useEffect(() => {
    getCartItemList()
      .then((result) => {
        setCart(result);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  //Method
  const onClickCheckout = async () => {
    onCheckout()
      .then((result) => {
        console.log(result);
        navigate('/cart-contact');
      })
      .catch((error) => {
        const msgError = error.response.data.error.map((error) => (
          <div>
            {error} <br />
          </div>
        ));
        message.error(msgError, 5);
        setCart(cart);
      });
  };
  const onChange = (list) => {
    console.log(list);
    setCheckedList(list);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setCheckAll(e.target.checked);
  };
  const onClickMinus = () => {
    setQProduct((q) => --q);
  };
  const onClickPlus = () => {
    setQProduct((q) => ++q);
  };

  //Test
  console.log(checkedList);
  console.log(checkAll);
  console.log(cart);
  console.log(cart);

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer>
        <div className="cart-content">Giỏ hàng</div>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row>
          <Col span={18}>
            <Row style={{ width: '100%' }} className="cart-type">
              {/* <Col span={1}>
                <Checkbox onChange={onCheckAllChange} checked={checkAll} />
              </Col> */}
              <Col
                className="cart-type-title"
                style={{ textAlign: 'left' }}
                span={14}
              >
                Tổng sản phẩm (
                {cart.items != null && cart.items?.length !== 0
                  ? cart.items.length
                  : 0}
                )
              </Col>
              <Col className="cart-type-title" span={4} offset={1}>
                Số lượng
              </Col>
              <Col className="cart-type-title" span={3} offset={1}>
                Thành tiền
              </Col>
              <Col className="cart-type-title" span={1}>
                <DeleteOutlined />
              </Col>
            </Row>
            {/* <CheckboxGroup
              style={{ width: '100%' }}
              value={checkedList}
              onChange={onChange}
            > */}
            {cart.items?.map((item) => (
              <div className="cart-value">
                <Row className="cart-form" align="middle">
                  {/* <Col span={1}>
                      <Checkbox value={item._id} />
                    </Col> */}
                  <Col span={4} className="cart-detail-container">
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
                    <div>
                      <InputNumber
                        onChange={async (value) => {
                          console.log(value, item._id, item.product.quantity);

                          //Check case not update
                          if (
                            value < 0 ||
                            value > item.product.quantity ||
                            value === null
                          )
                            return;
                          console.log('doWork');

                          //Update:
                          try {
                            await updateCartItemQuantity({
                              cartItemId: item._id,
                              quantity: value,
                            });
                            const cart = await getCartItemList();
                            setCart(cart);
                            console.log(cart);
                          } catch (error) {
                            message.error(`${error.response.data.error}`, 5);
                          }
                        }}
                        style={{
                          marginLeft: '20px',
                          fontSize: '30px',
                        }}
                        controls={{
                          upIcon: <PlusOutlined style={{ fontSize: '30px' }} />,
                          downIcon: (
                            <MinusOutlined style={{ fontSize: '30px' }} />
                          ),
                        }}
                        min={1}
                        max={item.product.quantity}
                        defaultValue={item.quantity}
                      />
                    </div>
                  </Col>
                  <Col
                    className="cart-productitem-saleprice"
                    style={{ textAlign: 'center' }}
                    span={3}
                    offset={1}
                  >
                    {item.totalAmount}đ
                  </Col>
                  <Col span={1} style={{ textAlign: 'center' }}>
                    <Typography.Link
                      onClick={() => {
                        confirm({
                          title: 'Xóa sản phẩm',
                          icon: (
                            <CloseCircleOutlined style={{ color: 'red' }} />
                          ),
                          content: 'Bạn có muốn xóa sản phẩm này không?',
                          okText: 'Xác nhận',
                          cancelText: 'Hủy',

                          onOk() {
                            console.log('Xác nhận');

                            deleteCartItem(item._id)
                              .then(async () => {
                                const cart = await getCartItemList();
                                setCart(cart);
                                console.log(cart);
                              })
                              .catch((error) => {
                                console.log(error.response.data);
                              });
                          },

                          onCancel() {
                            console.log('Hủy');
                          },
                        });
                      }}
                    >
                      <DeleteOutlined style={{ cursor: 'pointer' }} />
                    </Typography.Link>
                  </Col>
                </Row>
              </div>
            ))}
            {/* </CheckboxGroup> */}
          </Col>

          <Col span={5} offset={1}>
            <Row className="cart-main">
              <Col span={24}>
                <div className="cart-money">
                  <h2>Thành tiền</h2>
                  <div className="cart-cost">
                    <p>Tổng cộng</p>
                    <p>{cart.totalCost} đ</p>
                  </div>
                  <div className="cart-cost">
                    <p>Tiền ship</p>
                    <p>0 đ</p>
                  </div>
                  <div className="cart-cost">
                    <p>Tổng Tiền</p>
                    <p className="total-price">{cart.totalCost} đ</p>
                  </div>
                  <button style={{ color: 'white' }} onClick={onClickCheckout}>
                    Thanh toán
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
