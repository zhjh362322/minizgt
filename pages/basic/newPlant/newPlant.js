var app = getApp();
import WxValidate from '../../../utils/WxValidate.js';
Page({

  data: {
    index: 0
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/company',
      success: function(res) {
        wx.setStorageSync('company', res.data);
        that.setData({
          company: res.data
        })
      }
    })
  },
  chooseCompany: function(e) {
    var idx = e.detail.value;
    this.setData({
      index: idx
    })
  },
  register: function(e) {
    this.getValidate();
    var validate = this.data.validate;
    if (!validate.checkForm(e)) {
      var error = validate.errorList;
      this.setData({ error: error })
    } else {
      var formData = e.detail.value;
      wx.request({
        url: app.globalData.host + '/plant',
        data: formData,
        method: 'POST',
        success: function (res) {
          var rst = res.data;
          wx.reLaunch({
            url: '../../personal/personal'
          })
        }
      })
    }
  },
  getValidate: function () {
    var rules = {
      cellphone: {
        required: true
      },
      name: {
        required: true
      }
    }
    var message = {
      cellphone: {
        required: '请填写用户名'
      },
      name: {
        required: '请填写姓名'
      }
    }
    var validate = new WxValidate(rules, message);
    this.setData({
      validate: validate
    })
  }
})