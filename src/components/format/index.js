import NumberFormat from 'react-number-format';
import moment from 'moment';

export const MoneyFormat = (props) => (
  <NumberFormat
    value={props.children}
    displayType={'text'}
    thousandSeparator={true}
    suffix={'đ'}
  />
);

export const DateFormat = (props) => {
  return moment(props.children).format('DD/MM/YYYY');
};
