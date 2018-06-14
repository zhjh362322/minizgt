var app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (app.globalData.userInfo || userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo || userInfo,
        hasUserInfo: true
      })
    }
  },
  login: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  logout: function() {
    wx.removeStorageSync('userInfo');
    app.globalData.userInfo = null;
    this.setData({
      userInfo: null,
      hasUserInfo: false
    })
  },
  showUserInfo: function() {
    if(this.data.hasUserInfo) {
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
