/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Col,
  Form,
  Modal,
  Upload,
  Row,
  Input,
  Button,
  message,
  Checkbox,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';
import 'moment/locale/vi';

import {
  beforeUpload,
  fakeUpload,
  getBase64,
  normFile,
  uploadFileToFirebase,
  uuidv4,
} from 'util/file';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from 'firebase';
import moment from 'moment';
import { createUser, updateUser } from './student.service';
const AccountEdit = ({
  currentRow,
  onCallback,
  isEditModal,
  setIsEditModal,
  roleList,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [fileList, setFileList] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const { TextArea } = Input;
  const { Option } = Select;
  const getDefaultFileList = (record) => {
    return [
      {
        uid: uuidv4(),
        name: 'image',
        url: record,
      },
    ];
  };

  const roleOptions = roleList.map((data) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });
  const handleChange = ({ fileList }) =>
    setFileList(fileList.filter((file) => file.status !== 'error'));

  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [isEditModal]);

  useEffect(() => {
    setDefaultFileList([
      ...[],
      {
        uid: uuidv4(),
        name: 'image',
        url: currentRow?.avatar,
      },
    ]);
    return () => {
      setDefaultFileList([]);
    };
  }, [currentRow]);

  const onCancel = () => {
    setIsEditModal(false);
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      // create
      if (!currentRow) {
        const imageUrl = await uploadFileToFirebase(
          values?.avatar[0]?.originFileObj
        );
        const createData = {
          ...values,
          avatar: { img: imageUrl },
        };
        console.log(createData);
        await createUser(createData)
          .then((result) => {
            if (result) {
              message.success('Thêm mới người dùng thành công!');
            }
          })
          .catch((error) => message.error(error.message));
        setLoading(false);
        onCallback();
      } else {
        if (values?.avatar[0]?.originFileObj) {
          const updateImageUrl = await uploadFileToFirebase(
            values?.avatar[0]?.originFileObj
          );
          delete values.avatar;
          const updateData = {
            ...values,
            id: currentRow?._id,
            avatar: updateImageUrl,
          };

          await updateUser(updateData)
            .then((result) => {
              console.log(result);
              message.success('Cập nhật người dùng thành công!');
              setLoading(false);
              onCallback();
            })
            .catch((error) => {
              message.error(error.message);
              setLoading(false);
            });
        } else {
          delete values.avatar;
          const updateData = {
            ...values,
            id: currentRow?._id,
            avatar: currentRow?.avatar,
          };
          console.log(updateData);
          await updateUser(updateData)
            .then((result) => {
              console.log(result);
              message.success('Cập nhật sản phẩm thành công!');
              setLoading(false);
              onCallback();
            })
            .catch((error) => {
              console.log('error2', error);
              message.error(error.message);
              setLoading(false);
            });
        }
      }
    } catch (error) {
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  const initalValue = {
    fullName: currentRow ? currentRow?.fullName : undefined,
    phone: currentRow ? currentRow?.phone : undefined,
    gender: currentRow ? currentRow?.gender : undefined,
    status: currentRow ? currentRow?.status : undefined,
    email: currentRow ? currentRow?.email : undefined,
    avatar: currentRow ? getDefaultFileList(currentRow?.avatar) : undefined,
    role: currentRow ? currentRow?.role?.name : undefined,
    address: currentRow ? currentRow?.address : undefined,
  };
  return (
    <Modal
      title={currentRow ? 'Cập nhật account' : 'Tạo account'}
      visible={isEditModal}
      width={900}
      centered
      footer={null}
      forceRender={true}
      afterClose={() => {
        // console.log(defaultFileList);
        form.resetFields();
      }}
      onCancel={onCancel}
    >
      <Form
        colon={false}
        form={form}
        layout="vertical"
        requiredMark={true}
        initialValues={initalValue}
        labelWrap
        onFinish={(values) => onFinish(values)}
      >
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            name="avatar"
            label={'Avatar'}
            getValueFromEvent={normFile}
            style={{ width: '100%' }}
          >
            <Upload
              accept="image/*"
              maxCount={1}
              className="UploadImage"
              listType="picture-card"
              onChange={handleChange}
              defaultFileList={defaultFileList}
              beforeUpload={(file) => {
                beforeUpload(file);
              }}
              showUploadList={true}
              customRequest={fakeUpload}
              onRemove={onRemove}
              // fileList={fileList}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Cần nhập họ tên!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Cần nhập email!',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: 'Cần nhập địa chỉ',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Cần nhập số điện thoại!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Chọn giới tính',
              },
            ]}
          >
            <Select placeholder="Giới tính" allowClear>
              <Select.Option value="M">male</Select.Option>
              <Select.Option value="F">female</Select.Option>
              <Select.Option value="D">other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Chức vụ"
            name="role"
            rules={[
              {
                required: true,
                message: 'Cần nhập chức vụ',
              },
            ]}
          >
            <Select placeholder="Hãy chọn chức vụ" options={roleOptions} />
          </Form.Item>
        </Col>
        {!currentRow && (
          <Col lg={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Cần nhập mật khẩu',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        )}

        <div
          className="ant-modal-footer"
          style={{ marginLeft: -24, marginRight: -24, marginBottom: -24 }}
        >
          <Row gutter={24} type="flex" style={{ textAlign: 'right' }}>
            <Col
              className="gutter-row"
              span={24}
              style={{ textAlign: 'right' }}
            >
              <Button
                type="clear"
                onClick={onCancel}
                style={{ fontWeight: 'bold' }}
              >
                {'Cancel'}
              </Button>
              {loading === false ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ fontWeight: 'bold' }}
                >
                  {'Save'}
                </Button>
              ) : (
                <Button type="primary" loading style={{ fontWeight: 'bold' }}>
                  {'Loading'}
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};

export default AccountEdit;
