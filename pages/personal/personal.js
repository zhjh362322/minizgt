var app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo || !!wx.getStorageSync('userInfo'),
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  login: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  logout: function() {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('consigner');
    wx.removeStorageSync('consignee');
    app.globalData.hasUserInfo = false;
    this.setData({
      hasUserInfo: false
    })
  },
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
