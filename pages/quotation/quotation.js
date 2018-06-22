// 线路报价
var app = getApp();
Page({
  data: {
  
  },
  // 的查询历史的，就显示
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'quotation',
      success: function(res) {
        that.setData({
          quotation: res.data
        })
      },
    })
  },
  // 输入的起站数据
  getStartCity: function(e) {
    this.setData({
      startCity: e.detail.value
    })
  },
  // 输入的到站数据
  getEndCity: function (e) {
    this.setData({
      endCity: e.detail.value
    })
  },
  // 转换起站到站
  change: function(e) {
    var startCity = this.data.startCity;
    var endCity = this.data.endCity;
    this.setData({
      startCity: endCity,
      endCity: startCity
    })
  },
  // 获取线路报价数据
  getLine: function(e) {
    var that = this;
    // 组装GET请求
    var param = "?from=mini";
    if (this.data.startCity) {
      param += "&startCity=" + this.data.startCity;
    }
    if (this.data.endCity) {
      param += "&endCity=" + this.data.endCity;
    }
    var path = "/quotation";
    var url = app.globalData.host + path + param;
    // 发送查询请求
    wx.request({
      url: url,
      success: function(res) {
        var rst = res.data;
        that.setData({
          quotation: rst
        })
        wx.setStorage({
          key: 'quotation',
          data: rst,
        })
      }
    })
  },
  // 发货
  bindSend: function(e) {
    var unitprice = e.currentTarget.dataset.unitprice;
    wx.navigateTo({
      url: '../consignment/consignment?unitprice=' + unitprice,
    })
  },
  // 线路明细
  showDetail: function(e) {
    var qid = e.currentTarget.dataset.qid;
    wx.navigateTo({
      url: './quotation-detail/quotation-detail?qid=' + qid
    })
  }
})