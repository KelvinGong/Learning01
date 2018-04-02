/*
* @Author: gongkelvin
* @Date:   2018-03-27 10:05:07
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-01 22:04:15
*/
/*
* @Author: mmall
* @Date:   2017-05-27 17:57:49
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-03-22 18:01:48
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js'); 
var _mm             = require('util/mm.js');
var _centre         = require('service/centre-service.js');
var _report         = require('service/report-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');
var templateCentre  = require('page/common/centre.string');

var page = {

    data : {
        listParam : {
            centreCode      : _mm.getUrlParam('centreCode')     || '',
            startDate       : _mm.getUrlParam('startDate')      || startDate.value,
            endDate         : _mm.getUrlParam('endDate')        || endDate.value,
            dateField       : _mm.getUrlParam('dateField')      || 'pay_date'
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        
        var now = new Date(); 
        startDate.value=now.getFullYear() + "-"+ this.pad((now.getMonth()+1),2)+"-01";
        endDate.value= now.getFullYear() + "-"+ this.pad((now.getMonth()+1),2)+"-"+this.pad(now.getDate(),2);
        this.data.listParam.startDate=startDate.value;
        this.data.listParam.endDate=endDate.value;
        this.loadCentreInfo();
        this.data.listParam.centreCode = 1;
        this.loadList();
    },
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
        // 排序的点击事件
        $('.sort-item').click(function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
        $('.update-data').click(function(){
            _this.data.listParam.centreCode=$('#centreCode').val().toString();
            _this.data.listParam.startDate=startDate.value;
            _this.data.listParam.endDate=endDate.value;
            _this.loadList();
        });
    },
    loadCentreInfo : function(){
        var bannerHtml  = _mm.renderHtml(templateCentre);

        var _this       = this,
            listHtml    = '',
            //listParam   = this.data.listParam,
            $pListCon   = $('.centreList');
        //$pListCon.html('<div class="loading"></div>');

        // 请求接口
        _centre.getActiveCentreList( null ,function(res){
            listHtml = _mm.renderHtml(templateCentre, {
                centreList :  res
            });
            $pListCon.html(listHtml);
            $('#centreCode').val(1);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });

        //$('.marketingList').html(templateIndex);
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
            $pListCon   = $('.m-list-con');
        $pListCon.html('<div class="loading"></div>');

        // 请求接口
        _report.ccReport01(listParam, function(res){
            listHtml = _mm.renderHtml(templateIndex, {
                list                :  res.ccList,
                totalCtrTurnover    :  res.totalCtrTurnover,
                totalCtrPerformance :  res.totalCtrPerformance
                // renewalList :  res.renewalList,
                

            });
             $pListCon.html(listHtml);
            // _this.loadPagination({
            //     hasPreviousPage : res.hasPreviousPage,
            //     prePage         : res.prePage,
            //     hasNextPage     : res.hasNextPage,
            //     nextPage        : res.nextPage,
            //     pageNum         : res.pageNum,
            //     pages           : res.pages
            // });
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
    // ,
    // // 加载分页信息
    // loadPagination : function(pageInfo){
    //     var _this = this;
    //     this.pagination ? '' : (this.pagination = new Pagination());
    //     this.pagination.render($.extend({}, pageInfo, {
    //         container : $('.pagination'),
    //         onSelectPage : function(pageNum){
    //             _this.data.listParam.pageNum = pageNum;
    //             _this.loadList();
    //         }
    //     }));
    // }

};
$(function(){
    page.init();

})
