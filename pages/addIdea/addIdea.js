// pages/addIdea/addIdea.js

const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindFormSubmit(e){
    let data={
      idea: e.detail.value.idea,
      uid: wx.getStorageSync('uid')
    }
    App.$API.addIdea(App.dogSync, data.uid,data,(res)=>{
      wx.showToast({
        icn:'success',
        title:'谢谢你的反馈'
      })
      setTimeout(()=>{
        wx.navigateBack()
      },1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})