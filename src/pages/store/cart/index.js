import {
  Col,
  InputNumber,
  Row,
  Typography,
  Checkbox,
  Modal,
  message,
  Result,
  Button,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  deleteCartItem,
  deleteCartItemGuest,
  getCartItemList,
  getCartItemListGuest,
  onCheckout,
  onCheckoutGuest,
  updateCartItemQuantity,
  updateCartItemQuantityGuest,
} from './service';
import axiosClient from 'util/axiosClient';
import { useNavigate } from 'react-router-dom';
import { MoneyFormat } from 'components/format';
const { confirm } = Modal;

const Cart = () => {
  // state
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);

  //Hook
  useEffect(() => {
    if (!localStorage.getItem('__token') && !localStorage.getItem('__role')) {
      console.log('not have jwt store in localStorage');
      axiosClient.post('/user/guest').then((result) => {
        localStorage.setItem('__role', result.guest.role.code);
      });
    }

    //Get all cart item of customer or guest
    if (localStorage.getItem('__role') === 'R02') {
      getCartItemListGuest()
        .then((result) => {
          setCart(result);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      getCartItemList()
        .then((result) => {
          setCart(result);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    setLoading(false);
  }, []);

  //Method
  const onClickCheckout = async () => {
    try {
      if (localStorage.getItem('__role') === 'R02') await onCheckoutGuest();
      else await onCheckout();
      navigate('/cart-contact');
    } catch (error) {
      const msgError = error.response.data.error.map((error) => (
        <div>
          {error} <br />
        </div>
      ));
      message.error(msgError, 5);
      setCart(cart);
    }
  };

  return (
    <Spin spinning={loading} tip="Ch??? nh??n h??y ?????i m???t t?? nh??...">
      <WrapperConentContainer>
        <div className="cart-content">Gi??? h??ng</div>
      </WrapperConentContainer>
      {cart.items?.length === 0 || Object.keys(cart).length === 0 ? (
        <WrapperConentContainer>
          <Result
            status="404"
            // title="404"
            subTitle="Gi??? h??ng c???a b???n ??ang tr???ng"
            extra={
              <Button onClick={() => navigate('/')} type="primary">
                {'??i l???a ????? th??i <3'}
              </Button>
            }
          />
        </WrapperConentContainer>
      ) : (
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
                  T???ng s???n ph???m (
                  {cart.items != null && cart.items?.length !== 0
                    ? cart.items.length
                    : 0}
                  )
                </Col>
                <Col className="cart-type-title" span={4} offset={1}>
                  S??? l?????ng
                </Col>
                <Col className="cart-type-title" span={3} offset={1}>
                  Th??nh ti???n
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
                  {/* <span style={{ color: 'red' }}>{item.product.quantity}</span> */}
                  <Row className="cart-form" align="middle">
                    {/* <Col span={1}>
                      <Checkbox value={item._id} />
                    </Col> */}
                    <Col span={4} className="cart-detail-container">
                      <img className="cart-img" src={item.product.thumbnail} />
                    </Col>
                    <Col span={10}>
                      <Typography.Text
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          navigate(`/product-detail/${item.product._id}`)
                        }
                        ellipsis={true}
                        className="cart-title"
                      >
                        {item.title}
                      </Typography.Text>
                      <p className="cart-pushlisher">
                        {item.product.briefInformation.publisher}
                      </p>
                      <p className="cart-price">
                        <MoneyFormat>{item.amount}</MoneyFormat>
                      </p>
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
                              if (localStorage.getItem('__role') === 'R02') {
                                await updateCartItemQuantityGuest({
                                  cartItemId: item._id,
                                  quantity: value,
                                });
                                const cart = await getCartItemListGuest();
                                setCart(cart);
                                console.log(cart);
                              } else {
                                await updateCartItemQuantity({
                                  cartItemId: item._id,
                                  quantity: value,
                                });
                                const cart = await getCartItemList();
                                setCart(cart);
                                console.log(cart);
                              }
                            } catch (error) {
                              message.error(`${error.response.data.error}`, 5);
                            }
                          }}
                          style={{
                            marginLeft: '20px',
                            fontSize: '30px',
                          }}
                          controls={{
                            upIcon: (
                              <PlusOutlined style={{ fontSize: '30px' }} />
                            ),
                            downIcon: (
                              <MinusOutlined style={{ fontSize: '30px' }} />
                            ),
                          }}
                          key={item._id}
                          min={1}
                          max={item.product.quantity}
                          defaultValue={item.quantity}
                        />
                      </div>
                      {/* <h5>{item.quantity}</h5> */}
                    </Col>
                    <Col
                      className="cart-productitem-saleprice"
                      style={{ textAlign: 'center' }}
                      span={3}
                      offset={1}
                    >
                      <MoneyFormat>{item.totalAmount}</MoneyFormat>
                    </Col>
                    <Col span={1} style={{ textAlign: 'center' }}>
                      <Typography.Link
                        onClick={() => {
                          confirm({
                            title: 'X??a s???n ph???m',
                            icon: (
                              <CloseCircleOutlined style={{ color: 'red' }} />
                            ),
                            content: 'B???n c?? mu???n x??a s???n ph???m n??y kh??ng?',
                            okText: 'X??c nh???n',
                            cancelText: 'H???y',

                            onOk() {
                              console.log('X??c nh???n');

                              if (localStorage.getItem('__role') === 'R02') {
                                console.log('hello, delete from guest');
                                deleteCartItemGuest(item._id)
                                  .then(async () => {
                                    const cart = await getCartItemListGuest();
                                    setCart(cart);
                                    console.log(cart);
                                  })
                                  .catch((error) => {
                                    console.log(error.response.data);
                                  });
                              } else {
                                deleteCartItem(item._id)
                                  .then(async () => {
                                    const cart = await getCartItemList();
                                    setCart(cart);
                                    console.log(cart);
                                  })
                                  .catch((error) => {
                                    console.log(error.response.data);
                                  });
                              }
                            },

                            onCancel() {
                              console.log('H???y');
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
                    <h2>Th??nh ti???n</h2>
                    <div className="cart-cost">
                      <p>T???ng c???ng</p>
                      <p>
                        <MoneyFormat>{cart.totalCost}</MoneyFormat>
                      </p>
                    </div>
                    <div className="cart-cost">
                      <p>Ti???n ship</p>
                      <p>0 ??</p>
                    </div>
                    <div className="cart-cost">
                      <p>T???ng Ti???n</p>
                      <p className="total-price">
                        <MoneyFormat>{cart.totalCost}</MoneyFormat>
                      </p>
                    </div>
                    <button
                      style={{ color: 'white' }}
                      onClick={onClickCheckout}
                    >
                      Thanh to??n
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </WrapperConentContainer>
      )}
    </Spin>
  );
};

export default Cart;
