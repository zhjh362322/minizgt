// 运单列表
var app = getApp();
Page({
  data: {
  
  },
  // 直接点订单按钮，和新增运单后跳转两个方式进入
  onLoad: function (options) {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    // 缓存中已有运单列表，直接使用。 新增运单后设置的缓存
    if(userInfo.level == 2) {
      var path = app.globalData.host + "/consignment";
      var param = "?from=mini&uid=" + userInfo._id;
      wx.request({
        url: path + param,
        success: function(res) {
          that.setData({
            orderList: res.data
          })
          wx.setStorage({
            key: 'orderList',
            data: res.data
          })
        }
      })
    // 非加盟商帐号，没有订单
    } else {
      wx.showToast({
        title: '请登录加盟商帐号',
      })
    }
  },
  // 跳转下单页面
  bindSend: function() {
    wx.navigateTo({
      url: '../consignment/consignment',
    })
  },
  // 查看运单明细
  showDetail: function(e) {
    var oid = e.currentTarget.dataset.oid;
    wx.navigateTo({
      url: './order-detail/order-detail?oid=' + oid,
    })
  }
})