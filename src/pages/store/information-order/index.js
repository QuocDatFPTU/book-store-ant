import React, { useEffect, useState } from 'react';
import './styles.less';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Rate,
  Row,
  Typography,
  Upload,
} from 'antd';

import { createFeedback, getFeedback, getOrderInformation } from './service';
import { useNavigate, useParams } from 'react-router-dom';
import StoreLayoutContainer from 'layouts/store/store.layout';
import axiosClient from 'util/axiosClient';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { DateFormat, MoneyFormat } from 'components/format';
import queryString from 'query-string';
import { UploadOutlined } from '@ant-design/icons';
import {
  beforeUpload,
  fakeUpload,
  sendImageToFirebase,
  uploadMultipleFileToFirebase,
} from 'util/file';
import { async } from '@firebase/util';
import { useSelector } from 'react-redux';
import { result } from 'lodash';
import { format } from 'prettier';

const InformationOrder = () => {
  // State
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const [rate, setRate] = useState();
  const [fileListDone, setFileListDone] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [productId, setProductId] = useState();



  const [form] = Form.useForm();
  const auth = useSelector((state) => state.auth);

  const { currentUser } = useSelector((state) => state.auth);
  // Run first
  const getOrder = async () => {
    getOrderInformation(id)
      .then((result) => {
        setOrder(result);
      })
      .catch((error) => {
        message.error(error?.message);
      });
  };

  useEffect(() => {
    getOrder();
  }, []);


  const handleChange = ({ fileList }) => {
    setFileListDone(fileList);
  }

  const config = {
    title: 'Cảnh báo',
    content: <p>Bạn có muốn hủy đơn hàng?</p>,
    onOk: async () => {
      try {
        await onDeleteOrder();
        return true;
      } catch (error) {
        message.error(error?.message);
      }
    },
    okText: 'OK',
    onCancel: () => {
      return Promise.resolve();
    },
    cancelText: 'Hủy',
    closable: true,
  };
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
    <>
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
                  <Col span={18}>{order.gender}</Col>
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
          <Col span={3} style={{ fontWeight: '500', fontSize: '18px' }}>
            Giá
          </Col>
          <Col span={2} style={{ fontWeight: '500', fontSize: '18px' }}>
            Số lượng
          </Col>
          <Col span={2} style={{ fontWeight: '500', fontSize: '18px' }}>
            Tổng tiền
          </Col>
        </Row>
        {order.items?.map((item) => (
          <>
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
                      style={{ cursor: 'pointer' }}
                      className="infor-type"
                      onClick={() =>
                        navigate(`/product-detail/${item.product._id}`)
                      }
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
              <Col style={{ display: 'flex' }} span={3}>
                <MoneyFormat>{item.amount}</MoneyFormat>
              </Col>
              <Col span={2}>{item.quantity}</Col>
              <Col span={2}>
                <MoneyFormat>{item.totalAmount}</MoneyFormat>
              </Col>
              <Col span={2}>
                <Row className="infor-form-buy">
                  {order.status === 'success' && (
                    <div className="infor-back">
                      <Button onClick={async () => {
                        const feedback = await getFeedback(item.product?._id);
                        for (const feed of feedback) {
                          if (feed?.user?.email === currentUser?.email) {
                            message.warning("Bạn đã feedback!")
                            return;
                          }
                        }
                        // if (feedback?.user === currentUser?.email) {
                        //   message.warning("Bạn đã feedback!")
                        //   return;
                        // }
                        setProductId(item.product?._id);
                        setIsEditModal(true);
                      }} >Viết nhận xét</Button>
                      <Button onClick={onRebuy} danger className="infor-return">
                        Mua lại
                      </Button>
                    </div>
                  )}
                </Row>
              </Col>
            </Row>
          </>
        ))}
        {/* <Row className="infor-form-buy">
          <Col span={8} offset={2}>
          </Col>
        </Row> */}

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
                onClick={() => Modal.confirm(config)}
                block={false}
              >
                Hủy đơn hàng
              </Button>
              {/* <Button
                block={false}
                className="infor-min"
                style={{
                  backgroundColor: '#1c2260',
                  color: '#fff',
                  marginLeft: '10px',
                }}
              >
                Cập nhật
              </Button> */}
            </Col>
          ) : undefined}
        </Row>
        <Modal
          title={'Đánh giá sản phẩm'}
          visible={isEditModal}
          width={600}
          style={{
            top: 70,
          }}
          footer={null}
          forceRender={true}
          // afterClose={() => {
          //   // console.log(defaultFileList);
          //   form.resetFields();
          // }}
          onCancel={() => { setIsEditModal(false); }}
        >
          <Form
            form={form}
            onFinish={async (values) => {
              try {
                setLoading(true);
                const urls = await uploadMultipleFileToFirebase(fileListDone);

                const images = urls.map(url => ({
                  imageAltDoc: 'images',
                  image: url?.downloadURL,
                }));
                const feedbackData = {
                  ...values,
                  user: auth?.currentUser,
                  images
                }
                const feedback = await createFeedback(productId, feedbackData);
                if (feedback) {
                  message.success('Tạo mới feedback thành công !');
                  setFileListDone((prev) => setFileListDone([]));
                  setLoading(false);
                  setIsEditModal(false);
                  form.resetFields();
                  setProductId();
                  return true;
                }
              } catch (error) {
                message.error(error?.message);
                setLoading(false);
                form.resetFields();
                return false
              }
            }}
          >
            <Row>
              <Col offset={9}>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  Vui lòng đánh giá
                </p>
              </Col>
              <Row justify="center" style={{ width: '100%' }}>
                <Col>
                  <Form.Item name="star" style={{ width: '100%' }}>
                    <Rate
                      onChange={setRate}
                      value={rate}
                      style={{ fontSize: '40px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Form.Item name="content" style={{ width: '100%' }}>
                <Input.TextArea
                  placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé."
                  style={{ height: '150px' }}
                />
              </Form.Item>
            </Row>
            <Row>
              <Upload
                multiple={true}
                accept="image/*"
                onChange={handleChange}
                listType="picture"
                beforeUpload={(file) => {
                  return beforeUpload(file);
                }}
                showUploadList={true}
                fileList={fileListDone}
                customRequest={fakeUpload}
              >
                <Button icon={<UploadOutlined />}>Thêm ảnh</Button>
              </Upload>
            </Row>
            <div
              className="ant-modal-footer"
              style={{ marginLeft: -24, marginRight: -24, marginBottom: -24 }}
            >
              <Row gutter={24} type="flex" style={{ textAlign: 'right' }}>
                <Col
                  className="gutter-row"
                  span={24}
                  style={{ textAlign: 'right' }}
                >
                  <Button
                    type="clear"
                    onClick={() => { setIsEditModal(false); form.resetFields() }}
                    style={{ fontWeight: 'bold' }}
                  >
                    {'Hủy'}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ fontWeight: 'bold' }}
                    loading={loading}
                  >
                    {'Lưu'}
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
      </WrapperConentContainer>
    </>
  );
};

export default InformationOrder;
