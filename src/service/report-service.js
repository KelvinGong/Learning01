

'use strict';

var _mm = require('util/mm.js');

var _report = {
    // ccreport01
    ccReport01 : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/report/cc_report01.do'),
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
module.exports = _report;