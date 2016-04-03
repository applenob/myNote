/**
 * Created by cer on 2016/4/3.
 */
//var patrn=/^([a-zA-Z0-9]|[_]){3,20}$/;
//if(patrn.exec('cer16')){
//    console.log("pass");
//}
//else console.log("wrong");


//patern1 = /[A-Z]+/
//patern2 = /[0-9]+/
//patern3 = /[a-z]+/
//var string = 'a1234A';
//if(patern1.exec(string) && patern2.exec(string) && patern3.exec(string)){
//    console.log("pass");
//}
//else console.log("wrong");

var password="a1234A";
var username="cer16";

//密码：长度不能少于6，必须同时包含数字、小写字母、大写字母
if(password.length<6){
    alert("密码长度必须大于六位！");
}
patern1 = /[A-Z]+/
patern2 = /[0-9]+/
patern3 = /[a-z]+/
if (!(patern1.exec(password) && patern2.exec(password) && patern3.exec(password))){
    console.log("密码必须同时包含数字、小写字母、大写字母！");
}


//用户名：只能是字母、数字、下划线的组合，长度3-20个字符
patern = /^([a-zA-Z0-9]|[_]){3,20}$/;
if (!patern.exec(password)){
    console.log("用户名只能是字母、数字、下划线的组合，长度3-20个字符");
}