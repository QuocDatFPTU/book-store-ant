import React from 'react';

const StatusFormat = (props) => {
  const statusColor = (status) => {
    if (status === 'submitted')
      return (
        <h3
          style={{
            color: '#fa8c16',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          đợi xác nhận
        </h3>
      );
    else if (status === 'cancelled')
      return (
        <h3
          style={{
            color: '#f5222d',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          đã hủy
        </h3>
      );
    else
      return (
        <h3
          style={{
            color: '#7cb305',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          Thành công
        </h3>
      );
  };
  return <div>{statusColor(props.children)}</div>;
};

export default StatusFormat;
