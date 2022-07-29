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
  Row,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { pickBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { defaultPage } from 'util/constant';
// import DepaEdit from "./department.edit";
import { getSliderList, updateSlider } from './slider.service';
import ProductEdit from './slider.edit';
import TableCustom from 'components/CustomTable';
import SliderEdit from './slider.edit';
import axiosClient from 'util/axiosClient';
// const defaultSort = {
// 	"is-ascending": "true",
// 	"order-by": "Id",
// };
const ManageSliderList = () => {
  const [sliderList, setSliderList] = useState([]);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  // const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchSliderList = (params, sortedInfo) => {
    setLoading(true);
    getSliderList({ ...params })
      .then((result) => {
        console.log(result);
        setSliderList([...result?.sliders]);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    fetchSliderList(params);
  }, [params]);

  const columns = [
    //sliders' id, title, image, backlink, status
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: '15%',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (title, record) => {
        return <p>{title}</p>;
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '12%',
      render: (image, _) => {
        return (
          <Image
            style={{ cursor: 'pointer' }}
            src={image?.img}
            width={100}
            alt="img"
          />
        );
      },
    },
    {
      title: 'Backlink',
      dataIndex: 'backlink',
      key: 'backlink',
      width: '12%',
      render: (text, record) => {
        return (
          <Typography.Link target="_blank" href={text}>
            Click here
          </Typography.Link>
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
              <span>Bạn có muốn thay đổi trạng thái slider này không ?</span>
            </div>
          }
          onConfirm={async (value) => {
            await updateSlider({ id: record._id, status: !text });
            fetchSliderList(params);
          }}
          okText={'Có'}
          cancelText={'Không'}
        >
          <Switch checked={text}></Switch>
        </Popconfirm>
      ),
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
            onClick={() => {
              setCurrentRow(record);
              setIsEditModal(true);
            }}
          />
        </div>
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
      path: 'sliders',
      breadcrumbName: 'slider',
    },
  ];
  console.log(sliderList);

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Danh sách sliders"
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
              const searchVal = form.getFieldValue('search-value');
              if (!searchVal || !searchVal.trim()) return fetchSliderList();

              const sliderSearch = await axiosClient.post(
                '/sliders/marketing/search',
                {
                  search: form.getFieldValue('search-value'),
                  limit: 100,
                }
              );
              setSliderList(sliderSearch);
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
                <h3> {'Danh sách sliders'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={sliderList}
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
        <SliderEdit
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

export default ManageSliderList;
