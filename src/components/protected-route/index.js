import { async } from '@firebase/util';
import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axiosClient from 'util/axiosClient';

const ProtectedRoute = async ({ allowed = [], redirectPath = '/' } = {}) => {
  const navigate = useNavigate();

  //Check user token, if not create as guest (Tạo object guest)
  if (!localStorage.getItem('__token') && !localStorage.getItem('__role')) {
    axiosClient.post('/user/guest').then((result) => {
      localStorage.setItem('__role', result.guest.role.code);
    });
  }

  //Compare role is allow
  console.log(allowed);
  if (allowed.length !== 0) {
    console.log('-3------------');
    const role = localStorage.getItem('__role');
    await axiosClient
      .post('/roles/authorize', {
        role,
        allowed,
      })
      .then(({ isAllowed }) => {
        if (!isAllowed) {
          console.log('-4.1----------');
          return navigate('/error');
        } else {
          console.log('-4.2----------');
          return <Outlet />;
        }
      });
  } else {
    console.log('-5------------');
    return <Outlet />;
  }
};

export default ProtectedRoute;
