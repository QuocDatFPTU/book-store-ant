import { EllipsisOutlined } from '@ant-design/icons';
import {
    Avatar,
    Card,
    Col,
    Modal, PageHeader, Row, Typography, Tag, Button, Pagination, Image, Skeleton
} from 'antd';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultPage } from 'util/constant';
import { getBlogList } from './service';
import './style.less'
const BlogList = () => {
    const { Paragraph } = Typography;
    const { Meta } = Card;
    const { CheckableTag } = Tag;
    const [loading, setLoading] = useState(false);
    const [blogList, setBlogList] = useState([]);
    const [totalItem, setTotalItem] = useState();
    const [params, setParams] = useState({ ...defaultPage });
    // state
    const navigate = useNavigate();

    const fetchBlogList = (params, sortedInfo) => {
        setLoading(true);
        getBlogList({ ...params })
            .then((result) => {
                setBlogList([...result.posts]);
                setTotalItem(result?.count);
                setLoading(false);
            })
            .catch((e) => setLoading(false));
    };
    useEffect(() => {
        fetchBlogList(params);
    }, [params]);
    return (
        <>
            <Row style={{ position: 'relative', marginTop: '20px' }}>
                <Col span={20} offset={4}>
                    <PageHeader
                        ghost={true}
                        title="Bài viết nổi bật"
                        className="customPageHeader"
                    >
                        <Row>
                            <div style={{ flex: 1 }}>
                                <Paragraph>
                                    Tổng hợp các bài viết chia sẻ về sách hay.
                                </Paragraph>
                            </div>
                        </Row>
                    </PageHeader>
                    <Row>
                        <Skeleton loading={loading} active >
                            <Col style={{ padding: '0 30px 44px 0' }}>
                                <Card 
                                    className='card-custom'
                                    style={{
                                        width: 1000,
                                    }}
                                // cover={
                                //     <img
                                //         alt="example"
                                //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                //     />
                                // }
                                // actions={[
                                //     <EllipsisOutlined key="ellipsis" />,
                                // ]}
                                >
                                    <div>
                                        <Meta
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                            title="Quốc Đạt"
                                            style={{ marginBottom: '10px' }}
                                        />
                                        <div className='blog-body'>
                                            <div className='blog-container'>
                                                <div className='blog-container__title'>
                                                    <Link to={"/"} style={{ outline: 'none', textDecoration: 'none' }}>
                                                        <h3 >LM Theme | Cách tạo theme VSCode và Publish lên Marketplace</h3>
                                                    </Link>
                                                </div>
                                                <div className='blog-container__description'>
                                                    <p>Bài viết này là chỉnh sửa và cập nhật của bài viết...</p>
                                                </div>
                                                <div className='blog-container__info'>
                                                    <span>11 ngày trước</span>
                                                    <span className='blog-container__dot'>.</span>
                                                    <span>7 phút đọc</span>
                                                </div>
                                            </div>
                                            <div className='blog-thumbnail'>
                                                <Link to={"/"}>
                                                    <img src='https://files.fullstack.edu.vn/f8-prod/blog_posts/3370/626fc1a91b92a.png' />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <div className='blog-pagination'>
                                    <Pagination defaultCurrent={1} total={50} />
                                </div>
                            </Col>
                            <Col>
                                <div className='topic-list__wrapper'>
                                    <h3>Các chủ đề được đề xuất</h3>
                                    <Row gutter={[8, 8]}>
                                        {['Movies', 'Books', 'Music', 'Sports'].map((tag) => (
                                            <Button type="text" shape="round" style={{ margin: '0 5px 0 5px' }}>
                                                {tag}
                                            </Button>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                        </Skeleton>
                    </Row>
                </Col>

            </Row>



        </>
    );
};

export default BlogList;
