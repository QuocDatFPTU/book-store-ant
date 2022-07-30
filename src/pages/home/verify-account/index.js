import { Button, Result } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from 'util/axiosClient';

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(async () => {
    const token = id;
    try {
      const user = await axiosClient.post('/user/valid-token', { token });
      await axiosClient.patch(`/user/verify-account/${user._id}`, { token });
      localStorage.removeItem('__email');
    } catch (error) {
      navigate('/404');
    }
  }, []);

  return (
    <Result
      status="success"
      title="Bạn đã xác nhận tài khoản thành công"
      extra={[
        <Button onClick={() => navigate('/login')} type="primary" key="console">
          Đăng nhập
        </Button>,
      ]}
    />
  );
};

export default VerifyAccountPage;
