// pages/addInfo/addInfo.js
const App=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate:'选择生日'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //单独获取生日
    App.dogSync.ref('api/users/' + App.globalData.uid+'/birthDay').once('value').then(res=>{
      this.setData({
        currentDate: res.val()||'选择生日'
      })
    })
    //绑定个人信息
    App.dogSync.ref('api/users/' + App.globalData.uid).bindAsObject(this, 'userInfo',  (err)=> {
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
  formReset(){

  },
  formSubmit(e){
    App.$API.updateUserInfo(wx.getStorageSync('uid'), e.detail.value,res=>{
      App.globalData.userInfo = e.detail.value
      wx.navigateBack()
    })
  },
  bindDateChange: function (e) {
    this.setData({
      currentDate: e.detail.value
    })
  },
})