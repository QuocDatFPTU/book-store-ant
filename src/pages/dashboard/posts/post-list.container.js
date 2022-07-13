import {
  DeleteOutlined,
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
  Row,
  Switch,
  Tooltip,
} from 'antd';
import { pickBy } from 'lodash';
import { useEffect, useState } from 'react';

import { defaultPage } from 'util/constant';
// import DepaEdit from "./department.edit";
import TableCustom from 'components/CustomTable';
import PostEdit from './post.edit';
import { getCategoryList, getPostList, getProductList } from './post.service';
import { async } from '@firebase/util';
// const defaultSort = {
// 	"is-ascending": "true",
// 	"order-by": "Id",
// };
const ManagePostList = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  const [blogList, setBlogList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchBlogList = (params, sortedInfo) => {
    setLoading(true);
    getPostList({ ...params })
      .then((result) => {
        setBlogList([...result.posts]);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };
  const fetchCategoryList = (params) => {
    getCategoryList({ ...params })
      .then((result) => {
        setCategoryList([...result]);
        // setTotalItem(result.data["total-count"]);
      })
      .catch((e) => {
        return false;
      });
  };
  useEffect(() => {
    fetchBlogList(params);
  }, [params]);

  useEffect(() => {
    fetchCategoryList(params);
  }, []);

  useEffect(() => {
    fetchCategoryList(params);
  }, []);

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      ellipsis: {
        showTitle: false,
      },
      render: (text, record) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <Button
              size="small"
              type="link"
              onClick={() => {
                setCurrentRow(record);
                setIsEditModal(true);
              }}
            >
              {text}
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      width: '12%',
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: 'Brief',
      dataIndex: 'brief',
      key: 'brief',
      width: '12%',
      ellipsis: true,
      // render: (text, _) => <img src={text} width={100} alt="img" />,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
      width: '12%',
      sorter: (a, b) => a.category?.name.length - b.category?.name.length,
      render: (_, value) => value?.category?.name || 'Không có dữ liệu',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      align: 'center',
      sorter: (a, b) => a.status - b.status,
      render: (text, _) => (
        <Popconfirm
          title={
            <div>
              <span>Bạn có muốn ẩn blog này không ?</span>
            </div>
          }
          onConfirm={async (value) => {
            console.log(value);
          }}
          icon={<ExclamationCircleOutlined />}
          okText={'Có'}
          cancelText={'Không'}
        >
          <Switch checked={text}></Switch>
        </Popconfirm>
      ),
    },
    {
      title: 'Nổi bật',
      dataIndex: 'featured',
      key: 'featured',
      align: 'center',
      width: '12%',
      sorter: (a, b) => a.feartured - b.feartured,
      render: (text, _) => {
        return (
          <Popconfirm
            title={
              <div>
                <span>Bạn có muốn chuyển trạng thái blog này không ?</span>
              </div>
            }
            onConfirm={async () => {
              console.log('value');
            }}
            icon={<ExclamationCircleOutlined />}
            okText={'Có'}
            cancelText={'Không'}
          >
            <Switch checked={text}></Switch>
          </Popconfirm>
        );
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '12%',
      render: (text, _) => (
        <Image style={{ cursor: 'pointer' }} src={text} width={100} alt="img" />
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      dataIndex: 'action',
      width: '12%',
      align: 'center',
      render: (_, value) => (
        <Popconfirm
          title={'Bạn có muốn xóa blog này không'}
          okText={'Có'}
          cancelText={'Không'}
          onConfirm={async () => {
            console.log('oke');
          }}
          icon={<ExclamationCircleOutlined />}
        >
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            style={{ borderRadius: '6px' }}
          />
        </Popconfirm>
      ),
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
      path: 'posts',
      breadcrumbName: 'posts',
    },
  ];

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Danh sách post"
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
                    {'Search'}
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
                <h3> {'Danh sách blog'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={blogList}
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
        <PostEdit
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

export default ManagePostList;
