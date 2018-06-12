var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {},
  // 从缓存中加载查询历史
  onLoad: function (options) {
    this.setData({
      records: wx.getStorageSync('records') || []
    })
  },
  // 获取input框中内容，访问参数，控制icon显示隐藏
  inputNo: function(e) {
    this.setData({
      waybillNo: e.detail.value
    })
  },
  // 删除input中的数据
  clearNo: function(e) {
    this.setData({
      waybillNo: ''
    })
  },
  // 根据输入单号查询跟踪轨迹
  searchTrack: function(e) {
    var waybillNo = this.data.waybillNo;
    this.getRecords(waybillNo);
  },
  scanNo: function(e) {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        // that.setData({
        //   waybillNo: res.result
        // })
        that.getRecords(res.result);
      }
    })
  },
  showDetail: function(e) {
    var waybillno = e.currentTarget.dataset.waybillno;
    wx.navigateTo({
      url: './track-detail/track-detail?waybillno=' + waybillno
    })
  },
  getRecords: function (waybillNo) {
    var that = this;
    // 访问地址
    var path = app.globalData.host + "/searchOrder";
    var param = "?waybillNo=" + waybillNo;
    var url = path + param;
    // 填充无记录时数据。如果返回数据code等于0或者-1，说明服务器没有对应记录
    var record = {
      stateType: '',
      companyName: '无',
      searchTime: util.formatDate(new Date()),
      waybillNo: waybillNo,
      note: '无结果！',
      data: []
    };
    // 请求数据
    wx.request({
      url: url,
      success: function (res) {
        var rst = res.data;
        // code大于0说明返回正常结果
        if (rst.code > 0) {
          var recordLength = rst.data.data.length;
          record.stateType = rst.data.waybill.StateType;
          record.companyName = rst.data.waybill.CompanyName;
          record.searchTime = util.formatDate(new Date());
          record.waybillNo = rst.data.waybill.WaybillNo;
          record.note = rst.data.data[recordLength - 1].Note;
          record.data = rst.data.data;
        }
        // 把访问结果添加到缓存中，并更新历史记录列表。数据驱动，setData后页面自动更新
        var records = wx.getStorageSync('records') || [];
        records.unshift(record);
        wx.setStorageSync('records', records)
        that.setData({
          records: records
        })
      }
    })
  }
})