/*
* @Author: Kelvin
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-09 17:39:50
*/

'use strict';

var _mm = require('util/mm.js');

var _course = {
    // 获取商品列表
    getCourseList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/course/list_course.do'),
            data    : listParam,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },


    getActCourseList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/course/list_active_course.do'),
            data    : listParam,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    addMember : function(memberInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/member/add_member.do'),
            data    : memberInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    selectMember: function(memberId, resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/member/select_member.do'),
            data    : memberId,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    updateMember : function(memberInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/member/update_member.do'),
            data    : memberInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    }

    // 获取商品详细信息
/*    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }*/
}
module.exports = _course;