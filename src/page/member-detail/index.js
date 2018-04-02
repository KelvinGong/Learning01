/*
* @Author: it.dept
* @Date:   2018-03-23 14:15:17
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-02 14:37:21
*/
'use strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
//require('util/wdatepicker/index.js');

var _mm             = require('util/mm.js');
var _member         = require('service/member-service.js');
//var _marketing      = require('service/marketing-service.js');
var templateIndex   = require('./index.string');



var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadData();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
/*        $(document).on('click', '.btn-submit', function(){

            var memberInfo = {
                memberCode      : $.trim($('#memberCode').val()),
                memName         : $.trim($('#memName').val()),
                nameEng         : $.trim($('#nameEng').val()),
                birthday        : $('#birthday').val().substring(5,7)+"/"+$('#birthday').val().substring(8,10)+"/"+$('#birthday').val().substring(0,4),
                gender          : $('#gender').find("option:selected").text(),
                nameParents     : $.trim($('#nameParents').val()),
                phone           : $.trim($('#question').val()),
                wechact         : $.trim($('#wechact').val()),
                address         : $.trim($('#address').val()),
                marketing       : $.trim($('#marketing').val().toString()),
                referFrom       : $.trim($('#referFrom').val()),
                remarks         : $.trim($('#remarks').val())
                
            }

            _member.addMember(memberInfo,function(res,msg){
                _mm.successTips(msg);
                window.location.href = './memberlist.html';
            },function(errmsg){
                _mm.errorTips(errmsg);
            });


            /**
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
            
        });*/
        $('.btn-submit').on('click',function(){
            window.location.href ='./member-update.html?id='+_this.getArgsFromHref(window.location.href,'id');
        });
        $('.btn-cancel').on('click',function(){
            window.location.href = './memberlist.html';
        });
    },

    loadData : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = {
                id : this.getArgsFromHref(window.location.href,"id")
            },
            $pListCon   = $('.memDetail');
        $pListCon.html('<div class="loading"></div>');
        // // 删除参数中不必要的字段
        // listParam.categoryId 
        //     ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口
        _member.selectMember(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                memberCode  : res.memberCode,
                memName     : res.memName,
                nameEng     : res.nameEng,
                birthday    : res.birthday,
                gender      : res.gender,
                nameParents : res.nameParents,
                phone       : res.phone,
                wechat      : res.wechat,
                address     : res.address,
                referFrom   : res.referFrom,
                marketing   : res.marketing,
                remarks     : res.remarks,
                age         : res.age 
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //处理参数
    getArgsFromHref : function(sHref, sArgName){
      var args    = sHref.split("?");
      var retval = "";
    
      if(args[0] == sHref) /*参数为空*/
      {
           return retval; /*无需做任何处理*/
      }  
      var str = args[1];
      args = str.split("&");
      for(var i = 0; i < args.length; i ++)
      {
          str = args[i];
          var arg = str.split("=");
          if(arg.length <= 1) continue;
          if(arg[0] == sArgName) retval = arg[1]; 
      }
      return retval;
    }
    // 加载渠道信息
/*    loadMarketingInfo : function(){
        var bannerHtml  = _mm.renderHtml(templateIndex);

        var _this       = this,
            listHtml    = '',
            //listParam   = this.data.listParam,
            $pListCon   = $('.marketingList');
        //$pListCon.html('<div class="loading"></div>');

        // 请求接口
        _marketing.getActiveMarketingList( null ,function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                marketingList :  res
            });
            $pListCon.html(listHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });

        //$('.marketingList').html(templateIndex);
    },*/
   
};
$(function(){
    page.init();
});