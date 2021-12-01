const express = require('express');
const Router = express.Router();
const {User} = require('../db/index')

const {auth, upload} = require('../middlewares/index');
//登录
Router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    let data=await User.findOne({
        where: {
            username,
            password
        }
    })
    if(data){
        res.json({
            success:true,
            msg: 'Login succeeded',
            redirect:'http://www.pwrd-art.com/'
        })
    }else{
        res.json({
            success:false,
            msg: 'username or password error',
        })
    }

});
//注册用户
Router.post('/user', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        await User.create(
            {
                username,
                password,
                email
            }
        )
        res.json({
            success: true,
            msg: 'Register succeeded',
            redirect: '/'
        })
    } catch (e) {
        res.json({
            success: false,
            msg: 'Register Failed'
        })
    }

});


module.exports = Router;
