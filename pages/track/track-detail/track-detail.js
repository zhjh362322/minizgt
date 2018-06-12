var util = require('../../../utils/util.js');
Page({
  data: {},
  onLoad: function (options) {
    var waybillno = options.waybillno;
    var records = wx.getStorageSync("records");
    var record = {};
    // 根据传入的参数，获取本页明细数据
    for (var i = 0; i <= records.length - 1; i++) {
      if (records[i].waybillNo === waybillno) {
        record = records[i];
        break;
      }
    }
    // length为0时，是无效单号
    var length = record.data.length;
    // 计算有效单号耗时时间
    if (length) {
      var startTime = new Date(record.data[0].BusinessTime);
      // 已签收状态使用时间到签收为止， 未签收的从录单到当前时间
      var lastTime = record.stateType == '7-已签收' ? new Date(record.data[length - 1].BusinessTime) : new Date();
      var usedTime = util.getInervalHour(startTime, lastTime);
      record.usedTime = '耗时' + usedTime + '小时';
    } else {
      record.usedTime = '';
    }
    // 使最新动态在最上面
    record.data = record.data.reverse();
    this.setData({
      record: record
    })
  }
})