// pages/center/center.js
const App=getApp()
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
    App.dogSync.ref('api/users/' + App.globalData.uid).bindAsObject(this, 'userInfo', function (err) {
      if (err != null) {
        // 数据绑定失败，失败原因：err.message;
        console.log('err')
      } else {
        // 数据绑定成功
        console.log('绑定成功')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  addUserInfo(){
    wx.navigateTo({
      url: '../addInfo/addInfo',
    })
  },
  addIdea(){
    wx.navigateTo({
      url: '../addIdea/addIdea',
    })
  }
})