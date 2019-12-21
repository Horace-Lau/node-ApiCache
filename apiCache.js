const koa = require('koa')
const colors = require('colors');
const app = new koa()
const cacheData = new Map()

colors.setTheme({
    info: 'green',
    da: 'blue',
    warn: 'yellow',
});

const getApiData =async (ctx,next) =>{
    let url = ctx.url
    let time = new Date().getSeconds()
    ctx.body = {
        url: url,
        time: time,
    }
    console.log(`请求接口:`.info+ `${url}`.da)
    await next()
    console.log(`接口${url}  请求完成`.info)
    console.log(`===========================`)
}

const cacheHandler =async (ctx,next) =>{
    let reqTag = ctx.body.url
    let reqTime = ctx.body.time
    //特定时间清除缓存
    if(reqTime%5 === 0){
        cacheData.clear()
        console.log(`[整点清除缓存]`.warn)
    }
    if(cacheData.has(reqTag)){
        console.log(`缓存存在,直接读取`)
        return 0
    }
    console.log(`没有缓存，请求接口`)
    await next();
        
}

const getData =async (ctx,next) => {
    let reqTag = ctx.url
    //模拟获取数据
    let data = new Date().getTime()
    //数据放入缓存
    cacheData.set(reqTag,data)

    console.log(`[请求最新数据]`.warn)
    console.log(`${data}`.da)
}
// app.use(ctx,=>{
//     ctx.body = [{
//         name:'Horace'
//     }]
// })
app.use(getApiData).use(cacheHandler).use(getData)


app.listen(3000)
