//index.js
//获取应用实例
const App = getApp()

Page({
  data: {

  },
  //事件处理函数
  addDay: function() {
    wx.navigateTo({
      url: '../addDay/addDay'
    })
  },
  onLoad: function () {
    
  },
  onShow(){
    App.$API.getFriends(App.dogSync, wx.getStorageSync('uid'),res=>{
      console.log(res)
      this.dataList=res
    })
  },
  getUserInfo: function(e) {
   
  }
})
