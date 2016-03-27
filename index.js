/**
 * Created by cer on 2016/3/27.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');

//创建express实例
var app = express();

//定义EJS模板引擎和模板文件位置
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

//定义静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//响应首页get请求
app.get('/',function(req,res){
    res.render('index',{
        title:'首页'
    })
})

//监听3000端口
app.listen(3000,function(req,res){
    console.log('app is running at port 3000')
});