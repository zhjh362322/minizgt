// 个人中心
var app = getApp()

Page({
  data: {
    userInfo: {}
  },
  // 用户是否登录
  onLoad: function () {
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo || !!wx.getStorageSync('userInfo'),
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  // 跳转登录
  login: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  // 退出登录状态
  logout: function() {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('consigner');
    wx.removeStorageSync('consignee');
    wx.removeStorageSync('orderList');
    wx.removeStorageSync('quotation');
    app.globalData.hasUserInfo = false;
    this.setData({
      hasUserInfo: false
    })
  },
  // 点击我的资料
  showUserInfo: function() {
    if (this.data.hasUserInfo) {
      wx.navigateTo({
        url: './userinfo/userinfo',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  // 点击收发货人
  showShipper: function(e) {
    if (this.data.hasUserInfo && this.data.userInfo.level == 2) {
      var shipper = e.currentTarget.dataset.shipper;
      wx.navigateTo({
        url: './shipper/shipper?shipper=' + shipper
      })
    } else {
      wx.showToast({
        title: '请登录加盟商账号',
        icon: 'none'
      })
    }
  }
})
