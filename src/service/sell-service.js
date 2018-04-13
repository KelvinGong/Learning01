/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-04-03 10:48:04
*/

'use strict';

var _mm = require('util/mm.js');

var _sell = {
    // 获取商品列表
    getSellList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/sell/list_sell.do'),
            data    : listParam,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    addSell : function(sellInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/sell/add_sell.do'),
            data    : sellInfo,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    selectSell: function(memberId, resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/sell/select_member.do'),
            data    : memberId,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
    },

    updateSell : function(sellInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/sell/update_sell.do'),
            data    : sellInfo,
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
module.exports = _sell;