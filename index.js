/**
 * Created by cer on 2016/3/27.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var session = require('express-session');
var moment = require('moment');
var passport = require('passport')
var WeixinStrategy = require('passport-weixin');

//扫码登录
//微信官网文档：https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=&lang=zh_CN
passport.use('loginByWeixin',new WeixinStrategy({
    clientID: 'CLIENTID'
    , clientSecret: 'CLIENT SECRET'
    , callbackURL: 'CALLBACK URL'
    , requireState: false
    , scope: 'snsapi_login'
}, function(accessToken, refreshToken, profile, done){
    done(null, profile);
}));

//微信客户端登录
//微信官网文档：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
//passport.use('loginByWeixinClient',new WeixinStrategy({
//    clientID: 'CLIENTID'
//    , clientSecret: 'CLIENT SECRET'
//    , callbackURL: 'CALLBACK URL'
//    , requireState: false
//    , authorizationURL: 'https://open.weixin.qq.com/connect/oauth2/authorize' //[公众平台-网页授权获取用户基本信息]的授权URL 不同于[开放平台-网站应用微信登录]的授权URL
//    , scope: 'snsapi_userinfo' //[公众平台-网页授权获取用户基本信息]的应用授权作用域 不同于[开放平台-网站应用微信登录]的授权URL
//}, function(accessToken, refreshToken, profile, done){
//    done(null, profile);
//}));

//引入mongoose
var mongoose = require('mongoose');
//引入模型
var models = require('./models/models');

var User = models.User;
var Note = models.Note;

//使用mongoose连接服务
mongoose.connect('mongodb://localhost:27017/notes');
mongoose.connection.on('error',console.error.bind(console,'连接数据库失败'));

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

//建立session模型
app.use(session({
    secret:'1234',
    name:'mynote',
    cookie:{maxAge:1000*60*60*24*7},//设置session的保存时间为1周
    resave:false,
    saveUninitialized:true
}));

//响应首页get请求
app.get('/',function(req,res){
    if(req.session.user != null){
        Note.find({author:req.session.user.username})
            .exec(function(err,allNotes){
                if(err){
                    console.log(err);
                    return res.redirect('/')
                }
                res.render('index',{
                    user:req.session.user,
                    title:'首页',
                    notes:allNotes
                });
            });
    }
    else{
        res.render('index', {
            user: req.session.user,
            title: '首页',
            notes: null
        });
    }
});

app.get('/register',function(req,res){
    console.log('注册,get！');
    if(req.session.user != null) {
        console.log('已经登录，不能再注册。');
        return res.redirect('/');
    }
    res.render('register',{
        user:req.session.user,
        title:'注册'
    })
});

app.post('/register',function(req,res){
    console.log('注册,post！');
    //req.body可以获取到表单的每项数据
    var username = req.body.username;
    password = req.body.password;
    passwordRepeat = req.body.passwordRepeat;

    //检查输入的用户名是否为空，使用trim去掉两端空格
    if(username.trim().length == 0){
        console.log('用户名不能为空！');
        //alert("用户名不能为空！");
        return res.redirect('/register')
    }

    //检查输入的密码是否为空，使用trim去掉两端空格
    if(password.trim().length == 0){
        console.log('密码不能为空！');
        //alert("密码不能为空！");
        return res.redirect('/register');
    }

    //检查两次输入的密码是否一致
    if(password != passwordRepeat){
        console.log('两次输入的密码不一致！');
        //alert("两次输入的密码不一致！");
        return res.redirect('/register');
    }

    //检查用户名是否已经存在，如果不存在，则保存该条记录
    User.findOne({username:username},function(err,user){
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
        if(user){
            console.log('用户名已经存在');
            //alert("用户名已经存在！");
            return res.redirect('/register');
        }
        //对密码进行md5加密
        var md5 = crypto.createHash('md5'),
            md5password = md5.update(password).digest('hex');
        //新建user对象用于保存数据
        var newUser = new User({
            username: username,
            password:md5password
        });

        newUser.save(function(err, doc){
            if(err){
                console.log(err);
                return res.redirect('/register');
            }
            console.log('注册成功！');
            //alert("注册成功！");
            return res.redirect('/');
        });
    });
});

app.get('/login',function(req,res){
    console.log('登录！');
    if(req.session.user != null) {
        console.log('已经登录，不能再登录。');
        return res.redirect('/');
    }
    res.render('login',{
        user:req.session.user,
        title:'登录'
    })
});

app.post('/login',function(req,res){
    var username = req.body.username,
        password = req.body.password;
    User.findOne({username:username},function(err,user){
        if(err){
            console.log(err);
            return res.redirect('/login');
        }
        if(!user){
            console.log('用户不存在！');
            //alert("用户不存在！");
            return res.redirect('login');
        }
        //对密码进行mad5加密
        var md5 = crypto.createHash('md5'),
            md5password = md5.update(password).digest('hex');
        if(user.password != md5password){
            console.log('密码错误！');
            //alert("密码错误！");
            return res.redirect('/login');
        }
        console.log('登陆成功！');
        user.password = null;
        delete user.password;
        req.session.user = user;
        return res.redirect('/')
    })
});

app.get('/quit',function(req,res){
    req.session.user = null;
    console.log('退出！');
    return res.redirect('/login');
});

app.get('/post',function(req,res){
    console.log('发布！');
    res.render('post',{
        user:req.session.user,
        title:'发布'
    })
});

app.post('/post',function(req,res){
    var note = new Note({
        title:req.body.title,
        author:req.session.user.username,
        tag:req.body.tag,
        content:req.body.content
    });

    note.save(function(err,doc){
        if(err){
            console.log(err);
            return res.redirect('/post');
        }
        console.log('文章发表成功');
        return res.redirect('/')
    });
});

app.get('/detail/:_id',function(req,res){
    console.log('查看笔记！');
    Note.findOne({_id:req.params._id})
        .exec(function(err,art){
            if(err){
                console.log(err);
                return res.redirect('/');
            }
            if(art){
                //console.log(art.tag);
                res.render('detail',{
                   title:'笔记详情',
                    user:req.session.user,
                    art: art,
                    moment:moment
                });
            }
        });
});

//在PC端通过扫描登录，使用/auth/loginByWeixin
app.get("/auth/loginByWeixin",
    passport.authenticate('loginByWeixin',{ successRedirect: '/',
        failureRedirect: '/login' })
);

//在微信客户端登录，使用/auth/loginByWeixinClient
app.get("/auth/loginByWeixinClient",
    passport.authenticate('loginByWeixinClient',{ successRedirect: '/',
        failureRedirect: '/login' })
);

//监听3000端口
app.listen(3000,function(req,res){
    console.log('app is running at port 3000')
});
