/*
* @Author: it.dept
* @Date:   2018-03-23 14:15:17
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-09 23:09:39
*/
'use strict'
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
//require('util/wdatepicker/index.js');
require('util/jquery.searchableSelect.js');
var _mm             = require('util/mm.js');
var _member         = require('service/member-service.js');
var _marketing      = require('service/marketing-service.js');
var _sell           = require('service/sell-service.js');
var _user           = require('service/user-service.js');
var _course         = require('service/course-service.js');
var templateIndex   = require('./index.string');
var templateMember = require('./member.string');
var templateUser    = require('./user.string');
var templateCourse  = require('./course.string');


var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 加载用户信息
        this.loadInfo();
        var now = new Date(); 
        payDate.value= now.getFullYear() + "-"+ this.pad((now.getMonth()+1),2)+"-"+this.pad(now.getDate(),2);
    },
    //截取字段函数
    pad : function(num,n){
        var len = num.toString().length;  
        while(len < n) {  
        num = "0" + num;  
        len++;  
        }  
    return num;  
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
/*
sell相关字段
private Integer ctrCode;
private Date payDate;
private Integer memberCode;
private String contractCode;
private String receptPosCode;
private Integer courseCode;
private Integer price;
private Integer status;
private String classCode;
private Boolean isRenewal;
private Boolean isShort;
private Date firstclassTime;
private Integer dayOfWeek;
private Integer cc1;
private Integer cc2;
private Integer ei;
private Integer ta;
private Integer ii;
private String remarks;
private Date pauseDate;
private Date graduateDate;
private Date refundDate;
private Date createTime;
private Date updateTime;*/
            if(_this.getArgsFromHref(window.location.href,"id")==""){
                var sellInfo = {
                    payDate         : $('#payDate').val().substring(5,7)+"/"+$('#payDate').val().substring(8,10)+"/"+$('#payDate').val().substring(0,4),
                    memberCode      : $.trim($('#memberName').val().toString()),
                    contractCode    : $.trim($('#contractCode').val()),
                    receptPosCode   : $.trim($('#receptPosCode').val()),
                    courseCode      : $.trim($('#course').val()),
                    price           : $.trim($('#price').val()),
                    status          : "3",
                    isRenewal       : $('#isRenewal').is(":checked")? "1":"0",
                    isShort         : $('#isShort').is(":checked")? "1":"0",
                    cc1             : $.trim($('#cc1').val()),
                    cc2             : $.trim($('#cc2').val()),
                    //remarks         : $.trim($('#remarks').val())
                    
                }

                _sell.addSell(sellInfo,function(res,msg){
                    _mm.successTips(msg);
                    window.location.href = './sell-list.html';
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
    // 加载
    loadInfo : function(){
        var bannerHtml  = _mm.renderHtml(templateIndex);

        var _this       = this,
            listHtml    = '',
            //listParam   = this.data.listParam,
            $pListCon   = $('.sell-detail'),
            $memberList = $('.memberList');
        //$pListCon.html('<div class="loading"></div>');

        if(this.getArgsFromHref(window.location.href,"id")!=""){
            var listParam   = {
                id : this.getArgsFromHref(window.location.href,"id")
            };
            // 请求接口
            _member.getMemberListByCtr(listParam, function(res){
                listHtml = _mm.renderHtml(templateIndex, {
                    list    : res.list
                      
                });
                $pListCon.html(listHtml);

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
            listHtml=_mm.renderHtml(templateMember);
            //$pListCon.html(listHtml);
            _member.getMemberListByCtr( null ,function(res){
                listHtml = _mm.renderHtml(templateMember, {
                    memberList   : res
                });

                $("#memberName").html(listHtml);
                $("#memberName").searchableSelect();
                //$("#marketing option[value='']").remove();
                //$("#marketing").val(1);
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });

            _user.listUser( {role : 2},function(res){
                listHtml = _mm.renderHtml(templateUser, {
                    userList   : res
                });

                $("#cc1").html(listHtml);
                $("#cc2").html(listHtml);
                //$("#memberName").searchableSelect();
                //$("#marketing option[value='']").remove();
                //$("#marketing").val(1);
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });

            _course.getActCourseList(null,function(res){
                listHtml = _mm.renderHtml(templateCourse, {
                    courseList   : res
                });

                $("#course").html(listHtml);
                $("#course").searchableSelect();
                //$("#memberName").searchableSelect();
                //$("#marketing option[value='']").remove();
                //$("#marketing").val(1);
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