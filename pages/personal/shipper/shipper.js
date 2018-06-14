var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    var p = options.shipper
    var userInfo = app.globalData.userInfo || wx.getStorageSync('userInfo');
    var consigner = [];
    var consignee = [];
    var shippers = userInfo.owner.plant.shipper;
    for (var i = 0; i <= shippers.length - 1; i++) {
      var s = shippers[i];
      if (s.type == 0) {
        consigner.push(s);
        consignee.push(s);
      } else if (s.type == 1) {
        consigner.push(s);
      } else {
        consignee.push(s);
      }
    }
    if (p == 1) {
      this.setData({ shipper: consigner });
    } else {
      this.setData({ shipper: consignee });
    }

  }
})