const express = require('express');
const app = new express();
const config = require('./config');
const bodyParser = require('body-parser');
const nunjucks=require('nunjucks');
const fs = require('fs')
const path = require('path')
const logger = require('morgan');
const open = require('open');

app.use(bodyParser.urlencoded({extended: false}));
nunjucks.configure({ autoescape: true });
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache :true
});

app.use(logger('', {}));

app.use('/public', express.static('./public'));


app.get('/',async (req,res)=>{
    res.render('index.html',{

    })
})

app.get('/reg',async (req,res)=>{
    res.render('reg.html',{})
});


const loadRouters = (dir) => {
    fs.readdirSync(dir).forEach(item => {
        app.use(`/api`, require(path.resolve(__dirname, dir, item)))
    })
}

app.use(require('./routers/user'))
app.listen(config.port, () => {
    loadRouters('./routers');
    open(`http://127.0.0.1:${config.port}`)
    config.bootTip();
})


