/*
* @Author: Rosen
* @Date:   2017-05-27 18:26:52
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-29 16:54:03
*/

'use strict';

var _mm = require('util/mm.js');

var _member = {
    // 获取商品列表
    getMemberList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/member/list_member.do'),
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
module.exports = _member;