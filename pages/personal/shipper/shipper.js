var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    var that = this;
    var p = options.shipper

    if (p == 1) {
      wx.getStorage({
        key: 'consigner',
        success: function(res) {
          that.setData({ shipper:  res.data})
        },
      })
      
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