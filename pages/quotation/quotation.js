var app = getApp();
Page({
  data: {
  
  },
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
    var param = "?from=mini&" + "startCity=" + this.data.startCity + "&endCity=" + this.data.endCity;
    var path = "/quotation";
    var url = app.globalData.host + path + param;
    console.log(url)
    wx.request({
      url: url,
      success: function(res) {
        var rst = res.data;
        console.log(rst)
      }
    })
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