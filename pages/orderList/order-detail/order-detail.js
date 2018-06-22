// 运单明细
Page({
  data: {
    isModel: false
  },
  // 明细数据setData
  onLoad: function (options) {
    // oid 明细数据ID
    var oid = options.oid;
    var orderList = wx.getStorageSync('orderList');
    var order = {};
    for(var i = 0; i < orderList.length; ++i) {
      if(orderList[i]._id === oid) {
        order = orderList[i];
        break;
      }
    }
    this.setData({
      order: order,
      note: order.note ? order.note : ''
    })
  },
  // 显示备注弹窗
  addNode: function() {
    this.setData({
      isModel: true
    })    
  },
  // 获取备注输入的内容
  getNote: function(e) {
    var note = e.detail.value;
    this.setData({
      noteInputValue: note
    })
  },
  // 取消备注输入，关闭备注弹框
  noteCancel: function(e) {
    this.setData({
      isModel: false
    })
  },
  // 确认备注内容
  noteConfirm: function(e) {
    var note = this.data.noteInputValue;
    if (note) {
      var oid = e.currentTarget.dataset.id;
      var orderList = wx.getStorageSync('orderList');
      for (var i = 0; i < orderList.length; ++i) {
        if (orderList[i]._id === oid) {
          orderList[i].note = note;
          break;
        }
      }
      // 更新缓存
      wx.setStorage({
        key: 'orderList',
        data: orderList,
      })
    }
    this.setData({
      isModel: false,
      note: note
    })
  }
})