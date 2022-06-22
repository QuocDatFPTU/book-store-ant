import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Rate,
  Row,
  Typography,
  Breadcrumb,
  Select,
  Pagination,
} from 'antd';
import './styles.less';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { getCategoyList, getProductListByCategory } from './service';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { Option } = Select;

const ProductList = () => {
  // data
  const priceOptions = [
    { label: '0đ - 150.000đ', value: { min: 0, max: 150 } },
    { label: '150,000đ - 300.000đ', value: { min: 150000, max: 300000 } },
    { label: '300,000đ - 500.000đ', value: { min: 300000, max: 500000 } },
    { label: '500,000đ - 700,000đ', value: { min: 500000, max: 700000 } },
    { label: '700,000đ - Trở lên', value: { min: 700000, max: 'more' } },
  ];
  const dataListBooks = [
    {
      name: 'Sách học ngoại ngữ Sách học ngoại ngữ ',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/z/3/z3097453775918_7ea22457f168a4de92d0ba8178a2257b.jpg',
      price: '182.200',
      rate: 1,
    },
    {
      name: 'Tư Duy Nhanh Và Chậm (Tái Bản 2021)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/c/o/cover_lhmn20.jpg',
      price: '375.000',
      rate: 4,
    },
    {
      name: 'Bộ Hộp Nhật Ký Trưởng Thành Của Đứa Trẻ Ngoan (Bộ 10 Cuốn)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_18448.jpg',
      price: '200.000',
      rate: 5,
    },
    {
      name: 'Phân Tích Chứng Khoán (Security Analysis)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_180164_1_43_1_57_1_4_1_2_1_210_1_29_1_98_1_25_1_21_1_5_1_3_1_18_1_18_1_45_1_26_1_32_1_14_1_2354.jpg',
      price: '299.400',
      rate: 4,
    },
    {
      name: 'Bộ Hộp Tam Quốc Diễn Nghĩa (Bộ 3 Cuốn)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/3/3/3300000015408.jpg',
      price: '207.200',
      rate: 5,
    },
    {
      name: 'Boardgame Thỏ Tỉnh Táo',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/9/7/9784909466037_7.jpg',
      price: '90.000',
      rate: 1,
    },
    {
      name: 'Hoàng Tử Bé (Tái Bản 2019)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_187010.jpg',
      price: '63.750',
      rate: 5,
    },
    {
      name: 'Nhóc Miko! Cô Bé Nhí Nhảnh - Tập 35 - Tặng Kèm Sticker (1 Miếng 6 Hình Dán)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179108.jpg',
      price: '20.000',
      rate: 0,
    },
    {
      name: 'Trí Thông Minh Trên Giường',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/i/m/image_230339.jpg',
      price: '131.000',
      rate: 4,
    },
    {
      name: 'Văn Phòng Thám Tử Quái Vật - Tập 6',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/8/9/8934974179085_1.jpg',
      price: '30.000',
      rate: 5,
    },
    {
      name: 'Văn Phòng Thám Tử Quái Vật - Tập 4',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_05582022_085801.jpg',
      price: '40.000',
      rate: 4,
    },
    {
      name: 'Thẻ Nhân Vật Thanh Gươm Diệt Quỷ - Bandai Kimetsu no Yaiba Metallic Card (2 Thẻ Ngẫu Nhiên/Túi)',
      imgLink:
        'https://cdn0.fahasa.com/media/catalog/product/4/5/4549660725398.jpg',
      price: '134.100',
      rate: 5,
    },
  ];

  // method
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  //State
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryIdHandle, setCategoryIdHandle] = useState('');
  const { id: categoryId } = useParams();

  const onClickCategory = (e) => {
    console.log(e);
    console.log(e.target.value);
  };
  const getCategories = () => {
    getCategoyList()
      .then((result) => {
        console.log(result);
        setCategories(result);
      })
      .catch((e) => console.log(e));
  };
  const getProducts = (categoryId) => {
    getProductListByCategory(categoryId)
      .then((result) => {
        console.log(result);
        setProducts(result);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    console.log('000');
    setCategoryIdHandle(categoryId);
    getCategories();
  }, []);

  useEffect(() => {
    console.log(123);
    console.log(categoryIdHandle);
    getProducts(categoryIdHandle);
  }, [categoryIdHandle]);

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer>
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>THỂ LOẠI</Breadcrumb.Item>
        </Breadcrumb>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Row>
          <Col style={{ borderRadius: '4px' }} span={5}>
            <div className="list-options">
              <div className="option-cate">
                <h4>THỂ LOẠI</h4>
                <ul className="list-cates">
                  {categories.map((item) => (
                    <li>
                      <Button
                        onClick={() => setCategoryIdHandle(item._id)}
                        type="link"
                        block
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider style={{ margin: '10px 0' }} />
              <h4>GIÁ TIỀN</h4>
              <Checkbox.Group
                className="checkbox-custom"
                options={priceOptions}
                defaultValue={['Pear']}
                onChange={onChange}
              />
            </div>
          </Col>
          <Col style={{ backgroundColor: 'white' }} span={19}>
            <Row>
              <Col style={{ padding: '40px', paddingBottom: '20px' }} span={24}>
                Sắp xếp theo:
                <Select
                  className="select-product"
                  defaultValue="top-week"
                  style={{
                    width: 160,
                  }}
                  // onChange={handleChange}
                >
                  <Option value="top-week">Nổi bật tuần</Option>
                  <Option value="top-month">Nổi bật tháng</Option>
                  <Option value="top-year">Nổi bật năm</Option>
                  <Option value="best-week">Bán chạy tuần</Option>
                  <Option value="best-month">Bán chạy tháng</Option>
                  <Option value="best-year">Bán chạy năm</Option>
                </Select>
                <Select
                  className="select-product"
                  defaultValue="12"
                  style={{
                    width: 140,
                  }}
                  // onChange={handleChange}
                >
                  <Option value="12">12 sản phẩm</Option>
                  <Option value="24">24 sản phẩm</Option>
                  <Option value="48">48 sản phẩm</Option>
                </Select>
              </Col>
              <Divider style={{ margin: '0 14px' }} />
            </Row>
            <Row justify="space-evenly">
              {products.map((item) => (
                <Col flex={'24.8%'} style={{ marginBottom: '30px' }}>
                  <a onClick={() => navigate(`/product-detail/${item._id}`)}>
                    <Card
                      className="product-card"
                      hoverable={true}
                      bordered={false}
                      cover={
                        <img
                          style={{
                            width: '88%',
                            height: '190px',
                            // objectFit: 'cover',
                            margin: '0 auto',
                          }}
                          alt="example"
                          src={item.thumbnail}
                        />
                      }
                    >
                      <Typography.Paragraph
                        className="home-product-title"
                        ellipsis={{
                          rows: 2,
                          // expandable: true,
                        }}
                      >
                        <a href="">{item.title}</a>
                      </Typography.Paragraph>
                      <Typography.Text className="product-sale">
                        {item.salePrice}đ
                      </Typography.Text>
                      <Typography.Text className="product-price-old">
                        {item.listPrice}đ
                      </Typography.Text>
                      <Row justify="space-between">
                        <Col>
                          <Rate className="product-rate" value={item.rate} />
                          <MessageOutlined
                            style={{ marginLeft: '10px', fontSize: '18px' }}
                          />
                        </Col>
                        <Col>
                          <ShoppingCartOutlined
                            style={{
                              marginRight: '10px',
                              fontSize: '28px',
                              color: '#C92127',
                            }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                style={{ textAlign: 'center', marginBottom: '14px' }}
                span={24}
              >
                <Pagination
                  showSizeChanger={false}
                  defaultCurrent={6}
                  total={500}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </WrapperConentContainer>
    </StoreLayoutContainer>
  );
};

export default ProductList;
