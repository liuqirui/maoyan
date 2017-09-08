var express = require('express');
var router = express.Router();
var baseDAO = require('../dao/BaseDAO');
var multiparty = require('multiparty');
var fs = require("fs");
	var util = require("util");

/* GET home page. */
router.all('/*', function(req, res, next) {
//    console.log(req.baseUrl,req.baseUrl.split("/"));
    var param;
    if(req.method.toUpperCase() == "GET"){
        param = req.query;
    }else{
        param = req.body;
    }
    for(k in param){
        var v = param[k];
        if(typeof(v) == "string" && v.length >= 2 && (/^\[.*\]$/.test(v) || /^\{.*\}$/.test(v))){
            try{
                param[k] = JSON.parse(param[k]);
            }catch(e){}
        }
    }
    var pathes = req.baseUrl.split(/\/+/);

    if(pathes.length > 0){

        if(pathes[0] == ''){

            pathes.shift();
        }
        console.log("路径：" + pathes);
        if(pathes[0].toLowerCase() == "upload"){
            upload(req,res);
        }else if(pathes[0] == "getSession"){
            getSession(req,res);
        }else if(pathes[0] == "logout"){
            logout(req,res);
        }else if(pathes.length == 2){
            var addSession = param.addSession;
            delete param.addSession;
            baseDAO.reduce(pathes[0],pathes[1],param,function(data){
                if(addSession){
                    req.session.data = data.length > 0 ? data[0]:data;
                }
				
//				console.log("返回的消息");
//				console.log(data);
                res.send(data);
            });
        }else{
            console.error("error:请求的路径不正确");
            res.send("error:请求的路径不正确");
        }
    }else{
        console.error("error:请求的路径不正确");
        res.send("error:请求的路径不正确");
    }


});

//var upload = function(req,res){
//    var form=new multiparty.Form({uploadDir:'./public/img'});
//	console.log(req.body);
//    form.parse(req,function(err,fields,files){
//        if(err){
//            res.send(err);
//        }else{
//
//            var path=files.file[0].path.substring(files.file[0].path.indexOf("img"));
//            res.send(path);
//        }
//    });
//}


	/* 上传*/
var upload = function(req, res){
	    //生成multiparty对象，并配置上传目标路径
	    var form = new multiparty.Form({uploadDir: './public/imges/'});  //文件路径可以修改，如果修改记得和下面的路径保持一致
	   
//	    //上传完成后处理
	     form.parse(req, function(err, fields, files) {
            
	   var filesTmp = JSON.stringify(files,null,2);
	    if(err){
	        console.log('parse error: ' + err);
	    }else{
	         console.log('parse files: ' + filesTmp);
//	        var files = files.inputFile;
//	        console.log(files.file[0].path)
//	        for(var inputFile of files){
//	            var uploadedPath = inputFile.path;
//	            var dstPath = './public/imges/' + inputFile.originalFilename;    //文件路径可以修改
//	            //重命名为真实文件名
//	            fs.rename(uploadedPath, dstPath, function(err) {
//	                  if(err){
//	                    console.log('rename error: ' + err);
//	                  } else {
//	                   console.log('rename ok');
//	                  }
//	            });
//	        }  
	    }
//         console.log(files.file[0].path)
            //如果ajax这里要改为send而不能是write/end
	    res.send(files.file[0].path);    //ajax 发送消息回去
//	  if(files.length<=1){
//	    res.send(files[0].originalFilename);    //ajax 发送消息回去
//	    //这里files是一个数组，如果批量上传多张图片，那么需要自己循环files，去取每个对象的originalFilename属性
//        }else{
//            let str='';
//           for(let i=0;i<files.length;i++){
//               if(i==files.length-1){
//                   str+=files[i].originalFilename
//               }else{
//               str+=files[i].originalFilename+','
//               }
//           }
//            res.send(str);
////        }
            

	    });
	};







var getSession = function(req,res){
    var data = req.session.data;
    if(data){
        res.send(data);
    }else{
        res.send({});
    }
}

var logout = function(req,res){
    req.session.data  = null;
    res.send("suc");
}

module.exports = router;
