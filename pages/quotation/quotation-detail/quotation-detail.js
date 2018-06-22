// 报价明细
Page({

  data: {
  
  },
  // 当前点击的报价明细数据
  onLoad: function (options) {
    var qid = options.qid;
    var quotation = wx.getStorageSync("quotation");
    var q = {};
    for(var i = 0; i < quotation.length; ++i) {
      if(quotation[i]._id === qid) {
        q = quotation[i];
        break;
      }
    }
    this.setData({
      q: q
    })
  },
  // 发货
  bindSend: function (e) {
    var unitprice = e.currentTarget.dataset.unitprice;
    wx.navigateTo({
      url: '../../consignment/consignment?unitprice=' + unitprice,
    })
  },
})