/**
 * 使用说明:
 * 参数data 
 * type: Object
 * value: {
 *  url: "", //string request url
 *  params: {
 *      
 * }, //请求参数
 * cb: function (){}, //回调
 * }
 */
var http, M;

http = M = {
    _getParams: function (data) {
        return data.params || {};
    },
    _getCb: function (data) {
        return data.cb || data.callback || noop;
    },
    _getHeader: function (data) {
        return data.header || {
            'content-type': 'application/json'
        }
    },
    _getMehod: function (data) {
        return (data.method && data.method.toLocaleUpperCase()) || "GET";
    },
    _getRequestAfter: function (res, cb, userData) {
        if (+res.statusCode !== 200) {
            wx.showToast({
                title: res.errMsg,
                icon: 'info',
                duration: 2000
            })
            return;
        }
        if (+res.data.error !== 0) {
            wx.showToast({
                title: '请求出错！',
                icon: 'info',
                duration: 2000
            })
            return;
        }
        cb && cb(res.data, userData);
    },
    get: function (data) {
        M.ajax(data);
    },
    post: function (data) {
        data.method = "POST";
        M.ajax(data);
    },
    ajax: function (data) {
        let query = M._getParams(data);
        let cb = M._getCb(data);
        let header = M._getHeader(data);
        let method = M._getMehod(data);
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
        })
        wx.request({
            url: data.url, //仅为示例，并非真实的接口地址
            data: query,
            header: header,
            method: method,
            dataType: data.dataType || "json",
            success: function (res) {
                wx.hideToast();
                M._getRequestAfter(res, cb, query)
            },
            fail: function () {
                wx.hideToast();
                wx.showToast({
                    title: 'wx request fail!',
                    icon: 'info',
                    duration: 2000
                })
                return false;
            }
        })
    }
}

function noop() { }

module.exports = http;