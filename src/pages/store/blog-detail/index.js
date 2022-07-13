import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { getBlogListDetail } from './service';
import WrapperConentContainer from 'layouts/store/wrapper.content';
import { Avatar, Row } from 'antd';
import './style.less';
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
      <h1 className="BlogDetail_heading">{blog?.title}</h1>
      <div className="BlogDetail_header">
        <div className="BlogDetail_user">
          <Avatar
            style={{ outline: 'none', textDecoration: 'none' }}
            src="https://joeschmoe.io/api/v1/random"
          />
          <div className="BlogDetail_info">
            <p className="BlogDetail_name">Quốc Đạt</p>
            <p className="BlogDetail_time">
              "12 ngày trước " <span className="BlogDetail_dot">.</span> "7 phút
              đọc"
            </p>
          </div>
        </div>
        <div className="BlogDetail_action"></div>
      </div>

      {parse(`${blog?.description}`)}
    </WrapperConentContainer>
  );
}
