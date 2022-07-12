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
import { getOrderList } from './order.service';
import ProductEdit from './order.edit';
import TableCustom from 'components/CustomTable';
import axiosClient from 'util/axiosClient';
import { DateFormat, MoneyFormat } from 'components/format';
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
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    fetchOrderList(params);
  }, [params]);

  const columns = [
    //id, ordered date, customer name, product (first product name & number of other products if any), total cost, status
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
              const orderUpdate = await axiosClient.get(
                `/orders/saler/${text}`
              );
              console.log(orderUpdate);
              setCurrentRow(orderUpdate);
              setIsEditModal(true);
            }}
          >
            {text}
          </Button>
        );
      },
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '12%',
      render: (text, record) => {
        return <DateFormat>{text}</DateFormat>;
      },
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'receiverName',
      key: 'receiverName',
      width: '12%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'items',
      // key: 'items',
      ellipsis: {
        showTitle: false,
      },
      render: (items, record) => {
        return <p>{items[0]?.title}</p>;
      },
    },
    {
      title: 'số lượng sản phẩm',
      dataIndex: 'items',
      // key: 'items',
      width: '12%',
      render: (items, record) => {
        return <p>{items?.length}</p>;
      },
    },
    {
      title: 'Chi phí',
      dataIndex: 'totalCost',
      key: 'totalCost',
      width: '12%',
      render: (text, record) => {
        return <MoneyFormat>{text}</MoneyFormat>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
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
