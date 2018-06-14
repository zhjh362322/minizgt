var data = require('../../../data/data.js');
var app = getApp();
Page({
  data: {
  
  },

  onLoad: function (options) {
    var p = options.shipper
    var userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo');
    if (userInfo && userInfo.level == 2) {
      var consigner = [];
      var consignee = [];
      var shippers = userInfo.owner.plant.shipper;
      console.log(shippers)
      for(var i = 0; i <= shippers.length - 1; i++) {
        var s = shippers[i];
        if(s.type == 0) {
          consigner.push(s);
          consignee.push(s);
        } else if (s.type == 1) {
          consigner.push(s);
        } else {
          consignee.push(s);
        }
      }
      if(p == 1) {
        this.setData({ shipper: consigner });
      } else {
        this.setData({ shipper: consignee });
      }
    } else {
      wx.showToast({
        title: '请登录加盟商账号',
        icon: 'none'
      })
    }
  }
})