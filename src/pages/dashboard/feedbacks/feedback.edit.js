/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  Modal,
  Row,
  Input,
  Button,
  message,
  Checkbox,
  Select,
  InputNumber,
  DatePicker,
  Typography,
} from 'antd';
import 'moment/locale/vi';
import {
  getSalerListSaleManager,
  updateOrder,
  updateOrderSaleManager,
} from './feedback.service';
import { uploadFileToFirebase, uuidv4 } from 'util/file';
import moment from 'moment';
import { DateFormat, MoneyFormat } from 'components/format';
import StatusFormat from 'components/format-status';
const ProductEdit = ({
  currentRow,
  onCallback,
  isEditModal,
  setIsEditModal,
  categoryList,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [salerOptions, setSalerOptions] = useState();
  const [setDefaultFileList] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    fetchSalersList();
    return () => {
      form.resetFields();
    };
  }, [isEditModal]);

  const fetchSalersList = () => {
    getSalerListSaleManager()
      .then((salers) => {
        console.log(salers);
        setSalerOptions(
          salers.map((saler) => {
            return {
              label: saler?.fullName,
              value: saler?._id,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
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
  const onCancel = () => {
    setIsEditModal(false);
  };
  const onFinish = async (values) => {
    console.log(values, '+++=');
    try {
      const updateData = { id: currentRow._id, ...values };
      setLoading(true);
      // Update
      if (localStorage.getItem('__role') === 'R04') {
        await updateOrder(updateData)
          .then((result) => {
            console.log(result);
            message.success('Cập nhật đơn hàng thành công!');
            setLoading(false);
            onCallback();
          })
          .catch((error) => {
            console.log('error2', error);
            message.error(error.message);
            setLoading(false);
          });
      }
      if (localStorage.getItem('__role') === 'R05') {
        await updateOrderSaleManager(updateData)
          .then((result) => {
            console.log(result);
            message.success('Cập nhật đơn hàng thành công!');
            setLoading(false);
            onCallback();
          })
          .catch((error) => {
            console.log('error2', error);
            message.error(error.message);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('errorTong', error);
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  const initalValue = {
    id: currentRow ? currentRow?._id : undefined,
    status: currentRow ? currentRow?.status : undefined,
    saler: currentRow ? currentRow?.saler?._id : undefined,
  };
  return (
    <Modal
      title={'Cập nhật hóa đơn'}
      visible={isEditModal}
      width={900}
      centered
      footer={null}
      forceRender={true}
      afterClose={() => {
        // console.log(defaultFileList);
        form.resetFields();
      }}
      onCancel={onCancel}
    >
      {currentRow?.owner && (
        <Row>
          <Col span={12} style={{ width: '95%' }}>
            <Row className="infor-title" style={{ width: '98%' }}>
              <Col span={24}>
                <h1>{'Thông tin khách hàng'}</h1>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Họ và tên
                  </Col>
                  <Col span={18}>{currentRow.owner.fullName}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Email
                  </Col>
                  <Col span={18}>{currentRow.owner.email}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Số điện thoại
                  </Col>
                  <Col span={18}>{currentRow.owner.phone}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <Form
        colon={false}
        form={form}
        layout="vertical"
        requiredMark={true}
        initialValues={initalValue}
        labelWrap
        onFinish={(values) => onFinish(values)}
      >
        <Row>
          <Col span={12} style={{ width: '95%' }}>
            <Row className="infor-title" style={{ width: '98%' }}>
              <Col span={24}>
                <h1>{'Thông tin người nhận hàng'}</h1>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Họ và tên
                  </Col>
                  <Col span={18}>{currentRow?.receiverName}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Giới tính
                  </Col>
                  <Col span={18}>{currentRow?.gender}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Email
                  </Col>
                  <Col span={18}>{currentRow?.email}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Số điện thoại
                  </Col>
                  <Col span={18}>{currentRow?.phone}</Col>
                </Row>
                <Row style={{ marginBottom: '8px' }}>
                  <Col className="order-title-receiver" span={6}>
                    Địa chỉ
                  </Col>
                  <Col span={18}>{currentRow?.address}</Col>
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
                  <Col span={18}>{currentRow?._id}</Col>
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Saler
                  </Col>
                  {(localStorage.getItem('__role') === 'R04' ||
                    (localStorage.getItem('__role') === 'R05' &&
                      currentRow?.status !== 'submitted')) && (
                    <Col span={18}>{currentRow?.saler?.fullName}</Col>
                  )}
                  {localStorage.getItem('__role') === 'R05' &&
                    currentRow?.status === 'submitted' && (
                      <Col span={18}>
                        <Form.Item
                          name="saler"
                          rules={[
                            {
                              required: true,
                              message: 'Cần chọn Saler !',
                            },
                          ]}
                        >
                          <Select
                            placeholder="Hãy chọn Saler"
                            options={salerOptions}
                          ></Select>
                        </Form.Item>
                      </Col>
                    )}
                </Row>
                <Row>
                  <Col className="order-title-receiver" span={6}>
                    Ngày đặt hàng
                  </Col>
                  <Col span={18}>
                    {currentRow && (
                      <DateFormat>{currentRow?.createdAt}</DateFormat>
                    )}
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
                    {currentRow && (
                      <MoneyFormat>{currentRow?.totalCost}</MoneyFormat>
                    )}
                  </Col>
                </Row>
                {currentRow?.status === 'submitted' && (
                  <Row>
                    <Col
                      className="order-title-receiver s
                  tatus"
                      span={6}
                    >
                      Trạng Thái
                    </Col>
                    <Col span={18} className="infor-wait">
                      <Form.Item
                        name="status"
                        rules={[
                          {
                            required: true,
                            message: 'Cần chọn trạng thái',
                          },
                        ]}
                      >
                        <Select>
                          <Option value="submitted">submitted</Option>
                          <Option value="cancelled">cancelled</Option>
                          <Option value="success">success</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                {currentRow?.status !== 'submitted' && (
                  <Row>
                    <Col
                      className="order-title-receiver s
                  tatus"
                      span={6}
                    >
                      Trạng Thái
                    </Col>
                    <Col span={18} className="infor-wait">
                      <StatusFormat>{currentRow?.status}</StatusFormat>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="infor-container">
          <Col span={9} style={{ fontWeight: '500', fontSize: '18px' }}>
            Sản phẩm
          </Col>
          <Col span={5} style={{ fontWeight: '500', fontSize: '18px' }}>
            Giá
          </Col>
          <Col span={5} style={{ fontWeight: '500', fontSize: '18px' }}>
            Số lượng
          </Col>
          <Col span={5} style={{ fontWeight: '500', fontSize: '18px' }}>
            Tổng tiền
          </Col>
        </Row>
        {currentRow?.items?.map((item) => (
          <Row className="infor-detail" align="middle">
            <Col span={9} className="infor-detail-container">
              <Row className="infor-lock">
                <Col span={6}>
                  <img
                    className="infor-img"
                    style={{ height: '60px', width: '70px' }}
                    src={item.product.thumbnail}
                  />
                </Col>
                <Col span={18} className="infor-form">
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 1,
                      // expandable: true,
                    }}
                    className="infor-type"
                    style={{ marginBottom: '4px' }}
                  >
                    {item.title}
                  </Typography.Paragraph>
                  <p className="infor-pushlisher">
                    {item.product.briefInformation.publisher}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col style={{ display: 'flex' }} span={5}>
              <MoneyFormat>{item.amount}</MoneyFormat>
            </Col>
            <Col span={5}>{item.quantity}</Col>
            <Col span={5}>
              <MoneyFormat>{item.totalAmount}</MoneyFormat>
            </Col>
          </Row>
        ))}
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
                onClick={onCancel}
                style={{ fontWeight: 'bold' }}
              >
                {'Cancel'}
              </Button>
              {currentRow?.status === 'submitted' &&
                (loading === false ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ fontWeight: 'bold' }}
                  >
                    {'Save'}
                  </Button>
                ) : (
                  <Button type="primary" loading style={{ fontWeight: 'bold' }}>
                    {'Loading'}
                  </Button>
                ))}
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductEdit;
