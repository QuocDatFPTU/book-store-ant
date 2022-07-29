import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  PageHeader,
  Rate,
  Row,
  Switch,
  Tooltip,
} from 'antd';
import { pickBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { defaultPage } from 'util/constant';
// import DepaEdit from "./department.edit";
import { getFeedbackList, getOrderListSaleManager } from './feedback.service';
import ProductEdit from './feedback.edit';
import TableCustom from 'components/CustomTable';
import axiosClient from 'util/axiosClient';
import { DateFormat, MoneyFormat } from 'components/format';
import StatusFormat from 'components/format-status';
// const defaultSort = {
// 	"is-ascending": "true",
// 	"order-by": "Id",
// };
const ManageFeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [product, setProduct] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  // const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchFeedbackList = (params, sortedInfo) => {
    setLoading(true);
    getFeedbackList({ ...params })
      .then((result) => {
        setFeedbackList([...result?.feedbacks]);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };



  useEffect(() => {
    fetchFeedbackList(params);
  }, [params]);

  const columns = [
    //feedbacks' contact full name, product name, rated star, status
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      key: 'receiverName',
      width: '20%',
      render: (_, record) => record?.product?.title
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'user',
      key: 'user',
      width: '12%',
      render: (_, record) => record?.user?.fullName
    },
    {
      title: 'Đánh giá',
      dataIndex: 'star',
      // key: 'items',
      width: '12%',
      render: (text) => <Rate value={text} />
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      // key: 'items',

    },
    {
      title: 'Trang thái',
      dataIndex: 'status',
      // key: 'items',
      align: 'center',
      width: '12%',
      render: (text) => {
        return <Switch checked={text} />
      }
    },
  ];

  const routes = [
    {
      path: 'dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'feedback',
      breadcrumbName: 'feedbacks',
    },
  ];

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Danh sách bình luận"
        breadcrumb={{ routes }}
        className="customPageHeader"
      />
      <Layout.Content>
        <Card size="small" className="cardSearch">
          <Form
            form={form}
            layout="horizontal"
            className="customFormSearch"
          // onFinish={async (value) => {
          //   const searchVal = form.getFieldValue('search-value');
          //   if (!searchVal || !searchVal.trim()) {
          //     if (localStorage.getItem('__role') === 'R04')
          //       return fetchOrderList(params);
          //     if (localStorage.getItem('__role') === 'R05')
          //       return fetchOrderListSaleManager(params);
          //   }

          //   if (localStorage.getItem('__role') === 'R04') {
          //     const sliderSearch = await axiosClient.post(
          //       '/orders/saler/search',
          //       {
          //         search: form.getFieldValue('search-value'),
          //         limit: 100,
          //       }
          //     );
          //     setOrderList(sliderSearch);
          //   }
          //   if (localStorage.getItem('__role') === 'R05') {
          //     const sliderSearch = await axiosClient.post(
          //       '/orders/saleManager/search',
          //       {
          //         search: form.getFieldValue('search-value'),
          //         limit: 100,
          //       }
          //     );
          //     setOrderList(sliderSearch);
          //   }
          // }}
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
                <h3> {'Danh sách bình luận'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={feedbackList}
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
        />
      </Layout.Content>
    </Layout>
  );
};

export default ManageFeedbackList;
