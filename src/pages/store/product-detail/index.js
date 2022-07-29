import {
  Comment,
  Button,
  Card,
  Col,
  Divider,
  Image,
  Rate,
  Row,
  Typography,
  Breadcrumb,
  Pagination,
  Descriptions,
  InputNumber,
  Avatar,
  List,
  Form,
  message,
  Result,
  Spin,
  Empty,
} from 'antd';
import {
  FireOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  UserOutlined,
  BookOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import './styles.less';
import { useState } from 'react';
import parse from 'html-react-parser';
import StoreLayoutContainer from 'layouts/store/store.layout';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addProudctToCart,
  addProudctToCartGuest,
  getCategoyById,
  getFeedbackProductDetailById,
  getProductDetailById,
  getProductListFearture,
} from './service';
import axiosClient from 'util/axiosClient';
import { DateFormat, MoneyFormat } from 'components/format';

const ProductDetail = () => {


  //data
  const dataListFeedbacks = [
    {
      author: 'Nguyễn Hoàng Anh',
      // avatar:
      content: (
        <div>
          <Rate defaultValue={3} />
          <p>
            Giày nhẹ, from đẹp, đường nét khá mướt. Mua chạy thì nên mang rộng 1
            size để mũi chân ko bị đau. Sẽ ủng hộ shop tiếp tục.
          </p>
          <Image.PreviewGroup>
            {[
              'https://salt.tikicdn.com/ts/review/f7/8c/3e/212c631e9b19b0e9245f9f77808797cd.jpg',
              'https://salt.tikicdn.com/ts/review/ee/3e/4e/b680d6f3259967102b144fbd0f9343a6.jpg',
            ].map((item) => (
              <Image
                className="custom-images"
                width={120}
                height={120}
                src={item}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      ),
    },
    {
      author: 'Lê Thị Thanh Thình',
      // avatar:
      content: (
        <div>
          <Rate defaultValue={4} />
          <p>
            vì là sản phẩm đắt hơn đa số các loại giày trên thị trường nên mình
            phải khắt khe hơn. shop giao hàng đúng như đơn đặt. đế bằng xốp cực
            nhẹ đi vào cứ như không đi, giày đi rất ôm chân tạo cảm giác chắc
            chắn khi chạy. chất liệu thấm hút và rất thoáng nên những bạn mồ hôi
            chân nhiều cũng ko lo lắm. nhược điểm là độ hoàn thiện trong việc
            gắn đế, có vài chỗ bị lem ra bên ngoài. độ bền thì mình nghĩ là ổn
            áp vì dùng tay vặn xoắn thấy cũng chẳng bị sao. thực tế vẫn phải đợi
            thời gian. Chốt cho 8 điểm thôi, để họ còn cố gắng
          </p>
          <Image.PreviewGroup>
            {[
              'https://salt.tikicdn.com/ts/review/fb/4c/d7/8ac1e6e449e4c9b1d1b51ab0bf22ed02.jpg',
              'https://salt.tikicdn.com/ts/review/40/ef/2c/14f2064c12aa1aef8a0937db12bf939b.jpg',
              'https://salt.tikicdn.com/ts/review/8b/f3/48/6ddb08f4e8cd0a1a0ecd84bae1830a92.jpg',
            ].map((item) => (
              <Image
                className="custom-images"
                width={120}
                height={120}
                src={item}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      ),
    },
  ];

  //Hook
  const [form] = Form.useForm();
  const [btnExpand, setBtnExpand] = useState(true);
  const [productDetail, setProductDetail] = useState({});
  const [moreProductDetail, setMoreProductDetail] = useState({});
  const [categoryName, setCategoryName] = useState('');
  const [productFeatures, setProductFeatures] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const getFeedbackList = async () => {
    getFeedbackProductDetailById(id)
      .then((result) => {
        console.log('result', result);
        setFeedbackList(result);
      })
      .catch((error) => {
        message.error(error?.message);
      });
  };



  //Method
  const onClickNotExpand = () => {
    setBtnExpand((val) => !val);
  };
  const addToCart = async (isToCart) => {
    const cartItem = {
      quantity: form.getFieldValue('quantityNeed'),
      productId: productDetail._id,
    };
    try {
      let cart = {};

      //Guest and customer
      if (localStorage.getItem('__role') === 'R02')
        cart = await addProudctToCartGuest(cartItem);
      else cart = await addProudctToCart(cartItem);


      //Go to cart or not
      if (isToCart) navigate('/cart');
      else message.success('Thêm vào giỏ hàng thành công', 5);
    } catch (error) {
      message.error(`${error.response.data.error}`, 5);
    }
  };
  const getProductById = (productId) => {
    getProductDetailById(productId)
      .then((res) => {
        //Set product detail
        setProductDetail(res);
        const { author, publisher, publicDate, language, pages } =
          res.briefInformation;
        setMoreProductDetail({
          'Mã hàng': res._id,
          'NXB ': publisher,
          'Năm xuất bản': <DateFormat>{publicDate}</DateFormat>,
          'Tác giả': author,
          'Số trang': pages,
          language,
        });

        //Set product category
        getCategoryName(res.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoryName = (categoryId) => {
    getCategoyById(categoryId)
      .then((result) => {
        setCategoryName(result.name);
      })
      .catch((e) => console.log(e));
  };

  const getProductFeatureds = () => {
    getProductListFearture()
      .then((result) => {
        setProductFeatures(result);
      })
      .catch((e) => console.log(e));
  };

  //RUN
  useEffect(() => {
    if (!localStorage.getItem('__token') && !localStorage.getItem('__role')) {
      console.log('not have jwt store in localStorage');
      axiosClient.post('/user/guest').then((result) => {
        localStorage.setItem('__role', result.guest.role.code);
      });
    }
    form.setFieldsValue({ quantityNeed: 1 });
    getProductById(id);
  }, [id]);

  useEffect(() => {
    getProductFeatureds();
  }, []);

  useEffect(() => {
    getFeedbackList();
  }, [id])
  return productDetail.status === false ? (
    <>
      <WrapperConentContainer>
        <Result
          status="404"
          // title="404"
          subTitle="Aaaa không tìm thấy rồi á đồ ngốc này :(((("
          extra={
            <Button onClick={() => navigate(-1)} type="primary">
              {'Quay lại trang trước đi nha <3'}
            </Button>
          }
        />
      </WrapperConentContainer>
    </>
  ) : (
    <>
      <WrapperConentContainer className="proudcts-detail-link">
        <Breadcrumb>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>THỂ LOẠI</Breadcrumb.Item>
          <Breadcrumb.Item
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/product-list/${productDetail.category}`)}
          >
            {categoryName}
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productDetail.title}</Breadcrumb.Item>
        </Breadcrumb>
      </WrapperConentContainer>
      <WrapperConentContainer className="products-detail-intro">
        <Form form={form}>
          <Row style={{ padding: '20px', backgroundColor: 'white' }}>
            <Col className="detail-images" span={10}>
              <Row>
                {/* <Col span={3}>
                  <Image.PreviewGroup>
                    {[
                      'https://cdn0.fahasa.com/media/catalog/product/8/9/8936071672704.jpg',
                      'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/toi_ve___phuong_phap_tu_hoc_ve_truyen_tranh/2019_09_19_10_47_12_2-390x510.jpg',
                      'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/toi_ve___phuong_phap_tu_hoc_ve_truyen_tranh/2019_09_19_10_47_12_3-390x510.jpg',
                      'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/toi_ve___phuong_phap_tu_hoc_ve_truyen_tranh/2019_09_19_10_47_12_7-390x510.jpg',
                      'https://cdn0.fahasa.com/media/flashmagazine/images/page_images/toi_ve___phuong_phap_tu_hoc_ve_truyen_tranh/2019_09_19_10_47_12_9-390x510.jpg',
                    ].map((item) => (
                      <div className="image-preview">
                        <Image
                          style={{ cursor: 'pointer' }}
                          preview={true}
                          width="100%"
                          src={item}
                        />
                      </div>
                    ))}
                  </Image.PreviewGroup>
                </Col> */}
                <Col style={{ textAlign: 'center' }} span={21}>
                  <Image
                    height={'34vh'}
                    preview={false}
                    src={productDetail.thumbnail}
                  />
                </Col>
              </Row>
              <Row
                justify="center"
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                <Col span={12} style={{ textAlign: 'center' }}>
                  <Form.Item style={{ width: '100%', textAlign: 'center' }}>
                    <button
                      style={{ width: '80%' }}
                      className="btn-cart"
                      onClick={() => addToCart(false)}
                    >
                      <ShoppingCartOutlined style={{ fontSize: '25px' }} /> Thêm
                      vào giỏ hàng
                    </button>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ textAlign: 'center' }}>
                  <Form.Item style={{ width: '100%' }}>
                    <button
                      style={{ width: '80%' }}
                      onClick={() => addToCart(true)}
                      className="btn-buy"
                    >
                      Mua ngay
                    </button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col className="detail-info" span={14}>
              <h1>{productDetail.title}</h1>
              <Descriptions column={2}>
                <Descriptions.Item span={1} label="Nhà xuất bản">
                  <div className="infor-text">
                    {productDetail?.briefInformation?.publisher}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Tác giả">
                  <div className="infor-text">
                    {productDetail?.briefInformation?.author}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Ngày phát hành">
                  <div className="infor-text">
                    <DateFormat>
                      {productDetail?.briefInformation?.publicDate}
                    </DateFormat>
                  </div>
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Số trang">
                  <div className="infor-text">
                    {productDetail?.briefInformation?.pages}
                  </div>
                </Descriptions.Item>
              </Descriptions>
              <Rate style={{ fontSize: '15px' }} defaultValue={4} />
              <div className="detail-sale">
                <MoneyFormat>{productDetail.salePrice}</MoneyFormat>
                <span className="detail-price">
                  <MoneyFormat>{productDetail.listPrice}</MoneyFormat>
                </span>
              </div>

              <div className="detail-quantity">
                Số lượng:
                <Form.Item name="quantityNeed">
                  <InputNumber
                    onChange={(value) =>
                      form.setFieldsValue({ quantityNeed: value })
                    }
                    name="quantityNeed"
                    style={{
                      marginLeft: '20px',
                      fontSize: '30px',
                    }}
                    controls={{
                      upIcon: <PlusOutlined style={{ fontSize: '30px' }} />,
                      downIcon: <MinusOutlined style={{ fontSize: '30px' }} />,
                    }}
                    min={1}
                    max={productDetail.quantity}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </WrapperConentContainer>
      <WrapperConentContainer>
        <Col className="products-content">
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
            }}
          >
            <FireOutlined
              style={{
                fontSize: '21px',
                padding: '4px',
                marginRight: '5px',
                color: 'red',
                border: '3px solid red',
                borderRadius: '100%',
              }}
            />
            Sản phẩm đang hot
          </h2>
          <Divider style={{ margin: '18px 0' }} />
          <Row justify="space-evenly">
            {productFeatures.map((item) => (
              <Col flex={'19%'} style={{ marginBottom: '30px' }}>
                <Card
                  className="product-card"
                  hoverable={false}
                  bordered={false}
                  cover={
                    <img
                      onClick={() => navigate(`/product-detail/${item._id}`)}
                      style={{
                        cursor: 'pointer',
                        width: '100%',
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
                    <a onClick={() => navigate(`/product-detail/${item._id}`)}>
                      {item.title}
                    </a>
                  </Typography.Paragraph>
                  <Typography.Text className="product-price">
                    <MoneyFormat>{item.salePrice}</MoneyFormat>
                  </Typography.Text>
                  <Rate className="product-rate" value={5} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </WrapperConentContainer>
      <WrapperConentContainer className="products-description">
        <Col className="products-content">
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
            }}
          >
            <BookOutlined
              style={{
                fontSize: '27px',
                marginRight: '5px',
                color: '#10239e',
                borderRadius: '100%',
              }}
            />
            Thông tin sản phẩm
          </h2>
          <Row className="products-description-briefs">
            {Object.entries(moreProductDetail).map((item) => (
              <Row
                style={{ marginBottom: '10px' }}
                className="products-description-briefs"
              >
                <Col style={{ color: '#8c8c8c' }} span={5}>
                  {item[0]}
                </Col>
                <Col style={{ color: 'black' }} span={19}>
                  {item[1]}
                </Col>
              </Row>
            ))}
          </Row>
          <Divider style={{ margin: '18px 0' }} />
          <Typography.Paragraph
            className="products-description-detail"
            //false thì sẽ  expand
            //có phần tử thì sẽ không expand
            ellipsis={
              btnExpand === true
                ? {
                  rows: 3,
                }
                : false
            }
          >
            {parse(`${productDetail?.description}`)}
          </Typography.Paragraph>
          <Row justify="center">
            <Button
              onClick={onClickNotExpand}
              style={{
                width: '180px',
                border: '2px solid #389e0d',
                color: '#389e0d',
                paddingBottom: '10px',
              }}
            >
              {btnExpand ? 'Xem thêm' : 'Thu gọn'}
            </Button>
          </Row>
        </Col>
      </WrapperConentContainer>
      <WrapperConentContainer className="products-feedbacks">
        <Col className="products-feedback">
          <h2
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '22px',
            }}
          >
            <CommentOutlined
              style={{
                fontSize: '28px',
                marginRight: '5px',
                color: '#52c41a',
                borderRadius: '100%',
              }}
            />
            Thông tin sản phẩm
          </h2>
          <List
            className="comment-list"
            header={`${feedbackList.length} replies`}
            itemLayout="horizontal"
            dataSource={feedbackList ? feedbackList : dataListFeedbacks}
            locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>Chưa có feedback cho sản phẩm này</span>} /> }}
            renderItem={(item) => {
              if (feedbackList && feedbackList.length > 0) {
                return (
                  <li>
                    <Comment
                      author={
                        <Typography.Text
                          style={{ fontSize: '16px', fontWeight: 600 }}
                        >
                          {item?.user?.fullName}
                        </Typography.Text>
                      }
                      avatar={<Avatar size={50} icon={<UserOutlined />} />}
                      content={
                        <div>
                          <Rate disabled defaultValue={item.star} />
                          <p>
                            {item.content}
                          </p>
                          <Image.PreviewGroup>
                            {item?.images?.map((data) => (
                              <Image
                                className="custom-images"
                                width={120}
                                height={120}
                                src={`${data.image}`}
                              />
                            ))}
                          </Image.PreviewGroup>
                        </div>}
                    // datetime={item.datetime}
                    />
                  </li>
                )
              } else {
                return (
                  <Empty
                    description={
                      <span>
                        Chưa có feedback cho sản phẩm này
                      </span>
                    }
                  >
                    <Button type="primary">Create Now</Button>
                  </Empty>
                )
              }
            }}
          />
          {/* <Row
            style={{
              marginTop: '20px',
              marginRight: '40px',
            }}
          >
            <Col style={{ textAlign: 'right', marginBottom: '14px' }} span={24}>
              <Pagination
                showSizeChanger={false}
                defaultCurrent={6}
                total={50}
              />
            </Col>
          </Row> */}
        </Col>
      </WrapperConentContainer>
    </>
  );
};

export default ProductDetail;
