import {
  Comment,
  Affix,
  Button,
  Card,
  Carousel,
  Checkbox,
  Col,
  Divider,
  Image,
  Layout,
  Menu,
  Rate,
  Row,
  Typography,
  Breadcrumb,
  Select,
  Pagination,
  Descriptions,
  InputNumber,
  Tooltip,
  Avatar,
  List,
} from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import logoImg from 'assets/logo-new.png';
import './styles.less';
import {
  AntDesignOutlined,
  FireOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
  PlusOutlined,
  MinusOutlined,
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  UserOutlined,
  BookOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
const { Option } = Select;
const { Header, Content, Footer } = Layout;

const ProductDetail = () => {
  const [btnExpand, setBtnExpand] = useState(true);
  const onClickNotExpand = () => {
    setBtnExpand((val) => !val);
  };

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  const plainOptions = [
    'Sách tham khảo',
    'Sách học ngoại ngữ',
    'Văn học',
    'Thiếu nhi',
    'Tâm lý kỹ năng',
    'Kinh tế',
    'Sách giáo khoa',
    'Foreigns Books',
    'Văn phòng phẩm',
    'Đồ chơi',
  ];
  const [visible, setVisible] = useState(false);
  //
  const dataProduct = {
    'Mã hàng': 'ID09543455',
    // NXB: 'NXB Trẻ',
    'Tác giả': 'Nguyễn Hoàng Anh',
    'Năm XB': '16/05/2000',
    'Số trang': '200',
    'Thể loại': 'Văn học',
    'Ngôn ngữ': 'Tiếng việt',
  };
  const data = [
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

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={logoImg} alt="logo image" />
        </div>
        <div className="header_search__form"></div>
      </Header>
      <Content style={{ marginTop: '20px' }}>
        <Row className="list-products">
          <Col span={16} offset={4} style={{ marginBottom: '10px' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="/">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/product-list">THỂ LOẠI</Breadcrumb.Item>
              <Breadcrumb.Item>
                Tôi Vẽ - Phương Pháp Tự Học Vẽ Truyện Tranh
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col span={16} offset={4}>
            <Row style={{ padding: '20px', backgroundColor: 'white' }}>
              <Col className="detail-images" span={10}>
                <Row>
                  <Col span={3}>
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
                  </Col>
                  <Col style={{ textAlign: 'center' }} span={21}>
                    <Image
                      height={'34vh'}
                      preview={false}
                      src="https://cdn0.fahasa.com/media/catalog/product/8/9/8936071672704.jpg"
                    />
                  </Col>
                </Row>
                <Row
                  justify="center"
                  style={{ marginTop: '10px', marginBottom: '10px' }}
                >
                  <button className="btn-cart">
                    <ShoppingCartOutlined style={{ fontSize: '25px' }} /> Thêm
                    vào giỏ hàng
                  </button>
                  <button className="btn-buy">Mua ngay</button>
                </Row>
              </Col>
              <Col className="detail-info" span={14}>
                <h1>Tôi Vẽ - Phương Pháp Tự Học Vẽ Truyện Tranh</h1>
                <Descriptions column={2}>
                  <Descriptions.Item span={1} label="Nhà xuất bản">
                    <div className="infor-text">NXB Trẻ</div>
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label="Tác giả">
                    <div className="infor-text">Nguyễn Hoàng Anh</div>
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label="Ngày phát hành">
                    <div className="infor-text"> 14/02/3000</div>
                  </Descriptions.Item>
                  <Descriptions.Item span={1} label="Số trang">
                    <div className="infor-text">200</div>
                  </Descriptions.Item>
                </Descriptions>
                <Rate style={{ fontSize: '15px' }} defaultValue={4} />
                <div className="detail-sale">
                  87.000 đ <span className="detail-price">100.000 đ</span>
                </div>

                <div className="detail-quantity">
                  Số lượng:
                  <InputNumber
                    style={{
                      marginLeft: '20px',
                      fontSize: '30px',
                    }}
                    controls={{
                      upIcon: <PlusOutlined style={{ fontSize: '30px' }} />,
                      downIcon: <MinusOutlined style={{ fontSize: '30px' }} />,
                    }}
                    min={1}
                    max={10}
                    defaultValue={3}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="products-same-category">
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
              Sách cùng thể loại
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
          </Col>
        </Row>
        <Row className="products-description">
          <Col className="products-content" span={16} offset={4}>
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
              {Object.entries(dataProduct).map((item, index) => (
                <Row
                  style={{ marginBottom: '10px' }}
                  className="products-description-briefs"
                >
                  <Col style={{ color: '#8c8c8c' }} span={7}>
                    {item[0]}
                  </Col>
                  <Col style={{ color: 'black' }} span={17}>
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
              “Tôi vẽ với 300 trang sách bao gồm những kỹ năng cơ bản cần có của
              một họa sĩ truyện tranh, từ tạo hình nhân vật, thiết kế bối cảnh,
              biểu cảm, các kỹ thuật diễn họa cho đến luật phối cảnh. Đây là một
              cuốn cẩm nang tuyệt vời dành cho các bạn đang bắt đầu học vẽ
              truyện tranh. Những kiến thức này có thể không giúp các bạn vẽ đẹp
              ngay lập tức nhưng sẽ là nền tảng vững chắc giúp bạn hình thành
              các tiêu chuẩn chuyên nghiệp trong nghề và không mất thời gian tự
              mò mẫm. Phần minh họa cho các bài học cũng rất hấp dẫn và sáng
              tạo. Các tác giả đã sử dụng chính nhân vật và trang truyện của
              mình để làm rõ sự liên quan giữa lý thuyết và thực tế, tính ứng
              dụng rõ ràng của các kỹ thuật và quy trình sáng tác.
              <br />
              <br />
              Trên thị trường hiện tại không thiếu những quyển sách dạy vẽ
              truyện tranh được dịch và biên tập lại từ nhiều nguồn nhưng đa số
              là kiểu sách “cầm tay chỉ việc”, không thật sữ hữu ích với các bạn
              trẻ Việt Nam – những bạn không theo học chuyên ngành mỹ thuật,
              thiếu kiến thức nền tảng về hội họa… Ngược lại, trong quyển Tôi
              vẽ, mọi phần kiến thức từ lớn đến nhỏ đều được lý giải và phân
              tích khá kỹ kèm ảnh minh họa rõ ràng, giúp người xem hiểu được gốc
              rễ vấn đề đồng thời áp dụng áp dụng vào nhiều “ngữ cảnh” khác nhau
              trong lúc sáng tác. Hệ thống kiến thức trong sách cũng được sắp
              xếp hợp lý từ thấp đến cao, xen kẽ là những trang truyện và hình
              minh họa vui nhộn làm giảm áp lực cho phần lý thuyết hơi khô cứng
              như phần phối cảnh và anatony (giải phẫu)”
              <br />
              <br />
              Phan Vũ Linh Giảng viên Trường Đại học Mỹ thuật Tp. HCM Sáng lập
              Sân Si Studio”
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
        </Row>
        <Row className="products-feedbacks">
          <Col className="products-feedback" span={16} offset={4}>
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
              header={`${data.length} replies`}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <li>
                  <Comment
                    author={
                      <Typography.Text
                        style={{ fontSize: '16px', fontWeight: 600 }}
                      >
                        {item.author}
                      </Typography.Text>
                    }
                    avatar={<Avatar size={50} icon={<UserOutlined />} />}
                    content={item.content}
                    // datetime={item.datetime}
                  />
                </li>
              )}
            />
            <Row
              style={{
                marginTop: '20px',
                marginRight: '40px',
              }}
            >
              <Col
                style={{ textAlign: 'right', marginBottom: '14px' }}
                span={24}
              >
                <Pagination
                  showSizeChanger={false}
                  defaultCurrent={6}
                  total={50}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ProductDetail;
