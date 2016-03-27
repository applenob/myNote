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

app.get('/register',function(req,res){
    console.write('注册！');
    res.render('index',{
        title:'注册'
    })
})

app.get('/login',function(req,res){
    console.write('登录！');
    res.render('index',{
        title:'登录'
    })
})

app.get('/quit',function(req,res){
    console.write('退出！');
    res.render('index',{
        title:'退出'
    })
})

app.get('/post',function(req,res){
    console.write('发布！');
    res.render('index',{
        title:'发布'
    })
})

app.get('/detail',function(req,res){
    console.write('查看笔记！');
    res.render('index',{
        title:'查看笔记'
    })
})

//监听3000端口
app.listen(3000,function(req,res){
    console.log('app is running at port 3000')
});