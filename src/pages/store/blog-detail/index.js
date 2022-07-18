import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getBlogListDetail } from './service';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { Avatar, Row } from 'antd';
import './style.less';
import { DateFormat } from 'components/format';
export default function BlogListDetail() {
  const { blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState();
  const fetchBlogDetail = (params, sortedInfo) => {
    setLoading(true);
    getBlogListDetail(params)
      .then((result) => {
        console.log(result);
        setBlog(result);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };
  useEffect(() => {
    fetchBlogDetail(blogId);
  }, [blogId]);

  return (
    <WrapperConentContainer>
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          overflow: 'hidden',
        }}
      >
        <h1 className="BlogDetail_heading">{blog?.title}</h1>
        <div className="BlogDetail_header">
          <div className="BlogDetail_user">
            <Avatar
              style={{ outline: 'none', textDecoration: 'none' }}
              src="https://joeschmoe.io/api/v1/random"
            />
            <div className="BlogDetail_info">
              <p className="BlogDetail_name">{blog?.author}</p>
              <p className="BlogDetail_time">
                <DateFormat>{blog?.updatedAt}</DateFormat>
              </p>
            </div>
          </div>
        </div>
        <div>{parse(`${blog?.description}`)}</div>
      </div>
    </WrapperConentContainer>
  );
}
