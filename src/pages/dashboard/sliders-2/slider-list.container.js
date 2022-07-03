import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  message,
  PageHeader,
  Row,
  Typography,
} from 'antd';
import TableCustom from 'components/CustomTable';
import React, { useEffect, useState } from 'react';
import { defaultPage } from 'util/constant';
import { getSliderList } from './slider.service';

const ManageSliderList2 = () => {
  const [form] = Form.useForm();
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ ...defaultPage });
  const [total, setTotal] = useState(0);

  //Method service
  const fetchSliderList = () => {
    setLoading(true);
    getSliderList(params)
      .then((res) => {
        setLoading(false);
        setSliderList(res.sliders);
        console.log(res.sliders);
        setTotal(res.count);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        message.error(error.response?.data?.error);
      });
  };

  //Method component
  //   useEffect(() => {
  //     fetchSliderList();
  //   }, []);
  useEffect(() => {
    fetchSliderList();
  }, [params]);

  //Set Table
  const routes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/',
      breadcrumbName: 'Sliders',
    },
  ];
  const btnAdd = (
    <Button type="primary">
      Tạo mới <PlusOutlined />
    </Button>
  );
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: '15%',
      ellipsis: {
        showTitle: false,
      },
      render: (_id, _) => (
        <Button type="link" onClick={() => onEdit(_id)}>
          {_id}
        </Button>
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Backlink',
      dataIndex: 'backlink',
      key: 'backlink',
      width: '10%',
      render: (backlink, _) => (
        <Typography.Link target="_blank" href={backlink}>
          Click here
        </Typography.Link>
      ),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '10%',
      render: ({ img }, _) => <img src={img} width={100} alt="img" />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
    },
  ];
  const onChangeTable = (pagination, filters, sorter) => {
    console.log(pagination);
    //Set params
    params.page = pagination.pageSize === params.limit ? pagination.current : 1;
    params.limit = pagination.pageSize;
    setParams({ ...params });
  };
  const onEdit = () => {};

  console.log(params);
  return (
    <Layout>
      <PageHeader
        breadcrumb={{ routes }}
        title="Danh sách sliders"
        extra={btnAdd}
        style={{ backgroundColor: 'white' }}
      ></PageHeader>
      <Layout.Content style={{ padding: '20px' }}>
        <Card>
          <Form form={form}>
            <Row>
              <Col span={6} style={{ marginRight: '10px' }}>
                <Form.Item name="searchTxt">
                  <Input placeholder="keyword" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    ghost
                    htmlType="submit"
                  >
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <TableCustom
          style={{ marginTop: '20px' }}
          title={() => (
            <Row>
              <Col span={12}>
                <h3>Slider List</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          bordered
          loading={loading}
          scroll={{ x: 1200 }}
          //--------------------Data
          columns={columns}
          dataSource={sliderList}
          onChange={onChangeTable}
          //--------------------Paging
          hideOnSinglePage
          pagination={{
            total: total,
            pageSize: params.limit,
            current: params.page,
            showSizeChanger: true,
          }}
        />
      </Layout.Content>
    </Layout>
  );
};

export default ManageSliderList2;
