var app = getApp();
Page({

  data: {
  
  },

  onLoad: function (options) {
  
  },
  formSubmit: function(e) {
    var that = this;
    var params = e.detail.value;
    params.from = 'mini';
    wx.request({
      url: app.globalData.host + '/login',
      data: params,
      method: 'POST',
      success: function(res) {
        if(res.data.code == 0) {
          that.setData({
            err: res.data.msg
          })
        } else {
          app.globalData.userInfo = res.data;
          wx.setStorage({
            key: 'userInfo',
            data: res.data
          })
          that.setData({
            hasUserInfo: true
          })
          wx.reLaunch({
            url: '../personal/personal',
          })
        }
      }
    })

  }
})