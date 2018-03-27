// pages/addInfo/addInfo.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthDay: '选择生日'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      type: options.type
    })
    if(options.type=='add'){
       //添加新生日
      
    }else if(options.type=='edit'){
      //编辑旧生日
      
    }
  
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
    if (this.data.type=='add'){
      this.addFriend(e.detail.value)
    }else{
      
    }
  },

  //add
  addFriend(para){
    App.$API.addFriend(wx.getStorageSync('uid'), para, res => {
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
      setTimeout(()=>{
        wx.navigateBack({
          url:'?update=true'
        })
      },1500)
    })
  },
  //edit
  editFriend() {
   
  },
  bindDateChange: function (e) {
    this.setData({
      birthDay: e.detail.value
    })
  },
})