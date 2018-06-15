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
          wx.setStorage({
            key: 'userInfo',
            data: res.data
          })
          wx.reLaunch({
            url: '../personal/personal',
          })
        }
      }
    })

  }
})