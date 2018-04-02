/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-02 14:51:51
*/

'use strict';

var _mm = require('util/mm.js');

var _member = {
    // 获取商品列表
    getMemberList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/member/list_member.do'),
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
module.exports = _member;