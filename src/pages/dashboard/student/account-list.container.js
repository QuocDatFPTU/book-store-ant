import {
  BorderlessTableOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ManOutlined,
  PlusOutlined,
  SearchOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import {
  Avatar,
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
} from 'antd';
import TableCustom from 'components/CustomTable';
import { pickBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from 'util/axiosClient';
import {
  defaultPage,
  formatDate,
  formatDateTime,
  formatDateTimeFull,
} from '../../../util/constant';
import AccountEdit from './account.edit';
import { getRoleList, getUserList, updateUser } from './student.service';

const defaultSort = {
  'is-ascending': 'true',
  'order-by': 'Id',
};
const AccountList = () => {
  const navigate = useNavigate();
  const [uniList, setUniList] = useState([]);
  const [loading, setLoading] = useState(false);
  // Pagination
  const [roleList, setRoleList] = useState([]);
  const [currentRow, setCurrentRow] = useState(); // Pagination
  const [params, setParams] = useState({ ...defaultPage });
  const [totalItem, setTotalItem] = useState();
  const [isEditModal, setIsEditModal] = useState(false);
  const [sortedInfo] = useState(defaultSort);
  const [form] = Form.useForm();

  const fetchUserList = (params, sortedInfo) => {
    setLoading(true);
    getUserList({ ...params })
      .then((result) => {
        setUniList([...result?.users]);
        console.log(result.count);
        setTotalItem(result?.count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const fetchRoleList = (params) => {
    getRoleList({ ...params })
      .then((result) => {
        result = result.filter(({ name }) => name !== 'guest');
        setRoleList([...result]);
        // setTotalItem(result.data["total-count"]);
      })
      .catch((e) => {
        return false;
      });
  };

  useEffect(() => {
    fetchUserList(params);
  }, [params]);

  useEffect(() => {
    fetchRoleList(params);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      width: '12%',
      ellipsis: true,
      sorter: (a, b) => a._id.length - b._id.length,
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      width: '12%',
      ellipsis: true,
      sorter: (a, b) => a.fullName.length - b.fullName.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '12%',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: '12%',
      filters: [
        { text: 'Male', value: 'M' },
        { text: 'Female', value: 'F' },
        { text: 'Other', value: 'D' },
      ],
      onFilter: (value, record) => record.gender === value,

      render: (text, record) => {
        switch (text) {
          case 'M':
            return <ManOutlined />;
          case 'F':
            return <WomanOutlined />;
          case 'D':
            return <BorderlessTableOutlined />;
          default:
            <p>{text}</p>;
        }
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: '12%',
      key: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: 'Role ',
      dataIndex: 'role',
      width: '12%',
      filters: [
        { text: 'customer', value: 'customer' },
        { text: 'admin', value: 'admin' },
        { text: 'marketing', value: 'marketing' },
        { text: 'saler', value: 'saler' },
        { text: 'saleManager', value: 'saleManager' },
      ],
      onFilter: (text, record) => record?.role?.name === text,
      render: (text) => text?.name,
      sorter: (a, b) => a?.role?.name?.length - b?.role?.name?.length,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '12%',
      align: 'center',
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
              <span>Bạn có muốn đổi trạng thái account này không ?</span>
            </div>
          }
          onConfirm={async (value) => {
            await updateUser({ id: record._id, status: !text });
            fetchUserList(params);
          }}
          okText={'Có'}
          cancelText={'Không'}
        >
          <Switch checked={text}></Switch>
        </Popconfirm>
      ),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '12%',
      render: (text, record) => {
        if (record.avatar) {
          return (
            <Image
              style={{ cursor: 'pointer' }}
              src={record?.avatar?.img}
              width={100}
              alt="img"
            />
          );
        } else return <Avatar src="https://joeschmoe.io/api/v1/random" />;
      },
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
      {'Create'}
      <PlusOutlined />
    </Button>,
  ];

  const routes = [
    {
      path: '/dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '/user',
      breadcrumbName: 'user',
    },
  ];

  return (
    <Layout className="layoutContent">
      <PageHeader
        ghost={false}
        title="Account"
        extra={extraButton}
        breadcrumb={routes}
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
                return fetchUserList();

              const sliderSearch = await axiosClient.post(
                '/user/admin/search',
                {
                  search: form.getFieldValue('search-value'),
                  limit: 100,
                }
              );
              setUniList(sliderSearch);
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
                <h3> {'Danh sách người dùng'}</h3>
              </Col>
            </Row>
          )}
          rowKey="id"
          loading={loading}
          bordered
          columns={columns}
          dataSource={uniList}
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
        <AccountEdit
          currentRow={currentRow}
          onCallback={(value) => {
            setParams({ ...defaultPage });
            setIsEditModal(false);
          }}
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
          roleList={roleList}
        />
      </Layout.Content>
    </Layout>
  );
};

export default AccountList;
