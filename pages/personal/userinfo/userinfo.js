// 用户个人资料
var app = getApp();
Page({
  data: {
  
  },
  // 展示用户明细数据
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo) {
      this.setData(userInfo);
    }
  }
})