// pages/quotation/quotation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getStartCity: function(e) {
    this.setData({
      startCity: e.detail.value
    })
  },
  getEndCity: function (e) {
    this.setData({
      endCity: e.detail.value
    })
  },
  change: function(e) {
    var startCity = this.data.startCity;
    var endCity = this.data.endCity;
    this.setData({
      startCity: endCity,
      endCity: startCity
    })
  },
  getLine: function(e) {
    
  },
  bindSend: function(e) {
    wx.navigateTo({
      url: '../consignment/consignment',
    })
  },
  showDetail: function(e) {
    wx.navigateTo({
      url: './quotation-detail/quotation-detail',
    })
  }
})