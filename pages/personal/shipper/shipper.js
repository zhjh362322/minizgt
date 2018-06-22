// 收发货人
var app = getApp();
Page({
  data: {

  },
  // 区分收发货人，并初始化数据
  onLoad: function (options) {
    var that = this;
    var p = options.shipper
    // 发货人
    if (p == 1) {
      wx.getStorage({
        key: 'consigner',
        success: function(res) {
          that.setData({ shipper:  res.data})
        },
      })
    // 收货人
    } else {
      wx.getStorage({
        key: 'consignee',
        success: function (res) {
          that.setData({ shipper: res.data })
        },
      })
    }
  }
})