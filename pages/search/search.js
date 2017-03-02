// pages/search/search.js
Page({
  data: {
    inputValue: "",
    mpList: [],
    page: 1,
    nextpage: 0,
    requestUrl: "https://dev2.yeezan.com/api/addispatch/mp_keyword_search"
  },
  onLoad: function (options) {
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
  onShareAppMessage: function () {
    return {
      title: '公众号查找小程序',
      path: 'pages/search/search'
    }
  },

  getMpList: function () {
    var v = this.data.inputValue || "";
    if (!v) {
      wx.showToast({
        title: '请输入检索值',
        icon: 'info',
        duration: 2000
      })
      return false;
    }
    // fetch(this.data.requestUrl, {
    //   method: "POST",
    //   body: "keyword="+this.data.inputValue+"&page="+this.data.page
    // }).then(function (res){
    //   console.log(res)
    // })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url: this.data.requestUrl, //仅为示例，并非真实的接口地址
      // method: "POST",
      data: {
        keyword: this.data.inputValue,
        page: this.data.page
      },
      dataType: "json",
      success: this.getMpListCb.bind(this)
    })
  },
  getMpListCb: function (res) {
    wx.hideToast()
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
    var D = res.data.data;
    this.setData({
      mpList: this.data.mpList.concat(D.list) || [],
      page: D.nextpage,
      nextpage: D.nextpage
    })
  },
  bindKeyInput: function (event) {
    this.setData({
      "inputValue": event.detail.value
    })
  },
  searchfn: function (e) {
    var v = this.data.inputValue || "";
    if (!v) {
      wx.showToast({
        title: '请输入检索值',
        icon: 'info',
        duration: 2000
      })
      return false;
    }
    this.setData({
      nextpage: 0,
      page: 1
    })
    this.getMpList();
  },
  goInfo: function (e) {
    wx.navigateTo({
      url: '/pages/info/info?id='+e.target.dataset.id
    })
  }
})