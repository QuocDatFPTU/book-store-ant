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
  createDepartment,
  createProduct,
  updateDepartment,
  updateProduct,
} from './product.service';
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
const ProductEdit = ({
  currentRow,
  onCallback,
  isEditModal,
  setIsEditModal,
  categoryList,
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
        url: currentRow?.thumbnail,
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
    console.log(values);
    try {
      setLoading(true);
      // create
      if (!currentRow) {
        if (!values.thumbnail || values?.thumbnail.length === 0) {
          setLoading(false);
          return message.error('Bạn phải up thêm ảnh nữa');
        }
        const imageUrl = await uploadFileToFirebase(
          values?.thumbnail[0]?.originFileObj
        );
        if (values.status === undefined) values.status = false;
        if (values.feartured === undefined) values.feartured = false;
        const createData = {
          ...values,
          thumbnail: imageUrl,
          briefInformation: {
            ...values.briefInformation,
            publicDate:
              values?.briefInformation?.publicDate.format('YYYY-MM-DD'),
          },
        };
        await createProduct(createData)
          .then((result) => {
            if (result) {
              message.success('Thêm mới sản phẩm thành công!');
            }
            onCallback();
          })
          .catch((error) => message.error(error?.response?.data?.error));
        setLoading(false);
      }
      //Edit
      else {
        //Có up ảnh
        if (values?.thumbnail[0]?.originFileObj) {
          const updateImageUrl = await uploadFileToFirebase(
            values?.thumbnail[0]?.originFileObj
          );
          delete values.thumbnail;
          const updateData = {
            ...values,
            id: currentRow?._id,
            thumbnail: updateImageUrl,
            briefInformation: {
              ...values.briefInformation,
              publicDate:
                values?.briefInformation?.publicDate.format('YYYY-MM-DD'),
            },
          };
          await updateProduct(updateData)
            .then((result) => {
              console.log(result);
              message.success('Cập nhật sản phẩm thành công!');
              setLoading(false);
              onCallback();
            })
            .catch((error) => {
              message.error(error?.response?.data?.error);
              setLoading(false);
            });
        }
        //Không up ảnh
        else {
          delete values.thumbnail;
          const updateData = {
            ...values,
            id: currentRow?._id,
            briefInformation: {
              ...values.briefInformation,
              publicDate:
                values?.briefInformation?.publicDate.format('YYYY-MM-DD'),
            },
            thumbnail: currentRow?.thumbnail,
          };
          console.log(updateData);
          await updateProduct(updateData)
            .then((result) => {
              console.log(result);
              message.success('Cập nhật sản phẩm thành công!');
              setLoading(false);
              onCallback();
            })
            .catch((error) => {
              console.log('error2', error);
              message.error(error?.response?.data?.error);
              setLoading(false);
            });
        }
      }
    } catch (error) {
      console.log('errorTong', error);
      message.error(error.message);
      setLoading(false);
      return false;
    }
  };

  const categoryOptions = categoryList.map((data) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });

  const initalValue = {
    title: currentRow ? currentRow?.title : undefined,
    listPrice: currentRow ? currentRow?.listPrice : undefined,
    quantity: currentRow ? currentRow?.quantity : undefined,
    description: currentRow ? currentRow?.description : undefined,
    feartured: currentRow ? currentRow?.feartured : undefined,
    status: currentRow ? currentRow?.status : undefined,
    salePrice: currentRow ? currentRow?.salePrice : undefined,
    thumbnail: currentRow
      ? getDefaultFileList(currentRow?.thumbnail)
      : undefined,
    category: currentRow ? currentRow?.category._id : undefined,
    briefInformation: currentRow
      ? {
          author: currentRow?.briefInformation?.author,
          language: currentRow?.briefInformation?.language,
          pages: currentRow?.briefInformation?.pages,
          publicDate: moment(currentRow?.briefInformation?.publicDate),
          publisher: currentRow?.briefInformation?.publisher,
        }
      : undefined,
  };
  return (
    <Modal
      title={currentRow ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm'}
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
            label="Giá"
            name="listPrice"
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: 'Cần nhập giá',
              },
              {
                type: 'number',
                min: 1000,
                message: 'Giá phải lớn hơn bằng 1,000 đồng',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Giá sale"
            name="salePrice"
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: 'Cần nhập giá sale',
              },
              {
                type: 'number',
                min: 1000,
                message: 'Giá sale phải lớn hơn bằng 1,000 đồng',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log(
                    'test: ',
                    getFieldValue('listPrice'),
                    value,
                    getFieldValue('listPrice') > value
                  );
                  if (!value || getFieldValue('listPrice') > value) {
                    return Promise.resolve();
                  }
                  if (getFieldValue('listPrice') === undefined) {
                    return Promise.reject(new Error('Cần nhập giá gốc!'));
                  }
                  return Promise.reject(
                    new Error('Giá sale phải nhỏ hơn giá gốc!')
                  );
                },
              }),
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Cần nhập số lượng sản phẩm!',
              },
              {
                type: 'number',
                min: 1,
                message: 'Số lượng phải lớn hơn hoặc bằng 1',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Đặc biệt" name="feartured" valuePropName="checked">
            <Checkbox>Đặc biệt</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item label="Trạng thái" name="status" valuePropName="checked">
            <Checkbox>Trạng thái</Checkbox>
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Loại"
            name="category"
            rules={[
              {
                required: true,
                message: 'Cần chọn loại !',
              },
            ]}
          >
            <Select
              placeholder="Hãy chọn thể loại"
              options={categoryOptions}
            ></Select>
          </Form.Item>
        </Col>
        <Row gutter={[16, 0]}>
          <Col lg={{ span: 5 }}>
            <Form.Item
              label="Tác giả"
              name={['briefInformation', 'author']}
              rules={[
                {
                  required: true,
                  message: 'Cần nhập thông tin tác giả!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={{ span: 5 }}>
            <Form.Item
              label="Nhà sản xuất"
              name={['briefInformation', 'publisher']}
              rules={[
                {
                  required: true,
                  message: 'Cần nhập thông tin nhà sản xuất',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={{ span: 5 }}>
            <Form.Item
              label="Ngày sản xuất"
              name={['briefInformation', 'publicDate']}
              rules={[
                {
                  required: true,
                  message: 'Cần chọn ngày xuất bản',
                },
              ]}
            >
              <DatePicker placeholder={'Chọn ngày'} format={'DD-MM-YYYY'} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 5 }}>
            <Form.Item
              label="Ngôn ngữ"
              name={['briefInformation', 'language']}
              initialValue={`Tiếng việt`}
              rules={[
                {
                  required: true,
                  message: 'Cần chọn ngôn ngữ',
                },
              ]}
            >
              <Select>
                <Option value="Tiếng Việt">Tiếng Việt</Option>
                <Option value="Nước ngoài">Nước ngoài</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={{ span: 4 }}>
            <Form.Item
              label="Số trang"
              name={['briefInformation', 'pages']}
              rules={[
                {
                  required: true,
                  message: 'Cần nhập số trang',
                },
                {
                  type: 'number',
                  min: 1,
                  message: 'Số trang phải lớn hơn hoặc bằng 1',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: 'Cần nhập mô tả',
              },
            ]}
          >
            <TextArea showCount maxLength={256} />
          </Form.Item>
        </Col>
        <Col lg={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            name="thumbnail"
            label={'Thumbnail'}
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
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Col>
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

export default ProductEdit;
