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
  Select,
  Table,
  Tooltip,
} from 'antd';
import 'moment/locale/vi';

import { uploadFileToFirebase, uuidv4 } from 'util/file';

import { createCustomer, updateCustomer } from './customer.service';
import TableCustom from 'components/CustomTable';
import {
  BorderlessTableOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { DateFormat } from 'components/format';

const CustomerEdit = ({
  currentRow,
  onCallback,
  isEditModal,
  setIsEditModal,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  console.log(currentRow?.history);
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [isEditModal]);

  //Handle form
  const onCancel = () => {
    setIsEditModal(false);
  };
  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      // create
      if (!currentRow) {
        const createData = {
          ...values,
        };
        await createCustomer(createData)
          .then((result) => {
            if (result) {
              message.success('Thêm mới Khách hàng thành công!');
            }
          })
          .catch((error) => {
            message.error(error?.response?.data?.error);
          });
        setLoading(false);
        onCallback();
      } else {
        //update
        let updateData = {
          ...values,
          id: currentRow._id,
        };
        await updateCustomer(updateData)
          .then((result) => {
            console.log(result);
            message.success('Cập nhật khách hàng thành công!');
            setLoading(false);
            onCallback();
          })
          .catch((error) => {
            message.error(error?.response?.data?.error);
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
    fullName: currentRow ? currentRow?.fullName : undefined,
    gender: currentRow ? currentRow?.gender : undefined,
    email: currentRow ? currentRow?.email : undefined,
    phone: currentRow ? currentRow?.phone : undefined,
    address: currentRow ? currentRow?.address : undefined,
    status: currentRow ? currentRow?.status : undefined,
  };
  const columnsHistory = [
    // address, updated by, updated date
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => {
        return (
          <Tooltip placement="topLeft" title={title}>
            <p>{title}</p>
          </Tooltip>
        );
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: '12%',
      render: (text, record) => {
        switch (text) {
          case 'M':
            return <ManOutlined />;
          case 'F':
            return <WomanOutlined />;
          case 'D':
            return <BorderlessTableOutlined />;
          default:
            <p>{text}</p>;
        }
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => {
        return (
          <Tooltip placement="topLeft" title={title}>
            <p>{title}</p>
          </Tooltip>
        );
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => {
        return <Tooltip title={title}>{title}</Tooltip>;
      },
    },
    {
      title: 'Được cập nhật bởi',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      ellipsis: {
        showTitle: false,
      },
    },
    ,
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      ellipsis: {
        showTitle: false,
      },
      render: (text) => <DateFormat>{text}</DateFormat>,
    },
  ];
  return (
    <Modal
      title={currentRow ? 'Cập nhật Thông tin khách hàng' : 'Tạo khách hàng'}
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
      <Form
        colon={false}
        form={form}
        layout="vertical"
        requiredMark={true}
        initialValues={initalValue}
        labelWrap
        onFinish={(values) => onFinish(values)}
      >
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Cần nhập Họ và tên!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Chọn giới tính',
              },
            ]}
          >
            <Select placeholder="Giới tính" allowClear>
              <Select.Option value="M">male</Select.Option>
              <Select.Option value="F">female</Select.Option>
              <Select.Option value="D">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: 'true',
                message: 'Nhập Email!',
              },
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Cần nhập Số điện thoại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: 'Cần nhập Địa chỉ',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={18} className="infor-wait" style={{ marginBottom: '20px' }}>
          <h3>Trạng thái</h3>
          {currentRow?.status}
        </Col>

        {currentRow && (
          <Col lg={{ span: 24 }} xs={{ span: 24 }}>
            <TableCustom
              title={() => (
                <Row>
                  <Col span={12}>
                    <h3> {'Lịch sử cập nhật'}</h3>
                  </Col>
                </Row>
              )}
              rowKey="id"
              bordered
              columns={columnsHistory}
              dataSource={currentRow?.history}
            />
          </Col>
        )}
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
              {loading === false ? (
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
              )}
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomerEdit;
