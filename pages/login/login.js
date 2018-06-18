var app = getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  formSubmit: function(e) {
    var that = this;
    // {from: 'mini', uid: '', password: ''}
    var params = e.detail.value;
    params.from = 'mini';
    // 根据账号类型，返回账号信息、子公司信息、加盟商信息、客户信息
    wx.request({
      url: app.globalData.host + '/login',
      data: params,
      method: 'POST',
      success: function(res) {
        // code=0账号密码不匹配
        if(res.data.code == 0) {
          that.setData({
            err: res.data.msg
          })
        } else {
          app.globalData.hasUserInfo = true;
          if(res.data.level === 2) {
            that.addStorage(res.data);
          } else {
            wx.setStorage({
              key: 'userInfo',
              data: res.data
            })
          }
          
          wx.reLaunch({
            url: '../personal/personal',
          })
        }
      }
    })
  },
  addStorage: function (data) {
    var shippers = data.owner.plant.shipper;
    var userInfo = {};
    var consigner = [];
    var consignee = [];
    for (var i = 0; i < shippers.length; ++i) {
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
    wx.setStorage({
      key: 'consigner',
      data: consigner,
    })
    wx.setStorage({
      key: 'consignee',
      data: consignee,
    })
    delete data.owner.plant.shipper;
    
    wx.setStorage({
      key: 'userInfo',
      data: data
    })
  }
})