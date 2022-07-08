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
            <Row style={{ position: 'relative', 'paddingTop': '20px' }} className="custom-row">
                <Col span={20} offset={4}>
                    <PageHeader
                        ghost={true}
                        title="Bài viết nổi bật"
                        className="customPageHeader"
                    >
                        <Row style={{ paddingTop: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <Paragraph>
                                    Tổng hợp các bài viết chia sẻ về sách hay.
                                </Paragraph>
                            </div>
                        </Row>
                    </PageHeader>
                    <Row>
                        <Skeleton loading={loading} active >
                            {blogList && blogList.map((blog, index) => {
                                return (
                                    <>
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
                                            >
                                                <div>
                                                    <Meta
                                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                        title={blog?.author}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                    <div className='blog-body'>
                                                        <div className='blog-container'>
                                                            <div className='blog-container__title'>
                                                                <Link to={`${blog?._id}`} style={{ outline: 'none', textDecoration: 'none' }}>
                                                                    <h3 >{blog?.title}</h3>
                                                                </Link>
                                                            </div>
                                                            <div className='blog-container__description'>
                                                                <p>{blog?.brief}</p>
                                                            </div>
                                                            <div className='blog-container__info'>
                                                                <span>11 ngày trước</span>
                                                                <span className='blog-container__dot'>.</span>
                                                                <span>7 phút đọc</span>
                                                            </div>
                                                        </div>
                                                        <div className='blog-thumbnail'>
                                                            <Link to={`${blog?._id}`}>
                                                                <img src={blog?.thumbnail} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                            {index === blogList.length - 1 &&
                                                <div className='blog-pagination'>
                                                    <Pagination
                                                        defaultCurrent={1}
                                                        total={totalItem} onChange={(page, pageSize) => {
                                                            if (pageSize !== params.limit) {
                                                                params.page = 1;
                                                            } else {
                                                                params.page = page;
                                                            }
                                                            params.limit = pageSize;
                                                            setParams({ ...params });
                                                        }} />
                                                </div>
                                            }
                                        </Col>
                                    </>
                                )
                            }
                            )
                            }

                        </Skeleton>
                    </Row>
                </Col>

            </Row >



        </>
    );
};

export default BlogList;
