var userInfo = {
  avatarUrl: "/images/avatar/1.png",
  nickName: "温水煮青蛙",
  belong: "重庆正广通供应链管理有限公司",
  account: "150800000",
  claim: 5,
  orderNum: 5000000,
  name: "张大牛"
}
var shipper = {
  consigner: [{
    contacts: "张三",
    cellphone: "15070096571",
    companyName: "大都国际",
    address: "在计算机科学中，内存中每个用于数据存取的基本单位，都被赋予一个唯一的序号，称为地址，也叫做内存地址。内"
  }, {
    contacts: "赵四",
    cellphone: "88342326571",
    companyName: "世纪天成",
    address: "北京"
  }],
  consignee: [{
    contacts: "王五",
    cellphone: "23423658791",
    companyName: "平衡木木",
    address: "深圳"
  }]
}
module.exports = {
  userInfo: userInfo,
  shipper: shipper
}