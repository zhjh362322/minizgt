// pages/consignment/consignment.js
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
            wx.navigateTo({
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
    var sender = this.data.consignee[e.detail.value].companyName;
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
    order.consigner = this.data.consigner[formData.consigner];
    order.consignee = this.data.consignee[formData.consignee];
    delete formData.consigner;
    delete formData.consignee;
    order.cargo = formData;
    console.log(order)
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