import { EllipsisOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  Modal,
  PageHeader,
  Row,
  Typography,
  Tag,
  Button,
  Pagination,
  Image,
  Skeleton,
} from 'antd';
import { DateFormat } from 'components/format';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultPage } from 'util/constant';
import { getBlogList } from './service';
import './style.less';
const BlogList = () => {
  const { Meta } = Card;
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [blogFeaturedList, setBlogFeaturedList] = useState([]);
  const [totalItem, setTotalItem] = useState();
  const [params, setParams] = useState({ page: 1, limit: 5 });
  // state
  const navigate = useNavigate();

  const fetchBlogList = (params, sortedInfo) => {
    setLoading(true);
    getBlogList({ ...params, status: true })
      .then(({ posts, count }) => {
        setBlogList([...posts]);
        setTotalItem(count);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };
  const fetchBlogFeaturedList = (params, sortedInfo) => {
    getBlogList({ limit: 3, status: true, featured: true })
      .then((result) => {
        setBlogFeaturedList([...result.posts]);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchBlogFeaturedList(params);
    fetchBlogList(params);
  }, [params]);

  console.log(totalItem);
  return (
    <WrapperConentContainer>
      <Row className="custom-row">
        <Col span={24}>
          <Row style={{ marginBottom: '10px' }}>
            <Col
              onClick={() => navigate(`${blogFeaturedList[0]?._id}`)}
              span={24}
              style={{ position: 'relative' }}
            >
              <div className="blog-fearture__img">
                <img
                  style={{ height: '280px', objectFit: 'cover', width: '100%' }}
                  alt="example"
                  src={blogFeaturedList[0]?.thumbnail}
                />
              </div>
              <div className="blog-fearture__detail ">
                <div className="blog-fearture__title">
                  <Link
                    to={`${blogFeaturedList[0]?._id}`}
                    style={{
                      outline: 'none',
                      textDecoration: 'none',
                    }}
                  >
                    <h3>{blogFeaturedList[0]?.title}</h3>
                  </Link>
                </div>
                <div className="blog-container__info blog-fearture__info">
                  <span
                    style={{
                      color: 'red',
                      fontWeight: '500',
                      fontSize: '14px',
                    }}
                  >
                    {blogFeaturedList[0]?.author}
                  </span>
                  <span
                    style={{ color: 'white' }}
                    className="blog-container__dot"
                  >
                    .
                  </span>
                  <span
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      fontSize: '14px',
                    }}
                  >
                    <DateFormat>{blogFeaturedList[0]?.updatedDate}</DateFormat>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col
              onClick={() => navigate(`${blogFeaturedList[1]?._id}`)}
              span={12}
              style={{ position: 'relative' }}
            >
              <div style={{ width: '99.3%' }}>
                <div className="blog-fearture__img">
                  <img
                    style={{
                      height: '280px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    alt="example"
                    src={blogFeaturedList[1]?.thumbnail}
                  />
                </div>
                <div className="blog-fearture__detail">
                  <div className="blog-fearture__title">
                    <Link
                      to={`${blogFeaturedList[1]?._id}`}
                      style={{
                        outline: 'none',
                        textDecoration: 'none',
                      }}
                    >
                      <h3>{blogFeaturedList[1]?.title}</h3>
                    </Link>
                  </div>
                  <div className="blog-container__info blog-fearture__info">
                    <span
                      style={{
                        color: 'red',
                        fontWeight: '500',
                        fontSize: '14px',
                      }}
                    >
                      {blogFeaturedList[1]?.author}
                    </span>
                    <span
                      style={{ color: 'white' }}
                      className="blog-container__dot"
                    >
                      .
                    </span>
                    <span
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '14px',
                      }}
                    >
                      <DateFormat>
                        {blogFeaturedList[1]?.updatedDate}
                      </DateFormat>
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              onClick={() => navigate(`${blogFeaturedList[2]?._id}`)}
              span={12}
              style={{ position: 'relative' }}
            >
              <div style={{ width: '99.3%', float: 'right' }}>
                <div className="blog-fearture__img">
                  <img
                    style={{
                      height: '280px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                    alt="example"
                    src={blogFeaturedList[2]?.thumbnail}
                  />
                </div>
                <div className="blog-fearture__detail ">
                  <div className="blog-fearture__title">
                    <Link
                      to={`${blogFeaturedList[2]?._id}`}
                      style={{
                        outline: 'none',
                        textDecoration: 'none',
                      }}
                    >
                      <h3>{blogFeaturedList[2]?.title}</h3>
                    </Link>
                  </div>
                  <div className="blog-container__info blog-fearture__info">
                    <span
                      style={{
                        color: 'red',
                        fontWeight: '500',
                        fontSize: '14px',
                      }}
                    >
                      {blogFeaturedList[2]?.author}
                    </span>
                    <span
                      style={{ color: 'white' }}
                      className="blog-container__dot"
                    >
                      .
                    </span>
                    <span
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        fontSize: '14px',
                      }}
                    >
                      <DateFormat>
                        {blogFeaturedList[2]?.updatedDate}
                      </DateFormat>
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Skeleton loading={loading} active>
              {blogList &&
                blogList.map((blog, index) => {
                  return (
                    <>
                      <Col span={24} style={{ margin: '0 0 10px 0' }}>
                        <Card
                          className="card-custom"
                          style={{
                            width: '100%',
                          }}
                        >
                          <div>
                            <Meta
                              avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                              }
                              title={blog?.author}
                              style={{ marginBottom: '10px' }}
                            />
                            <div className="blog-body">
                              <div className="blog-container">
                                <div className="blog-container__title">
                                  <Link
                                    to={`${blog?._id}`}
                                    style={{
                                      outline: 'none',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    <h3>{blog?.title}</h3>
                                  </Link>
                                </div>
                                <div className="blog-container__description">
                                  <p>{blog?.brief}</p>
                                </div>
                                <div className="blog-container__info">
                                  <span>
                                    <DateFormat>{blog?.updatedAt}</DateFormat>
                                  </span>
                                  {/* <span className="blog-container__dot">.</span>
                                  <span>7 phút đọc</span> */}
                                </div>
                              </div>
                              <div className="blog-thumbnail">
                                <Link to={`${blog?._id}`}>
                                  <img src={blog?.thumbnail} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                        {index === blogList.length - 1 && (
                          <div className="blog-pagination">
                            <Pagination
                              defaultCurrent={1}
                              current={params.page}
                              total={totalItem}
                              pageSize={params.limit}
                              onChange={(page) => {
                                params.page = page;
                                setParams({ ...params });
                              }}
                            />
                          </div>
                        )}
                      </Col>
                    </>
                  );
                })}
            </Skeleton>
          </Row>
        </Col>
      </Row>
    </WrapperConentContainer>
  );
};

export default BlogList;
