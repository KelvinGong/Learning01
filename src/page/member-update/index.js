/*
* @Author: it.dept
* @Date:   2018-03-23 14:15:17
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-02 14:56:46
*/
'use strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
//require('util/wdatepicker/index.js');

var _mm             = require('util/mm.js');
var _member         = require('service/member-service.js');
var _marketing      = require('service/marketing-service.js');
var templateIndex   = require('./index.string');
var templateMarket  = require('./marketing.string');


var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 加载用户信息
        this.loadInfo();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){

            if(_this.getArgsFromHref(window.location.href,"id")==""){
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
            }else{
                var memberInfo = {
                    id              : _this.getArgsFromHref(window.location.href,"id"),
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
                _member.updateMember(memberInfo,function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './member-detail.html?id='+_this.getArgsFromHref(window.location.href,'id');
                },function(errmsg){
                    _mm.errorTips(errmsg);
                });
            }
            


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
            **/
        });
        $('.btn-cancel').on('click',function(){
            window.location.href ='./member-detail.html?id='+_this.getArgsFromHref(window.location.href,'id');
        });
        $('.loadData').on('click',function(){
            _this.loadInfo();
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
    },
    // 加载渠道信息
    loadInfo : function(){
        var bannerHtml  = _mm.renderHtml(templateIndex);

        var _this       = this,
            listHtml    = '',
            //listParam   = this.data.listParam,
            $pListCon   = $('.update-detail'),
            $marketList = $('.marketingList');
        //$pListCon.html('<div class="loading"></div>');

        if(this.getArgsFromHref(window.location.href,"id")!=""){
            var listParam   = {
                id : this.getArgsFromHref(window.location.href,"id")
            };
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
                    marketingCode: res.marketingCode
                    //age         : res.age 
                });
                $pListCon.html(listHtml);
                $("#memberCode").val(res.memberCode);
                $("#memName").val(res.memName);
                $("#nameEng").val(res.nameEng);
                $("#birthday").val(res.birthday);
                $("#nameParents").val(res.nameParents);
                $("#phone").val(res.phone);
                $("#wechat").val(res.wechat);
                $("#address").val(res.address);
                $("#referFrom").val(res.referFrom);
                $("#remarks").val(res.remarks);
                $("#gender").val(res.gender);
                // 请求marketing接口
                _marketing.getActiveMarketingList( null ,function(res1){
                    listHtml = _mm.renderHtml(templateMarket, {
                        marketingList :  res1,
                        marketingCode: res.marketingCode,
                        marketing       :res.marketing
                    });
                    $("#marketing").html(listHtml);

                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
                
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });


        }else{
            listHtml=_mm.renderHtml(templateIndex);
            $pListCon.html(listHtml);
            _marketing.getActiveMarketingList( null ,function(res1){
                listHtml = _mm.renderHtml(templateMarket, {
                    marketingList   : res1,
                });

                $("#marketing").html(listHtml);
                $("#marketing option[value='']").remove();
                $("#marketing").val(1);
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });

            $(".content").css("display","none");
        }
            

/*        // 请求接口
        _marketing.getActiveMarketingList( null ,function(res){
            listHtml = _mm.renderHtml(templateMarket, {
                marketingList :  res
            });
            $marketList.html(listHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });*/

        //$('.marketingList').html(templateIndex);
    },
   
};
$(function(){
    page.init();
});