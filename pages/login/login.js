// 登录
import WxValidate from '../../utils/WxValidate.js';
var app = getApp();
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  formSubmit: function(e) {
    this.getValidate();
    var validate = this.data.validate;
    // 填写不符合要求
    if (!validate.checkForm(e)) {
      var error = validate.errorList;
      this.setData({ error: error })
    } else {
      this.setData({ error: [] })
      var that = this;
      // {from: 'mini', uid: '', password: ''}
      var params = e.detail.value;
      params.from = 'mini';
      // 根据账号类型，返回账号信息、子公司信息、加盟商信息、客户信息
      wx.request({
        url: app.globalData.host + '/login',
        data: params,
        method: 'POST',
        success: function (res) {
          console.log(res)
          // code=0账号密码不匹配
          if (res.data.code == 0) {
            that.setData({
              err: res.data.msg
            })
          } else {
            // 根据帐号类型作处理，level是加盟商，信息比较多
            app.globalData.hasUserInfo = true;
            if (res.data.level === 2) {
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
    }
  },
  // 提取处理登录时获取的数据
  addStorage: function (data) {
    var shippers = data.owner.plant.shipper;
    var userInfo = {};
    var consigner = [];
    var consignee = [];
    // 根据客户类型区分收、发货人
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
  },
  register: function(e) {
    wx.navigateTo({
      url: '../basic/newPlant/newPlant',
    })
  },
  getValidate: function () {
    var rules = {
      uid: {
        required: true
      }
    }
    var message = {
      uid: {
        required: '请输入用户名'
      }
    }
    var validate = new WxValidate(rules, message);
    this.setData({
      validate: validate
    })
  }
})