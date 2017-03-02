// pages/info/info.js
var http = require("../../utils/http.js");
var api = require("../../utils/api.js");

Page({
  data: {
    item: {},
    mp_weixin_id: "",
    regionList: [],
    recentStat: {}
  },
  onLoad: function (options) {
    var id = options.id || "duhaoshu";
    if (!id) {
      wx.showToast({
        title: '缺少微信id',
        icon: 'info',
        duration: 2000
      })
      return;
    }
    this.setData({
      mp_weixin_id: id
    })

    var v = this.data.mp_weixin_id || "";
    if (!v) {
      wx.showToast({
        title: '缺少微信id',
        icon: 'info',
        duration: 2000
      })
      return false;
    }

    this.requestData(this.ajaxConfig());
    // this.getMpInfo();
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  ajaxConfig: function () {
    return [
      {
        url: api.get_mp_info,
        params: {
          mp_weixin_id: this.data.mp_weixin_id
        },
        cb: this.getMpInfoCb.bind(this)
      },
      {
        url: api.get_mp_province_info,
        params: {
          mp_weixin_id: this.data.mp_weixin_id
        },
        cb: this.getMpProvinceCb.bind(this)
      },
      {
        url: api.get_mp_recent_stat,
        params: {
          mp_weixin_id: this.data.mp_weixin_id,
          days: 7
        },
        cb: this.getMpRecentStatCb.bind(this)
      }
    ]
  },
  requestData: function (ajaxConfig) {
    for (let i = 0, len = ajaxConfig.length; i < len; i++) {
      http.get(ajaxConfig[i])
    }
  },
  getMpInfoCb: function (data) {
    data.data.sexPercent = parseInt(data.data.mp_sex_percent[0].percent)
    this.setData({
      item: data.data
    })
  },
  getMpProvinceCb: function (data) {
    this.setData({
      regionList: data.data.splice(0, 10)
    })
  },
  getMpRecentStatCb: function (data){
    this.setData({
      recentStat: data.data
    });
  }
})
