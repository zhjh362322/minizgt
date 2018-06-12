var data = require('../../../data/data.js');
Page({
  data: {
  
  },

  onLoad: function (options) {
    var d = data.shipper;
    var shipper = options.shipper;
    if (d[shipper]) {
      this.setData({
        shipper: d[shipper]
      })
    }
  }
})