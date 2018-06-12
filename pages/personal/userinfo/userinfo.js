var app = getApp();
Page({

  data: {
  
  },

  onLoad: function (options) {
    var userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo');
    if(userInfo) {
      this.setData(userInfo);
    }
  }
})