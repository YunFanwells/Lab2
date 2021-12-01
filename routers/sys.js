const express = require('express');
const {sequelize} = require('../db/index')
const Router = express.Router();


Router.get('/init', async (req, res) => {
    await sequelize.sync({force: true});
    res.json({
        success: '系统初始化完成',
        data: []
    })
})

module.exports = Router;
