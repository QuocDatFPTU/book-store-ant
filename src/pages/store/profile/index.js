import {
  Button,
  Col,
  Row,
  Select,
  Avatar,
  DatePicker,
  Form,
  Input,
  message,
  Upload,
  Spin,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  HomeOutlined,
  UserOutlined,
  GoogleOutlined,
  PhoneOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {
  getUserInformation,
  getUserInformation1,
  updateUserInformation,
} from './service';
import { fakeUpload, normFile, uploadFileToFirebase, uuidv4 } from 'util/file';
import { async } from '@firebase/util';
// import './styles.less';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  // wrapperCol: {
  //   offset: 8,
  //   span: 16,
  // },
};

const validateMessages = {
  required: 'Nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ProfilePage = () => {
  const [form] = Form.useForm();

  // State
  const naviage = useNavigate();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  //Upload avatar
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserInformation1();
      const { address, email, fullName, gender, phone } = result.user;
      setFileList([
        ...[],
        {
          uid: uuidv4(),
          name: 'image',
          url: result?.user.avatar?.img,
          status: 'done',
        },
      ]);
      setProfile(result.user);
      const user = { address, email, fullName, gender, phone };
      form.setFieldsValue({ ...user });
    };
    fetchData();

    // .then((result) => {
    //   console.log('result: ', result)

    //   const { address, email, fullName, gender, phone } = result.user;
    //   setProfile(result)
    //   setFileList([
    //     ...[],
    //     {
    //       uid: uuidv4(),
    //       name: 'image',
    //       url: result?.user.avatar?.img,
    //       status: 'done',
    //     },
    //   ]);
    //   console.log(profile)
    //   const user = { address, email, fullName, gender, phone };
    //   form.setFieldsValue({ ...user });
    // })
    // .catch((error) => {

    // });

    // return () => {
    //   setDefaultFileList([]);
    // };
  }, []);

  const getDefaultFileList = (record) => {
    return [
      {
        uid: uuidv4(),
        name: 'image',
        url: record,
      },
    ];
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
  const onRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);

    setFileList(newFileList);
  };
  const handleChange = ({ fileList }) =>
    setFileList(fileList.filter((file) => file.status !== 'error'));

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(values.avatar);
      console.log(profile.avatar);
      console.log(
        !values.avatar,
        values?.avatar.length === 0,
        !values?.avatar[0]?.url
      );
      if (
        !values.avatar ||
        values?.avatar.length === 0 ||
        (!values?.avatar[0]?.url && !values?.avatar[0]?.originFileObj)
      ) {
        const { avatar, email, ...userUpdate } = values;
        await updateUserInformation(userUpdate);
        setLoading(false);
        message.success('Cập nhật thành công');
        return true;
      } else {
        const imageUrl = await uploadFileToFirebase(
          values?.avatar[0]?.originFileObj
        );
        delete values?.avatar;
        delete values?.email;
        const updateData = {
          ...values,
          avatar: {
            img: imageUrl,
            altImg: 'name',
          },
        };
        const user = await updateUserInformation(updateData);
        setLoading(false);
        message.success('Cập nhật thành công');
        return true;
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      message.error(error?.message);
    }
  };
  return (
    <>
      <Form
        size="middle"
        {...layout}
        form={form}
        name="control-hooks"
        validateMessages={validateMessages}
        onFinish={onFinish}
        initialValues={{ avatar: getDefaultFileList(profile?.avatar?.img) }}
      >
        <Col
          style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '100px',
          }}
          span={16}
          offset={4}
        >
          <h3>Thông tin chung</h3>
          <Row>
            <Col span={4} offset={2}>
              <Form.Item name="avatar" getValueFromEvent={normFile}>
                <Upload
                  accept="image/*"
                  maxCount={1}
                  className="UploadImage"
                  listType="picture-card"
                  onChange={handleChange}
                  defaultFileList={[
                    {
                      uid: uuidv4(),
                      name: 'image',
                      url: profile?.avatar?.img,
                    },
                  ]}
                  fileList={fileList}
                  beforeUpload={(file) => {
                    beforeUpload(file);
                  }}
                  showUploadList={true}
                  customRequest={fakeUpload}
                  onRemove={onRemove}
                >
                  {fileList.length > 0 ? '' : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={10}>
                  <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Họ và tên"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: 'true',
                        type: 'email',
                      },
                    ]}
                  >
                    <Input
                      disabled
                      prefix={
                        <GoogleOutlined className="site-form-item-icon" />
                      }
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="gender"
                    label="Giới tính"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select a option and change input text above"
                      allowClear
                    >
                      <Option value="M">male</Option>
                      <Option value="F">female</Option>
                      <Option value="D">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      <Spin
                        spinning={loading}
                        indicator={
                          <LoadingOutlined
                            style={{
                              //
                              color: 'white',
                              marginRight: '5px',
                            }}
                            spin
                          />
                        }
                      />
                      Cập nhật
                    </Button>
                    <Button
                      onClick={() => naviage('/change-password')}
                      style={{ marginLeft: '20px' }}
                      type="ghost"
                    >
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={12} offset={2}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                      {
                        required: 'true',
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                      {
                        required: 'true',
                      },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined className="site-form-item-icon" />}
                      placeholder="Địa chỉ"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  );
};
export default ProfilePage;
