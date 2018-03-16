// pages/addInfo/addInfo.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthDay: '0000-00-00',
    info:{
      name:'',
      sex:1,
      phone:'',
      photoURL:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   date: wx.getStorageSync('birthDay') || '0000-00-00'
    // })

    // App.dogSync.ref('api/users/' + App.globalData.uid).bindAsObject(this, 'userInfo', (err) => {
    //   if (err != null) {
    //     // 数据绑定失败，失败原因：err.message;
    //     console.log('err')
    //   } else {
    //     // 数据绑定成功
    //     console.log('绑定成功')
    //   }
    // })
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
  formReset() {

  },
  formSubmit(e) {
    // console.log(this.data.info)
    this.data.info['birthDay'] = this.data.birthDay
    App.$API.addFriend(App.dogSync, wx.getStorageSync('uid'), this.data.info , res => {
      console.log(res)
    })
  },
  bindDateChange: function (e) {
    console.log(this.userInfo)
    this.setData({
      birthDay: e.detail.value
    })
  },
})