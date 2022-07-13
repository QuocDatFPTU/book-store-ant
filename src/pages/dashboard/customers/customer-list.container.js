import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  PageHeader,
  Row,
  Tooltip,
  Typography,
} from 'antd';
import { pickBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { defaultPage } from 'util/constant';
// import DepaEdit from "./department.edit";

import TableCustom from 'components/CustomTable';
import CustomerEdit from './customer.edit';
import { getCustomerList } from './customer.service';
import axiosClient from 'util/axiosClient';
// const defaultSort = {
// 	"is-ascending": "true",
// 	"order-by": "Id",
// };
const ManageCustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [product, setProduct] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  // const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchCustomerList = (params, sortedInfo) => {
    setLoading(true);
    getCustomerList({ ...params })
      .then((result) => {
        console.log(result);
        setCustomerList([...result?.customers]);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    fetchCustomerList(params);
  }, [params]);

  const columns = [
    //contacts' id, full name, gender, email, mobile, status
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text, record) => {
        return (
          <Button
            size="small"
            type="link"
            onClick={async () => {
              const customerUpdate = await axiosClient.get(
                `/customers/${text}`
              );
              setCurrentRow(customerUpdate);
              setIsEditModal(true);
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => {
        return <p>{title}</p>;
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: '12%',
      render: (text, record) => <p>{text}</p>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => {
        return <p>{title}</p>;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
    },
  ];

  const extraButton = [
    <Button
      key="btn-complete"
      type="primary"
      onClick={() => {
        setCurrentRow(undefined);
        setIsEditModal(true);
      }}
    >
      {'Tạo mới'}
      <PlusOutlined />
    </Button>,
  ];

  const routes = [
    {
      path: 'dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'customers',
      breadcrumbName: 'customer',
    },
  ];
  console.log(customerList);

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Danh sách khách hàng"
        extra={extraButton}
        breadcrumb={{ routes }}
        className="customPageHeader"
      />
      <Layout.Content>
        <Card size="small" className="cardSearch">
          <Form
            form={form}
            layout="horizontal"
            className="customFormSearch"
            onFinish={(value) => {
              const cleanValue = pickBy(
                value,
                (v) => v !== undefined && v !== ''
              );
              setParams({
                ...cleanValue,
                // "page-number": 1,
                // "page-size": params["page-size"]
              });
            }}
          >
            <Row gutter={16}>
              <Col xxl={{ span: 6 }} md={8} sm={12} xs={24}>
                <Form.Item name="search-value">
                  <Input placeholder="keyword" allowClear={true} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    ghost
                    icon={<SearchOutlined />}
                    htmlType="submit"
                  >
                    {'Tìm kiếm'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <TableCustom
          title={() => (
            <Row>
              <Col span={12}>
                <h3> {'Danh sách khách hàng'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={customerList}
          onChange={(pagination, filters, sorter) => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (pagination.pageSize !== params.limit) {
              params.page = 1;
            } else {
              params.page = pagination.current;
            }
            params.limit = pagination.pageSize;
            setParams({ ...params });
          }}
          pagination={{
            total: totalItem,
            showSizeChanger: true,
            pageSize: params.limit,
            current: params.page,
          }}
          scroll={{ x: 1200 }}
        />
        <CustomerEdit
          currentRow={currentRow}
          onCallback={(value) => {
            setParams({ ...defaultPage });
            setIsEditModal(false);
          }}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
        />
      </Layout.Content>
    </Layout>
  );
};

export default ManageCustomerList;