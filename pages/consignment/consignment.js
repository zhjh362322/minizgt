// 下单
var app = getApp();
import WxValidate from '../../utils/WxValidate.js';
Page({
  data: {
    sender: '发货人',
    receiver: '收货人'
  },
  // 根据登录帐号确定该页面流程
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    // if已登录加盟商帐号，else未登录或登录其他类型帐号
    if (userInfo && userInfo.level == 2) {
      this.getValidate();
      var consigner = wx.getStorageSync('consigner');
      var consignee = wx.getStorageSync('consignee');
      this.setData({
        unitprice: options.unitprice || 0,
        consigner: consigner,
        consignee: consignee,
        uid: userInfo._id
      })
    } else {
      wx.showModal({
        title: '请先登录加盟商账号',
        content: '',
        success: function (res) {
          if (res.confirm) {
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
  // 设置发货人选择器数据
  chooseConsigner: function (e) {
    var consigner = this.data.consigner[e.detail.value].companyName;
    this.setData({
      sender: consigner
    })
  },
  // 设置收货人选择器数据
  chooseConsignee: function (e) {
    if (this.data.consignee) {
      var consignee = this.data.consignee[e.detail.value].companyName;
      this.setData({
        receiver: consignee
      })
    }
  },
  // 提交表单
  sendOrder: function (e) {
    var validate = this.data.validate;
    // 填写不符合要求
    if (!validate.checkForm(e)) {
      var error = validate.errorList;
      this.setData({ error: error })
    } else { // 填写正确
      var formData = e.detail.value;
      var order = {};
      // 货物信息
      var cargo = {};
      cargo.cargoName = formData.cargoName;
      cargo.num = formData.num;
      cargo.weight = formData.weight;
      cargo.volume = formData.volume;
      // 运单信息
      order.cargo = cargo;
      order.from = 'mini';
      order.uid = this.data.uid;
      order.price = formData.price;
      var consigner = this.data.consigner[formData.consigner];
      var consignee = this.data.consignee[formData.consignee];
      order.consigner = consigner['_id'];
      order.consignee = consignee['_id'];
      // 向服务器发送POST请求，新增运单，并跳转运单列表
      wx.request({
        url: app.globalData.host + '/consignment',
        data: order,
        method: 'POST',
        success: function (res) {
          var rst = res.data;
          // 添加成功，设置缓存并跳转列表
          wx.setStorage({
            key: 'orderList',
            data: rst,
            success: function () {
              wx.reLaunch({
                url: '../orderList/orderList',
              })
            }
          })
        }
      })
    }

  },
  // 计算预估费用，暂时根据件数计算
  cost: function (e) {
    var payable = this.data.unitprice * e.detail.value;
    if (payable) {
      this.setData({
        payable: payable
      })
    }
  },
  getValidate: function () {
    var rules = {
      consigner: {
        required: true
      },
      consignee: {
        required: true
      },
      cargoName: {
        required: true
      },
      num: {
        digits: true
      },
      weight: {
        digits: true
      },
      volume: {
        digits: true
      },
      price: {
        digits: true
      }
    }
    var message = {
      consigner: {
        required: '请选择发货人'
      },
      consignee: {
        required: '请选择收货人'
      },
      cargoName: {
        required: '请填写货物名称'
      },
      num: {
        digits: '件数需要数值'
      },
      weight: {
        digits: '重量需要数值'
      },
      volume: {
        digits: '体积需要数值'
      },
      price: {
        digits: '预估费用需要数值'
      }
    }
    var validate = new WxValidate(rules, message);
    this.setData({
      validate: validate
    })
  }
})