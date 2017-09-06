'use strict';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var DBRef = require('mongodb').DBRef;
var url = 'mongodb://127.0.0.1:27017/webdb';

var arySort = function(ary){
    ary.sort(function(a,b){
        if(a._id < b._id){
            return -1;
        }else if(a._id > b._id){
            return 1;
        }else{
            return 0;
        }

    });
}
var dbCtrl = function(col, ctrl) {
    return function() {
        //将arguments转换为数组
        var arg = [].slice.apply(arguments);
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log("数据库连接出错：" + err);
            } else {
                var c = db.collection(col);
                var func = arg[arg.length - 1];
                if (typeof(func) == "function") {
                    arg[arg.length - 1] = function(err, result) {
                        if (err) {
                            console.log("数据操作失败：" + err);
                        }
                        func(result);
                        //关闭数据库连接
                        db.close();
                    }
                }

                c[ctrl].apply(c, arg);
            }
        });
    }
}
var dbQueryCtrl = function(col, ctrl) {
    return function() {
        var arg = [].slice.apply(arguments);
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log("数据库连接出错：" + err);
            } else {
                var c = db.collection(col);
                var func = arg.pop();
                var result = c[ctrl].apply(c, arg);
                if (typeof(func) == "function") {
                    if (err) {
                        console.log("数据操作失败：" + err);
                    }
                    result.toArray(function(err, data) {
                        func(data);
                        db.close();
                    });

                }


            }
        });
    }
}
var dbQueryPageCtrl = function(col, ctrl) {
    return function() {
        var arg = [].slice.apply(arguments);

        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log("数据库连接出错：" + err);
            } else {
                var c = db.collection(col);
                //获取当前页码和每页显示数
                var curpage = arg.shift();
                var eachpage = arg.shift();
                //如果页码不存在，则默认为第1页
                if(!curpage || isNaN(parseInt(curpage))){
                    curpage = 1;
                }
                //如果每页显示数不存在则默认为每页显示5条数据
                if(!eachpage || isNaN(parseInt(eachpage))){
                    eachpage = 5;
                }
                var func = arg.pop();

                if (typeof(func) == "function") {
                    c.count(arg[0],function(err, cnt) {
                        if (err) {
                            console.log("分页查询获取数据失败：" + err);
                        } else {
                            var result = c[ctrl].apply(c, arg);
                            result.limit(eachpage);
                            result.skip((curpage - 1) * eachpage);
                            result.toArray(function(err, data) {
                                var page = {
                                    curpage:curpage,
                                    eachpage:eachpage,
                                    maxpage:Math.ceil(cnt/eachpage),
                                    rows:data,
                                    total:cnt
                                }
                                func(page);
                                db.close();
                            });
                        }
                    });

                }

            }
        });
    }
}
var dbRefQuery = function(data,col,func){

        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log("数据库连接出错：" + err);
            } else {
                
                var newAry = [];
                
                //根据第一轮查找出来的数据进行关联查询
                if(data && data.length > 0 ){
                    data.forEach(function(ele){
                        
                        //总共需要查询的数据条数
                        let totalLength = 0;
                        //当前已经查询出的数据条数
                        let nowLength = 0;
                        
                        //先计算最后需查询的总条数，防止出错
                        col.forEach(function(colName){
                            if(ele[colName])
                                totalLength += ele[colName].length;
                        })
                        
                        console.log(`本次联合查询总计需查数据：${totalLength} 条`);
                        
                        //循环ref所有需要关联的集合
                        for(let i = 0; i < col.length; i++){
                            
                            let refName = col[i];
                            
                            //如果对象有col[i]此集合，则进行关联数据查询
                            if(ele[refName]){
                                
                                let jData = [];
                                
                                //循环关联ID数组，依次查询
                                ele[refName].forEach(function(item){ 
                                    
                                    db.collection(refName).find({_id:ObjectID(item)}).toArray(function(err,result){
                                        
                                        if(result && result.length > 0){
                                            jData.push(result[0]);
                                            nowLength++;
                                            ele[refName] = jData; 
                                        }
                                        
                                        //等待所有关联集合数据查询完毕，执行回调
                                        if(nowLength == totalLength){
                                            
                                            arySort([ele]);
                                            func([ele]);
                                            db.close();
                                            
                                        }

                                    })

                                });


                            }else{
                                newAry.push(ele);
                                if(newAry.length == data.length){

                                    arySort(newAry);

                                    func(newAry);
                                    db.close();
                                }
                            }    
                            
                        }
                    
                    })
                }else{
                    func(data);
                    db.close();
                }


            }
        });

}
exports.collection = function(col) {

    return {
        insert: dbCtrl(col, "insert"),
        update: dbCtrl(col, "update"),
        remove: dbCtrl(col, "remove"),
        find: dbQueryCtrl(col, "find"),
        findByPage: dbQueryPageCtrl(col, "find")

    }
}
exports.ObjectID = ObjectID;
exports.findJoin = dbRefQuery;
