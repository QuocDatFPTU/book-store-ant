/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
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
  Switch,
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

import React from 'react';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { createSlider } from './slider.service';

const SliderEdit = ({ isEditSlider, currentRow }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [fileList, setFileList] = useState([]);
  const [defaultFileList, setDefaultFileList] = useState([]);
  const { TextArea } = Input;
  const { Option } = Select;

  //Handle Image Updload
  const getDefaultFileList = (record) => {
    return [
      {
        uid: uuidv4(),
        name: 'image',
        url: record,
      },
    ];
  };
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

  //Handle Form
  const onCancel = () => {
    setIsEditModal(false);
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      // create
      console.log('file', values?.thumbnail);

      if (!currentRow) {
        //Images
        const imageUrl = await uploadFileToFirebase(
          values?.thumbnail[0]?.originFileObj
        );

        //Create object slider data
        const createData = {
          ...values,
          image: { img: imageUrl },
        };

        //Call api to create slider
        await createSlider(createData)
          .then((result) => {
            if (result) {
              message.success('Thêm mới slider thành công!');
            }
          })
          .catch((error) => message.error(error.message));
        setLoading(false);
        onCallback();
      }
    } catch (error) {
      console.log('errorTong', error);
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  return (
    <Modal visible={true} title={'Cập nhật slider'}>
      <Form form={form} layout="vertical">
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[
              {
                required: true,
                message: 'Cần nhập tên sản phẩm!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="BackLink"
            name="backlink"
            rules={[
              {
                required: true,
                message: 'Cần nhập backlink!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Trạng thái" name="status">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Ghi chú"
            name="notes"
            rules={[
              {
                required: true,
                message: 'Cần nhập ghi chú',
              },
            ]}
          >
            <TextArea showCount maxLength={256} />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            name="image"
            label={'Hình ảnh'}
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
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button
            type="clear"
            onClick={onCancel}
            style={{ fontWeight: 'bold' }}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={onFinish}
            style={{ fontWeight: 'bold' }}
          >
            Lưu lại
          </Button>
        </Col>
      </Form>
    </Modal>
  );
};

export default SliderEdit;
