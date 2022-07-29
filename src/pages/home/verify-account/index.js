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
    } catch (error) {
      navigate('/404');
    }
  }, []);

  async function handleSubmit(value) {
    setLoading(true);
    const dataUpdate = { ...value, token: id };
    try {
      await axiosClient.patch('/user/reset-password', dataUpdate);
      message.success('Đổi mật khẩu thành công');
      navigate('/login');
    } catch (error) {
      message.error(error.response.data.error);
    }
    setLoading(false);
    return true;
  }

  return (
    <Result
      status="success"
      title="Bạn đã xác nhận tài khoản thành công"
      extra={[
        <Button onClick={() => navigate('/')} type="primary" key="console">
          Trang chủ
        </Button>,
      ]}
    />
  );
};

export default VerifyAccountPage;
