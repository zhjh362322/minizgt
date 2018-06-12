var data = require('../../data/data.js');
var app = getApp();
Page({

  data: {
  
  },

  onLoad: function (options) {
  
  },
  formSubmit: function(e) {
    app.globalData.userInfo = data.userInfo;
    wx.setStorage({
      key: 'userInfo',
      data: data.userInfo,
    })
    this.setData({
      hasUserInfo: true
    })
    wx.reLaunch({
      url: '../personal/personal',
    })
  }
})