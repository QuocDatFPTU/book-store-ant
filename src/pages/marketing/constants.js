import { Image, Rate } from "antd";

export const firstColumns = [
    //contacts' id, full name, gender, email, mobile, status
    {

        title: 'Ảnh',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (text,) => <Image src={text} style={{ Width: 200 }} />
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Tác giả',
        dataIndex: 'author',
        key: 'author',
    },
];

export const secondColumns = [
    {

        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tổng chi',
        dataIndex: 'spend',
        key: 'spend',
        render: (text, record) => {
            return record.spend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
];

export const fourthColumns = [
    {

        title: 'Sản phẩm',
        dataIndex: 'product',
        key: 'product',
        width: '50%',
        render: (text, record) => {
            return record.product.title;
        }
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',

    },
    {
        title: 'Đánh giá',
        dataIndex: 'star',
        key: 'star',
        render: (text) => {
            return <Rate value={text} />
        }
    },
];
export const fifthColumns = [
    {

        title: 'Sản phẩm',
        dataIndex: 'product',
        key: 'product',
        width: '50%',
        render: (text, record) => {
            return record.product.title;
        }
    },
    {
        title: 'Đã bán',
        dataIndex: 'sold',
        key: 'sold',
        render: (text, record) => {
            return record.sold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (text, record) => {
            return record.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
];
export const thridColumns = [
    //contacts' id, full name, gender, email, mobile, status
    {

        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
];

export const secondData = [
    //contacts' id, full name, gender, email, mobile, status
    {
        key: '1',
        name: 'Quoc Dat',
        amount: '1000000'
    },
    {
        key: '2',
        name: 'Tho Nguyen',
        amount: '987812'
    },
    {
        key: '3',
        name: 'Hoang Anh',
        amount: '789123'
    },
    {
        key: '4',
        name: 'Khang Nguyen',
        amount: '3212000'
    },
    {
        key: '5',
        name: 'Quoc Dat',
        amount: '233123'
    },
];

export const firstData = [
    //contacts' id, full name, gender, email, mobile, status
    {
        key: '1',
        thumbnail: 'https://s199.imacdn.com/ta/2022/07/10/a77507217b789db3_761950d63e1ef407_4689316574717111185710.jpg',
        title: "Dr. Stone quay trở lại với mùa thứ 3 trong năm 2023!",
        author: 'Quoc Dat',
    },
    {
        key: '2',
        thumbnail: 'https://s199.imacdn.com/ta/2022/07/08/defb433a5960804f_eb27cb2233be0a9f_9758516572968782185710.jpg',
        title: "Sự kiện Anime Expo và sự vô trách nhiệm của đơn vị tổ chức!",
        author: 'Quoc Dat',
    },
    {
        key: '3',
        thumbnail: 'https://s199.imacdn.com/ta/2022/07/10/952ff13813ab605c_60ddf27f2ccc5fae_6583216573870573185710.jpg',
        title: "Dragon Ball Super được đồn đoán sẽ quay trở lại vào năm 2023!",
        author: 'Quoc Dat',
    },
    {
        key: '4',
        thumbnail: 'https://s199.imacdn.com/ta/2022/07/10/a77507217b789db3_761950d63e1ef407_4689316574717111185710.jpg',
        title: "Dr. Stone quay trở lại với mùa thứ 3 trong năm 2023!",
        author: 'Quoc Dat',
    },
    {
        key: '5',
        thumbnail: "https://s199.imacdn.com/ta/2022/07/12/f07a7f08968ecab5_b9dfc3568aa1f615_6232216575595937185710.jpg",
        title: "Nhìn lại những nhân vật tầm cỡ trong đại sự kiện văn hóa Nhật Bản ở Tp. Hồ Chí Minh!",
        author: 'Quoc Dat',
    },
];


export const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];