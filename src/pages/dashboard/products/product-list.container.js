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
import { getCategoryList, getProductList } from './product.service';
import ProductEdit from './product.edit';
import TableCustom from 'components/CustomTable';
import axiosClient from 'util/axiosClient';
// const defaultSort = {
// 	"is-ascending": "true",
// 	"order-by": "Id",
// };
const ManageProductList = () => {
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  // const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchProductList = (params, sortedInfo) => {
    setLoading(true);
    getProductList({ ...params })
      .then((result) => {
        setProductList([...result?.products]);
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
    fetchProductList(params);
  }, [params]);

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
      title: 'Giá',
      dataIndex: 'listPrice',
      key: 'listPrice',
      width: '12%',
      sorter: (a, b) => a.listPrice - b.listPrice,
    },
    {
      title: 'Giá giảm giá',
      dataIndex: 'salePrice',
      key: 'salePrice',
      width: '12%',
      sorter: (a, b) => a.salePrice - b.salePrice,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '12%',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '12%',
      render: (text, _) => <img src={text} width={100} alt="img" />,
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
      width: '12%',
      sorter: (a, b) => a.category?.name.length - b.category?.name.length,
      render: (_, value) => value?.category?.name,
    },
    {
      title: 'Đặc biệt',
      dataIndex: 'feartured',
      key: 'feartured',
      width: '12%',
      sorter: (a, b) => a.feartured - b.feartured,
      render: (text, value) => <p>{text ? 'true' : 'false'}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      sorter: (a, b) => a.status - b.status,
      render: (text, value) => <p>{text ? 'true' : 'false'}</p>,
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
      path: 'products',
      breadcrumbName: 'products',
    },
  ];

  console.log(productList);
  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Danh sách sản phẩm"
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
            onFinish={async (value) => {
              if (!form.getFieldValue('search-value').trim())
                return fetchProductList();

              const productsSearch = await axiosClient.post(
                '/products/search/marketing',
                { searchText: form.getFieldValue('search-value') }
              );
              setProductList(productsSearch);

              // setParams({
              //   ...cleanValue,
              //   "page-number": 1,
              //   "page-size": params["page-size"]
              // });
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
                <h3> {'Danh sách sản phẩm'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={productList}
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

export default ManageProductList;
