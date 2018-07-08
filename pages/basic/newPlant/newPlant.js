var app = getApp();
import WxValidate from '../../../utils/WxValidate.js';
Page({

  data: {
    index: 0
  },
  onLoad: function (options) {
    var that = this;
    var company = wx.getStorageSync('company');
    if (company) {
      this.setData({
        company: company
      })
    } else {
      wx.request({
        url: app.globalData.host + '/company',
        success: function (res) {
          wx.setStorageSync('company', res.data);
          that.setData({
            company: res.data
          })
        }
      })
    }  
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
        required: true,
        tel: true
      },
      name: {
        required: true
      },
      email: {
        email: true
      }
    }
    var message = {
      cellphone: {
        required: '请填写手机号',
        tel: '请输入正确的手机号'
      },
      name: {
        required: '请填写姓名'
      },
      email: {
        email: '请输入正确的邮箱'
      }
    }
    var validate = new WxValidate(rules, message);
    this.setData({
      validate: validate
    })
  }
})