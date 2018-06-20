var app = getApp();
Page({
  data: {
    sender: '发货人',
    receiver: '收货人',
    payable: 100
  },
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo && userInfo.level == 2) {
      var consigner = wx.getStorageSync('consigner');
      var consignee = wx.getStorageSync('consignee');
      this.setData({
        consigner: consigner,
        consignee: consignee
      })
    } else { 
      wx.showModal({
        title: '请先登录加盟商账号',
        content: '',
        success: function(res) {
          if(res.confirm) {
            wx.redirectTo({
              url: '../login/login',
            })
          } else {
            wx.navigateBack({
              delta: 0
            })
          }
        }
      })
      
    }
  },
  chooseConsigner: function(e) {
    var sender = this.data.consigner[e.detail.value].companyName;
    this.setData({
      sender: sender
    })
  },
  chooseConsignee: function(e) {
    var receiver = this.data.consignee[e.detail.value].companyName;
    this.setData({
      receiver: receiver
    })
  },
  sendOrder: function(e) {
    var formData = e.detail.value;
    var order = {};
    order.from = 'mini';
    order.price = formData.price;
    var consigner = this.data.consigner[formData.consigner];
    var consignee = this.data.consignee[formData.consignee];
    order.consigner = consigner['_id'];
    order.consignee = consignee['_id'];
    delete formData.consigner;
    delete formData.consignee;
    order.cargo = formData;
    console.log(order)
    wx.request({
      url: app.globalData.host + '/consignment',
      data: order,
      method: 'POST',
      success: function (res) {
        var rst = res.data;
        wx.setStorage({
          key: 'orderList',
          data: rst,
          success: function() {
            wx.redirectTo({
              url: '../orderList/orderList',
            })
          }
        })
      }
    })
  },
  getPickerData: function(data) {
    var arr = [];
    for (var i = 0; i < data.length; ++i) {
      var obj = {};
      obj.id = data[i]._id;
      obj.name = data[i].companyName;
      arr.push(obj);
    }
    return arr;
  }
})