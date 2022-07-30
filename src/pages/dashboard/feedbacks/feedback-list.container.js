import {
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Layout,
  PageHeader,
  Popconfirm,
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
import {
  getFeedbackList,
  getOrderListSaleManager,
  updateFeedback,
} from './feedback.service';
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
      width: '12%',
      ellipsis: {
        showTitle: false,
      },
      sorter: (a, b) => a.product?.title.length - b.product?.title.length,
      render: (_, record) => (
        <Tooltip placement="topLeft" title={record?.product?.title}>
          <h4>{record?.product?.title}</h4>
        </Tooltip>
      ),
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'user',
      key: 'user',
      width: '12%',
      sorter: (a, b) => a.user.fullName - b.user.fullName,
      render: (_, record) => record?.user?.fullName,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '12%',
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <Tooltip placement="topLeft" title={record?.product?.title}>
          {record?.user?.email}
        </Tooltip>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: '12%',
      render: (_, record) => record?.user?.phone,
    },
    {
      title: 'Đánh giá',
      dataIndex: 'star',
      filters: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
      ],
      sorter: (a, b) => a.star - b.star,
      onFilter: (value, record) => value === record.star,
      width: '12%',
      render: (text) => <Rate value={text} />,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      // key: 'items',
    },
    {
      title: 'Ảnh bình luận',
      dataIndex: 'images',
      key: 'images',
      // width: '12%',
      render: (_, record) => {
        // console.log(record?.images[0]?.image);

        return (
          <Image.PreviewGroup>
            {record?.images?.map(({ image }) => (
              <Image width={50} src={image} />
            ))}
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      filters: [
        { text: 'true', value: true },
        { text: 'false', value: false },
      ],
      onFilter: (value, record) => value === record.status,
      sorter: (a, b) => a.status - b.status,
      render: (text, record) => (
        <Popconfirm
          icon={<ExclamationCircleOutlined />}
          title={
            <div>
              <span>Bạn có muốn thay đổi trạng thái bình luận này không?</span>
            </div>
          }
          onConfirm={async (value) => {
            await updateFeedback({ id: record._id, status: !text });
            fetchFeedbackList(params);
          }}
          okText={'Có'}
          cancelText={'Không'}
        >
          <Switch checked={text}></Switch>
        </Popconfirm>
      ),
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
            onFinish={async (value) => {
              const searchVal = form.getFieldValue('search-value');
              if (!searchVal || !searchVal.trim()) return fetchFeedbackList();

              console.log(form.getFieldValue('search-value'));
              const fbSearch = await axiosClient.post(
                '/feedbacks/marketing/search',
                {
                  search: form.getFieldValue('search-value'),
                  limit: 100,
                }
              );
              console.log('---');
              console.log(fbSearch);
              setFeedbackList(fbSearch);
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
