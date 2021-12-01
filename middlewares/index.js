const auth = async (req, res, next) => {
    await next();
}

const upload = async (req, res, next) => {
    let arr=[];
    console.log(req)
    req.on('data',data=>{
        console.log('push')
       arr.push(data)
    });

    req.on('end',()=>{
        console.log(arr)
        res.json(arr)
    });
}

module.exports = {
    auth,
    upload
}