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
  Image,
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
  const getDefaultFileList = (record) => {
    return [
      {
        uid: uuidv4(),
        name: 'image',
        url: record,
      },
    ];
  };

  let roleOptions = roleList.map((data) => {
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
        url: currentRow?.avatar?.img,
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
        //c?? up avatar
        //Kh??ng up avatar
        let createData = {};
        console.log(values);
        console.log(!values?.avatar?.img || values?.avatar?.img?.length === 0);
        if (!values?.avatar?.img || values?.avatar?.img?.length === 0) {
          console.log('kho??ng ???nh');
          delete values.avatar;
          if (values.status === undefined) values.status = false;
          createData = {
            ...values,
          };
        } else {
          console.log('c?? ???nh');
          console.log(values);
          console.log(values?.avatar?.img[0]?.originFileObj);
          const imageUrl = await uploadFileToFirebase(
            values?.avatar?.img[0]?.originFileObj
          );
          console.log(imageUrl);
          if (values.status === undefined) values.status = false;
          createData = {
            ...values,
            avatar: { img: imageUrl },
          };
        }
        await createUser(createData)
          .then((result) => {
            if (result) {
              message.success('Th??m m???i ng?????i d??ng th??nh c??ng!');
            }
            onCallback();
          })
          .catch((error) => message.error(error?.response?.data?.error));
        setLoading(false);
      }
      // Edit
      else {
        delete values.avatar;
        console.log(values);
        const updateData = {
          ...values,
          id: currentRow?._id,
        };
        console.log(updateData);
        await updateUser(updateData)
          .then((result) => {
            console.log(result);
            message.success('C???p nh???t s???n ph???m th??nh c??ng!');
            setLoading(false);
            onCallback();
          })
          .catch((error) => {
            console.log('error2', error);
            message.error(error?.response?.data?.error);
            setLoading(false);
          });
      }
    } catch (error) {
      message.error(error?.response?.data?.error);
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
    avatar: currentRow
      ? getDefaultFileList(currentRow?.avatar?.img)
      : undefined,
    role: currentRow ? currentRow?.role?._id : undefined,
    address: currentRow ? currentRow?.address : undefined,
  };
  return (
    <Modal
      title={currentRow ? 'C???p nh???t account' : 'T???o account'}
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
        {!currentRow && (
          <>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                name={['avatar', 'img']}
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
                label="H??? t??n"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'C???n nh???p h??? t??n!',
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
                    message: 'C???n nh???p email!',
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                label="?????a ch???"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'C???n nh???p ?????a ch???',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                label="S??? ??i???n tho???i"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'C???n nh???p s??? ??i???n tho???i!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Form.Item
                label="Gi???i t??nh"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: 'Ch???n gi???i t??nh',
                  },
                ]}
              >
                <Select placeholder="Gi???i t??nh" allowClear>
                  <Select.Option value="M">male</Select.Option>
                  <Select.Option value="F">female</Select.Option>
                  <Select.Option value="D">other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </>
        )}
        {currentRow && (
          <>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col className="order-title-receiver" span={6}>
                  H??? v?? t??n
                </Col>
                <Col span={18}>{currentRow.fullName}</Col>
              </Row>
            </Col>{' '}
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col className="order-title-receiver" span={6}>
                  Email
                </Col>
                <Col span={18}>{currentRow.email}</Col>
              </Row>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col className="order-title-receiver" span={6}>
                  ?????a ch???
                </Col>
                <Col span={18}>{currentRow.address}</Col>
              </Row>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col className="order-title-receiver" span={6}>
                  S??? ??i???n tho???i
                </Col>
                <Col span={18}>{currentRow.phone}</Col>
              </Row>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col className="order-title-receiver" span={6}>
                  Gi???i t??nh
                </Col>
                <Col span={18}>{currentRow.gender}</Col>
              </Row>
            </Col>
            <Col lg={{ span: 24 }} xs={{ span: 24 }}>
              <Row>
                <Col className="order-title-receiver" span={6}>
                  Avatar
                </Col>
                <Col span={18}>
                  <Image width={'60px'} src={currentRow?.avatar?.img} />
                </Col>
              </Row>
            </Col>
          </>
        )}

        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Tr???ng th??i" name="status" valuePropName="checked">
            <Checkbox>Tr???ng th??i</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Ch???c v???"
            name="role"
            rules={[
              {
                required: true,
                message: 'C???n nh???p ch???c v???',
              },
            ]}
          >
            <Select placeholder="H??y ch???n ch???c v???" options={roleOptions} />
          </Form.Item>
        </Col>
        {!currentRow && (
          <Col lg={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              label="M???t kh???u"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'C???n nh???p m???t kh???u',
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
