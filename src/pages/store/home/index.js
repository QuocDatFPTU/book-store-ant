import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Image,
  Layout,
  Menu,
  Rate,
  Row,
  Typography,
  Input,
  Dropdown,
  Space,
  Badge,
  Avatar,
  Affix,
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from 'assets/logo-new.png';
import paymentImg from 'assets/footer-payment.png';
import socialtImg from 'assets/footer-social.png';
import appImg from 'assets/footer-app.png';
import './styles.less';
import {
  AntDesignOutlined,
  AppstoreAddOutlined,
  DownOutlined,
  FireOutlined,
  LogoutOutlined,
  SaveOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import FooterContainer from 'layouts/store/footer';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import HeaderContainer from 'layouts/store/header';
import StoreLayoutContainer from 'layouts/store/store.layout';
const { Header, Content, Footer } = Layout;

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const menu = (
  <Menu
    className="header-custom-menu"
    theme="dark"
    style={{ width: 200 }}
    items={[
      {
        key: '1',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Văn học
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Ngoại ngữ
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Anime
          </a>
        ),
      },
      {
        key: '4',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Manga
          </a>
        ),
      },
    ]}
  />
);
const menuUser = (
  <Menu
    className="header-custom-menu"
    theme="dark"
    style={{ width: 200 }}
    items={[
      {
        icon: <UserOutlined />,
        key: '1',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Nguyễn Hoàng Anh
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            Đơn hàng của tôi
          </a>
        ),
        icon: <SaveOutlined />,
      },
      {
        key: '3',
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            Thoát tài khoản
          </a>
        ),
        icon: <LogoutOutlined />,
      },
    ]}
  />
);

const HomePage = () => {
  const onSearch = (value) => console.log(value);

  return (
    <StoreLayoutContainer>
      <WrapperConentContainer className="home-sliders">
        <Row style={{ height: '100%' }}>
          <Col className="slider-main" span={16}>
            <Carousel style={{ width: '98.5%' }} autoplay>
              {[
                'https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2022/1980_1920.png',
                'https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/DoChoi/Thang5/Trang_Thi_u_nhi_1.1_1920x700.jpg',
                'https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2022/FAHASA_fs_1920x400.png',
              ].map((img) => (
                <a
                  style={{ borderRadius: '10px', display: 'block' }}
                  href="https://www.fahasa.com/1980-books?fhs_campaign=homepageslider3"
                >
                  <Image
                    preview={false}
                    style={{ borderRadius: '10px' }}
                    height={'35vh'}
                    src={img}
                  />
                </a>
              ))}
            </Carousel>
          </Col>
          <Col className="slider-sides" span={8}>
            <Row style={{ height: '100%' }} gutter={[0, 10]}>
              <Col className="slider-side" span={24}>
                <a href="https://www.fahasa.com/1980-books?fhs_campaign=homepageslider3">
                  <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-05-2022/Mega_saleldp062022_1920x400.jpg" />
                </a>
              </Col>
              <Col className="slider-side slider-side-bottom" span={24}>
                <a href="https://www.fahasa.com/1980-books?fhs_campaign=homepageslider3">
                  <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2022/shopeepay_1920x400.png" />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </WrapperConentContainer>
      <Row className="home-posts">
        <Col span={16} offset={4}>
          <a href="https://gvn360.com/tin-game/ark-va-capcom-arcade-stadium-dang-mien-phi-cung-nhieu-game-khac-giam-gia-sap-san-tren-steam/">
            <div
              className="post-lasted"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #23252627, #41434525), url(https://gstatic.gvn360.com/2022/06/ARK-Survival-Evolved-Update-2.64-Featured-Image-1068x580.jpg)',
              }}
            >
              <div className="post-content">
                <Typography.Title level={3} className="post-title">
                  Mời bạn khám phá “tranh vô cực”, nơi tiềm thức bị dẫn dụ bởi
                  thị giác
                </Typography.Title>
                <Typography.Text className="post-info">
                  Bởi <a href="#">Axium Fox</a> - 14/06/2022
                </Typography.Text>
              </div>
            </div>
          </a>
        </Col>
      </Row>
      <Row className="home-posts-feature">
        <Col span={16} offset={4}>
          <Row justify="space-between" style={{ height: '100%' }}>
            {[
              {
                title:
                  'Sếp lớn Microsoft từ chức vì bị cáo buộc xem “phim heo VR” khi đang làm việc và cả quay tay',
                date: '14/06/2022',
                author: 'Hoàng Anh',
                imgLink:
                  'https://gstatic.gvn360.com/2022/06/61fb127c75a1f5001890a621.jpg',
              },
              {
                title:
                  'Tiếng chuông gọi người tình trở về – Ngân lên trong vô vọng!',
                date: '11/06/2022',
                author: 'Hải Yến',
                imgLink:
                  'https://reviewsach.net/wp-content/uploads/2022/05/reviewsachonly-Tieng-chuong-goi-nguoi-tinh-tro-ve.jpg',
              },
              {
                title:
                  'Cho tôi xin một vé về tuổi thơ – tấm vé dành cho sự trưởng thành',
                date: '22/06/2022',
                author: 'Asu',
                imgLink:
                  'https://reviewsach.net/wp-content/uploads/2022/03/review-sach-cho-toi-xin-mot-ve-tuoi-tho.jpeg',
              },
              {
                title:
                  'Tình khờ – Khi cái đẹp đồng hóa cùng quỷ dữ (Tanizaki Junichiro)',
                date: '30/06/2022',
                author: 'Lê Đức',
                imgLink:
                  'https://reviewsach.net/wp-content/uploads/2022/03/review-sach-tinh-kho-by-reviewsachl.net_.jpeg',
              },
            ].map((item) => (
              <Col flex={'24.5%'}>
                <a href="https://gvn360.com/tin-game/ark-va-capcom-arcade-stadium-dang-mien-phi-cung-nhieu-game-khac-giam-gia-sap-san-tren-steam/">
                  <div
                    className="post-lasted"
                    style={{
                      backgroundImage: `linear-gradient(to right, #23252627, #41434525), url(${item.imgLink})`,
                    }}
                  >
                    <div className="post-content post-feature">
                      <Typography.Paragraph
                        ellipsis={{
                          rows: 2,
                          // expandable: true,
                        }}
                        className="post-title-feature"
                      >
                        {item.title}
                      </Typography.Paragraph>
                      <Typography.Text className="post-info post-info-feature">
                        Bởi <a href="#">{item.author}</a> - {item.date}
                      </Typography.Text>
                    </div>
                  </div>
                </a>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <WrapperConentContainer className="home-categories">
        <h2
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '22px',
          }}
        >
          <AntDesignOutlined
            style={{
              fontSize: '32px',
              marginRight: '5px',
              color: '#3f6600',
            }}
          />
          Danh mục sản phẩm
        </h2>
        <Divider style={{ margin: '18px 0' }} />
        <Row justify="space-evenly">
          {[
            {
              name: 'Sách tham khảo',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/9/7/9786043519112.jpg',
            },
            {
              name: 'Sách học ngoại ngữ',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/z/3/z3097453775918_7ea22457f168a4de92d0ba8178a2257b.jpg',
            },
            {
              name: 'Văn học',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/b/i/bia_tudientiengem-_1_.jpg',
            },
            {
              name: 'Thiếu nhi',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/c/o/cover_lhmn20.jpg',
            },
            {
              name: 'Tâm lý kỹ năng',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_18448.jpg',
            },
            {
              name: 'Kinh tế',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/i/m/image_180164_1_43_1_57_1_4_1_2_1_210_1_29_1_98_1_25_1_21_1_5_1_3_1_18_1_18_1_45_1_26_1_32_1_14_1_2354.jpg',
            },
            {
              name: 'Sách giáo khoa',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/3/3/3300000015408.jpg',
            },
            {
              name: 'Foreigns Books',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/i/m/img_7523.jpg',
            },
            {
              name: 'Văn phòng phẩm',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/i/m/img-8376.jpg',
            },
            {
              name: 'Đồ chơi',
              imgLink:
                'https://cdn0.fahasa.com/media/catalog/product/7/c/7cq1640081325_3.jpg',
            },
          ].map((cateItem) => (
            <Col span={2}>
              <a href="https://www.fahasa.com/sach-trong-nuoc/thieu-nhi.html?order=num_orders&limit=24&p=1">
                <Card
                  className="custom-card"
                  hoverable={false}
                  bordered={false}
                  cover={
                    <img
                      style={{
                        width: '70%',
                        height: '110px',
                        objectFit: 'cover',
                        margin: '0 auto',
                      }}
                      alt="example"
                      src={cateItem.imgLink}
                    />
                  }
                >
                  <a>{cateItem.name}</a>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </WrapperConentContainer>
      <WrapperConentContainer className=""></WrapperConentContainer>

      <Row className="home-products-featured">
        <Col className="products-content" span={16} offset={4}>
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
            Xu hướng mua sắm
          </h2>
          <Divider style={{ margin: '18px 0' }} />
          <Row justify="space-evenly">
            {[
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
            ].map((item) => (
              <Col flex={'19%'} style={{ marginBottom: '30px' }}>
                <Card
                  className="product-card"
                  hoverable={false}
                  bordered={false}
                  cover={
                    <img
                      style={{
                        width: '100%',
                        height: '190px',
                        // objectFit: 'cover',
                        margin: '0 auto',
                      }}
                      alt="example"
                      src={item.imgLink}
                    />
                  }
                >
                  <Typography.Paragraph
                    className="product-title"
                    ellipsis={{
                      rows: 2,
                      // expandable: true,
                    }}
                  >
                    <a href="">{item.name}</a>
                  </Typography.Paragraph>
                  <Typography.Text className="product-price">
                    {item.price}đ
                  </Typography.Text>
                  <Rate className="product-rate" value={item.rate} />
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col style={{ textAlign: 'center' }} span={24}>
              <Button danger>Xem thêm</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </StoreLayoutContainer>
  );
};

export default HomePage;
