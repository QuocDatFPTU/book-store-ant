import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
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
import TableCustom from 'components/CustomTable';
import { useForm } from 'antd/lib/form/Form';
import { getSliderList } from './slider.service';

const ManageSliderList = () => {
  const [form] = Form.useForm();
  const [params, setParams] = useState({ ...defaultPage });
  const [test, setTest] = useState({ ...defaultPage });
  const [loading, setLoading] = useState(false);
  const [sliderList, setSliderList] = useState([]);
  const [totalItem, setTotalItem] = useState(0);

  const fetchSliderList = (params) => {
    setLoading(true);
    getSliderList({ ...params })
      .then((result) => {
        console.log(result);
        setSliderList([...result?.sliders]);
        setTotalItem(result.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  useEffect(() => {
    fetchSliderList(params);
  }, []);

  const extraButton = [
    <Button
      key="btn-complete"
      type="primary"
      onClick={() => {
        // setCurrentRow(undefined);
        // setIsEditModal(true);
      }}
    >
      Tạo mới
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

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: '10%',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
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
                // setCurrentRow(record);
                // setIsEditModal(true);
              }}
            >
              {text}
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      width: '12%',
      render: (image, _) => <img src={image.img} width={100} alt="img" />,
    },
    {
      title: 'BackLink',
      dataIndex: 'backlink',
      key: 'backlink',
      width: '50%',
      render: (backlink, _) => <a href={backlink}>backlink</a>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status, _) => {
        if (status)
          return (
            <span style={{ color: 'green', fontWeight: '600' }}>TRUE</span>
          );
        else
          return <span style={{ color: 'red', fontWeight: '600' }}>FALSE</span>;
      },
    },
  ];
  console.log(totalItem);
  console.log(sliderList);

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={true}
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
            // onFinish={(value) => {
            //   const cleanValue = pickBy(
            //     value,
            //     (v) => v !== undefined && v !== '' && v.trim() !== ''
            //   );
            //   console.log(cleanValue);
            //   setParams({
            //     ...cleanValue,
            //     // "page-number": 1,
            //     // "page-size": params["page-size"]
            //   });
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
                <h3>Slider List</h3>
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

            console.log(pagination, 'pagin');
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
      </Layout.Content>
    </Layout>
  );
};

export default ManageSliderList;
