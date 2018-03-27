//index.js
//获取应用实例
const App = getApp()

Page({
  data: {
    photoFilter:{
      0:'../../assets/icon/girl.png',
      1:'../../assets/icon/boy.png',
      defaultPhoto: '../../assets/icon/icon2-1.png'
    },
    showCardHandles:false
  },
  //事件处理函数
  addDay: function() {
    wx.navigateTo({
      url: '../addDay/addDay?type=add'
    })
  },
  onLoad: function () {
    let uid = wx.getStorageSync('uid')
    if (uid) { 
      this.getFriends(uid)
    }
    // App.dogSync.ref('api/friends/' + uid).bindAsArray(this, 'friends', function (err) {
    //   if (err != null) {
    //     // 数据绑定失败，失败原因：err.message;
    //     console.log('err')
    //   } else {
    //     // 数据绑定成功
    //     console.log('friends绑定成功')
    //   }
    // })
  },
  onShow(options){
    this.getFriends(wx.getStorageSync('uid'))
  },
  getFriends(uid){
    App.$API.getFriends(uid,res=>{
      this.setData({
        friendsList: res
      })
    })
  },
  //显示操作框
  handleLongPress(ev){
    console.log(ev)
    let x = ev.detail.x
    let y = ev.detail.y
    let id=ev.currentTarget.dataset.id
    this.setData({
      btnX:x,
      btnY:y,
      handleId:id
    })
    this.showCardHandle()
  },
  showCardHandle(){
    this.setData({
      showCardHandles: true
    })
  },
  hideCardHandle(){
    this.setData({
      showCardHandles: false
    })
  },
  //删除操作
  delFriendHandle(){
    this.delFriend()
    this.hideCardHandle()
  },
  delFriend(){
    if (this.data.handleId) {
      wx.showModal({
        title: '提示',
        content: '真的要删除吗？',
        success: res => {
          console.log(res)
          if (res.confirm) {
            App.$API.delFriend(wx.getStorageSync('uid'), this.data.handleId, res => {
              wx.showToast({
                title: '删除成功',
              })
              this.getFriends(wx.getStorageSync('uid'))
            }, err => {
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            })
          }
        }
      })
    }
  },
  //编辑操作
  editFriend(){
    wx.navigateTo({
      url: '../addDay/addDay?type=edit&id='+this.data.handleId,
    })
  }
})
