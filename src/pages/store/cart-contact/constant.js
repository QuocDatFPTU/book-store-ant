import HmacSHA256 from 'crypto-js/hmac-sha256';
export function convertDataMomo(order) {
    const partnerCode = "MOMON18R20220422";
    const accessKey = "EREFFLMJeJtVp1Hd";
    const secretkey = "qaYZAnRqxiEle38KzaoEMviyvnldOROE";
    const requestId = partnerCode + new Date().getTime();
    const orderId = order?._id;
    const orderInfo = "paywithMoMo";
    const redirectUrl = "http://localhost:5000";
    const ipnUrl = "https://callback.url/notify";
    // const ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    const amount = "50000";
    const requestType = "captureWallet"
    const extraData = "eyJ1c2VybmFtZSI6ICJtb21vIn0="; //pass empty value if your merchant does not have stores
    let rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    console.log('raw', rawSignature)
    const signature = HmacSHA256(rawSignature, secretkey).toString();
    let orderData = {
        orderId: orderId,
        partnerCode: partnerCode,
        partnerName: "KuliTeam",
        storeId: "KuliTeamStore",
        requestType: requestType,
        ipnUrl: "http://localhost:5000",
        redirectUrl: "https://momo.vn",
        lang: "vi",
        orderInfo: orderInfo,
        requestId: requestId,
        extraData: extraData,
        signature: signature,
    };
    orderData['items'] = [];
    for (const item of order?.items) {
        const data = {
            id: item.product,
            name: item.title,
            price: item.amount,
            quantity: item.quantity,
            totalPrice: item.totalAmount,
            currency: 'VND'
        }

        orderData['items'].push(data);
    }
    orderData['amount'] = order?.totalCost;
    return orderData;
}
