import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorizePage = () => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    const role = localStorage.getItem('__role');
    if (role === 'R03' || role === 'R04' || (role === 'R05') | (role === 'R00'))
      return navigate('/dashboard');
    return navigate('/');
  };

  return (
    <Result
      status="warning"
      title="401"
      subTitle="Xin lỗi, bạn không được quyền truy cập vào trang/nội dung này"
      extra={
        <Button onClick={handleReturnHome} type="primary">
          Trở về nhà
        </Button>
      }
    />
  );
};

export default NotAuthorizePage;
