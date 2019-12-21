const request = require('request')
// //模拟调用api
setInterval(() => {
    mockReq();
}, 1000)
function mockReq(){
    const reqUrl ='http://localhost:3000/'+ Math.ceil(Math.random()*2);
    request(reqUrl);
}