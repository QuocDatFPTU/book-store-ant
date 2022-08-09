import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-

//Config request
const axiosClientMomo = axios.create({
    headers: {
        'content-type': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://test-payment.momo.vn'
    },
});

export default axiosClientMomo;
