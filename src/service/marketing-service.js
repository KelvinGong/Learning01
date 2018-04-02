/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   gongkelvin
* @Last Modified time: 2018-03-29 11:41:41
*/

'use strict';

var _mm = require('util/mm.js');

var _marketing = {
    // 获取商品列表
    getActiveMarketingList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/marketing/list_active_marketing.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
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
module.exports = _marketing;