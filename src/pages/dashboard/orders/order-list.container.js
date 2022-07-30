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
} from 'antd';
import { pickBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { defaultPage } from 'util/constant';
// import DepaEdit from "./department.edit";
import { getOrderList, getOrderListSaleManager } from './order.service';
import ProductEdit from './order.edit';
import TableCustom from 'components/CustomTable';
import axiosClient from 'util/axiosClient';
import { DateFormat, MoneyFormat } from 'components/format';
import StatusFormat from 'components/format-status';
// const defaultSort = {
// 	"is-ascending": "true",
// 	"order-by": "Id",
// };
const ManageOrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [product, setProduct] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  // const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchOrderList = (params, sortedInfo) => {
    setLoading(true);
    getOrderList({ ...params })
      .then((result) => {
        setOrderList([...result?.orders]);
        setTotalItem(result?.count);
        console.log(result.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const fetchOrderListSaleManager = (params, sortedInfo) => {
    setLoading(true);
    getOrderListSaleManager({ ...params })
      .then((result) => {
        setOrderList([...result?.orders]);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem('__role') === 'R04') return fetchOrderList(params);
    if (localStorage.getItem('__role') === 'R05')
      return fetchOrderListSaleManager(params);
  }, [params]);

  const columns = [
    //id, ordered date, customer name, product (first product name & number of other products if any), total cost, status
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '12%',
      sorter: (a, b) => a.createdAt > b.createdAt,
      render: (text, record) => {
        return <DateFormat>{text}</DateFormat>;
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'receiverName',
      key: 'receiverName',
      width: '12%',
      sorter: (a, b) => a.receiverName.length - b.receiverName.length,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'items',
      // key: 'items',
      ellipsis: {
        showTitle: false,
      },
      render: (items, record) => {
        return <Tooltip title={items[0]?.title}>{items[0]?.title}</Tooltip>;
      },
    },
    {
      title: 'số lượng sản phẩm',
      dataIndex: 'items',
      align: 'center', // key: 'items',
      width: '12%',
      render: (items, record) => {
        return items?.length;
      },
    },
    {
      title: 'Chi phí',
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: '12%',
      sorter: (a, b) => a.totalCost - b.totalCost,
      render: (text, record) => {
        return <MoneyFormat>{text}</MoneyFormat>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      filters: [
        { text: 'submitted', value: 'submitted' },
        { text: 'cancelled', value: 'cancelled' },
        { text: 'success', value: 'success' },
      ],
      onFilter: (value, record) => value === record.status,
      sorter: (a, b) => a.status.length - b.status.length,
      render: (text, record) => <StatusFormat>{text}</StatusFormat>,
    },
    {
      title: 'Action',
      align: 'center',
      width: '8%',
      fixed: 'right',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={async () => {
              if (localStorage.getItem('__role') === 'R04') {
                const orderUpdate = await axiosClient.get(
                  `/orders/saler/${record._id}`
                );
                setCurrentRow(orderUpdate);
              }
              if (localStorage.getItem('__role') === 'R05') {
                const orderUpdate = await axiosClient.get(
                  `/orders/saleManager/getOne?orderId=${record._id}`
                );
                setCurrentRow(orderUpdate);
              }
              setIsEditModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  console.log(orderList);
  console.log(totalItem);

  const routes = [
    {
      path: 'dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'order',
      breadcrumbName: 'orders',
    },
  ];

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Danh sách đơn hàng"
        breadcrumb={{ routes }}
        className="customPageHeader"
      />
      <Layout.Content>
        <Card size="small" className="cardSearch">
          <Form
            form={form}
            layout="horizontal"
            className="customFormSearch"
            onFinish={async (value) => {
              const searchVal = form.getFieldValue('search-value');
              if (!searchVal || !searchVal.trim()) {
                if (localStorage.getItem('__role') === 'R04')
                  return fetchOrderList(params);
                if (localStorage.getItem('__role') === 'R05')
                  return fetchOrderListSaleManager(params);
              }

              if (localStorage.getItem('__role') === 'R04') {
                const sliderSearch = await axiosClient.post(
                  '/orders/saler/search',
                  {
                    search: form.getFieldValue('search-value'),
                    limit: 100,
                  }
                );
                setOrderList(sliderSearch);
              }
              if (localStorage.getItem('__role') === 'R05') {
                const sliderSearch = await axiosClient.post(
                  '/orders/saleManager/search',
                  {
                    search: form.getFieldValue('search-value'),
                    limit: 100,
                  }
                );
                setOrderList(sliderSearch);
              }
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
                <h3> {'Danh sách đơn hàng'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={orderList}
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
        <ProductEdit
          currentRow={currentRow}
          onCallback={(value) => {
            setParams({ ...defaultPage });
            setIsEditModal(false);
          }}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
          categoryList={categoryList}
        />
      </Layout.Content>
    </Layout>
  );
};

export default ManageOrderList;
