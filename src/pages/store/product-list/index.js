import {
  Button,
  Card,
  Col,
  Divider,
  Rate,
  Row,
  Typography,
  Breadcrumb,
  Select,
  Pagination,
  message,
  Result,
} from 'antd';
import './styles.less';
import {
  HomeOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import {
  addProudctToCart,
  addProudctToCartGuest,
  getCategoyList,
  getProductListByCategory,
} from './service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from 'util/axiosClient';
import { getCategoyById } from '../home/service';
import { MoneyFormat } from 'components/format';
const { Option } = Select;
// data
const priceOptions = [
  { label: '0đ - 150.000đ', value: { min: 0, max: 150 } },
  { label: '150,000đ - 300.000đ', value: { min: 150000, max: 300000 } },
  { label: '300,000đ - 500.000đ', value: { min: 300000, max: 500000 } },
  { label: '500,000đ - 700,000đ', value: { min: 500000, max: 700000 } },
  { label: '700,000đ - Trở lên', value: { min: 700000, max: 'more' } },
];

const ProductList = () => {
  //State
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);

  const { id: categoryId } = useParams();
  // const { pathname } = useLocation();

  const getCategories = () => {
    getCategoyList()
      .then((result) => {
        console.log(result);
        setCategories(result);
      })
      .catch((e) => console.log(e));
  };
  const getProducts = (categoryId, page) => {
    axiosClient
      .get(`/products/category/${categoryId}?status=true&limit=12&page=${page}`)
      .then((result) => {
        console.log(result);
        setProducts(result);
      })
      .catch((e) => console.log(e));
  };
  const getCategoryName = (categoryId) => {
    getCategoyById(categoryId)
      .then((result) => {
        setCategoryName(result.name);
      })
      .catch((e) => console.log(e));
  };
  const getNumberProductCategory = (categoryId) => {
    axiosClient
      .get(`/products/size?category=${categoryId}&status=true`)
      .then((result) => {
        console.log(result, '-------------');
        setTotalProduct(result.count);
      });
  };
  const onChangePage = (page) => {
    //Get product list again
    getProducts(categoryId, page);
  };
  const addToCart = async (productId) => {
    const cartItem = {
      quantity: 1,
      productId,
    };
    try {
      let cart = {};

      //Guest and customer
      if (localStorage.getItem('__role') === 'R02')
        cart = await addProudctToCartGuest(cartItem);
      else cart = await addProudctToCart(cartItem);

      console.log(cart);

      //Go to cart or not
      message.success('Thêm vào giỏ hàng thành công', 5);
      // navigate(`/product-list/${categoryId}`);
    } catch (error) {
      message.error(`${error.response.data.error}`, 5);
      // navigate(`/product-list/${categoryId}`);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem('__token') && !localStorage.getItem('__role')) {
      console.log('not have jwt store in localStorage');
      axiosClient.post('/user/guest').then((result) => {
        localStorage.setItem('__role', result.guest.role.code);
      });
    }

    getCategories();
    getCategoryName(categoryId);
    getNumberProductCategory(categoryId);
    getProducts(categoryId, 1);
  }, [categoryId]);

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer>
        <Breadcrumb>
          <Breadcrumb.Item>
            <HomeOutlined onClick={() => navigate('/')} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>THỂ LOẠI</Breadcrumb.Item>
          <Breadcrumb.Item>{categoryName}</Breadcrumb.Item>
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
                        onClick={() => navigate(`/product-list/${item._id}`)}
                        type="link"
                        block
                        style={
                          item._id === categoryId
                            ? { color: '#003a8c', fontWeight: '500' }
                            : {}
                        }
                        // style={{ color: 'red' }}
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider style={{ margin: '10px 0' }} />
              {/* <h4>GIÁ TIỀN</h4>
              <Checkbox.Group
                className="checkbox-custom"
                options={priceOptions}
                defaultValue={['Pear']}
                onChange={onChange}
              /> */}
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
            <Row>
              {products.map((item) => (
                <Col flex={'25%'} style={{ marginBottom: '30px' }}>
                  <Card
                    className="product-card"
                    hoverable={true}
                    bordered={false}
                    cover={
                      <a
                        style={{ textAlign: 'center' }}
                        onClick={() => navigate(`/product-detail/${item._id}`)}
                      >
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
                      </a>
                    }
                  >
                    <Typography.Paragraph
                      className="home-product-title"
                      ellipsis={{
                        rows: 2,
                        // expandable: true,
                      }}
                    >
                      <a
                        onClick={() => navigate(`/product-detail/${item._id}`)}
                      >
                        {item.title}
                      </a>
                    </Typography.Paragraph>
                    <Typography.Text className="product-sale">
                      <MoneyFormat>{item.salePrice}</MoneyFormat>
                    </Typography.Text>
                    <Typography.Text className="product-price-old">
                      <MoneyFormat>{item.listPrice}</MoneyFormat>
                    </Typography.Text>
                    <Row justify="space-between">
                      <Col>
                        <Rate className="product-rate" value={4} />
                        <MessageOutlined
                          style={{ marginLeft: '10px', fontSize: '18px' }}
                        />
                      </Col>
                      <Col>
                        <Typography.Link onClick={() => addToCart(item._id)}>
                          <ShoppingCartOutlined
                            style={{
                              zIndex: '199',
                              marginRight: '10px',
                              fontSize: '28px',
                              color: '#C92127',
                            }}
                          />
                        </Typography.Link>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
            {products.length !== 0 ? (
              <Row>
                <Col
                  style={{ textAlign: 'center', marginBottom: '14px' }}
                  span={24}
                >
                  <Pagination
                    onChange={onChangePage}
                    pageSize={12}
                    showSizeChanger={false}
                    defaultCurrent={1}
                    total={totalProduct}
                  />
                </Col>
              </Row>
            ) : (
              <Row>
                <Result
                  style={{ width: '100%' }}
                  status="404"
                  // title="404"
                  subTitle="Éo có sản phẩm nào cho m xem đâu ra chỗ khác chơi đi ???"
                />
              </Row>
            )}
          </Col>
        </Row>
      </WrapperConentContainer>
    </StoreLayoutContainer>
  );
};

export default ProductList;
