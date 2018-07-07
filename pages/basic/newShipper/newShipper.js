var QQMapWX = require('../../../libs/qqmap-wx-jssdk.min.js');
import WxValidate from '../../../utils/WxValidate.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: ['收发货单位', '发货单位', '收货单位'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 实例化腾讯地图API核心类
    var qqmapsdk = new QQMapWX({
      key: '65LBZ-354WV-J7KPW-U43EU-UO7U5-2WFUC' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            var address = res.result.formatted_addresses.recommend;
            var region = res.result.address_component;
            that.setData({
              region: [region.province, region.city, region.district],
              address: address
            })
          }
        })
      }
    })
  },
  chooseRegion: function(e) {
    var region = e.detail.value;
    this.setData({
      region: region
    })
  },
  chooseType: function(e) {
    var idx = e.detail.value;
    this.setData({
      index: idx
    })
  },
  chooseLocation: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        var address = res.address + " " + res.name;
        that.setData({
          address: address
        })
      }
    })
  },
  newShipper: function (e) {
    this.getValidate();
    var validate = this.data.validate;
    if (!validate.checkForm(e)) {
      var error = validate.errorList;
      this.setData({ error: error })
    } else {
      var formData = e.detail.value;
      var userInfo = wx.getStorageSync('userInfo');
      var plant = userInfo.owner.plant._id;
      formData.plant = plant;
      wx.request({
        url: app.globalData.host + '/shipper',
        data: formData,
        method: 'POST',
        success: function (res) {
          var rst = res.data;
          // 添加成功，设置缓存并跳转列表
          var consigner = wx.getStorageSync('consigner');
          var consignee = wx.getStorageSync('consignee');
          if (rst.type == 0) {
            consigner.push(rst);
            consignee.push(rst);
          } else if (rst.type == 1) {
            consigner.push(rst);
          } else {
            consignee.push(rst);
          }
          wx.setStorage({
            key: 'consigner',
            data: consigner,
          })
          wx.setStorage({
            key: 'consignee',
            data: consignee,
          })
          wx.navigateBack({
            delta: 2
          })
        }
      })
    }
  },
  getValidate: function () {
    var rules = {
      companyName: {
        required: true
      },
      contacts: {
        required: true
      },
      cellphone: {
        required: true
      },
      type: {
        digits: true
      }
    }
    var message = {
      companyName: {
        required: '请填写客户名称'
      },
      contacts: {
        required: '请填写联系人'
      },
      cellphone: {
        required: '请填写联系电话'
      },
      type: {
        digits: '请选择客户类型'
      }
    }
    var validate = new WxValidate(rules, message);
    this.setData({
      validate: validate
    })
  }
})