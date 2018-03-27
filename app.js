
import API from "./utils/api.js"
import wilddog from "./utils/wilddog.js"

App({
  data:{
    
  },
  onLaunch: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.$API = API
    this.dogSync = wilddog.sync()

    //登陆认证
    wilddog.auth().signInWeapp().then(user=>{

      console.log(user)
      this.globalData.userInfo =user
      this.globalData.uid = user.uid
      //uid写到本地
      if(wx.getStorageSync('uid')){
        wx.setStorageSync('uid', user.uid)
      } 
     
      //检查是首次登陆,首次就注册，否则获取个人信息
      wilddog.sync().ref('api/users').once('value',res=>{
        let t=res.hasChild(user.uid)
        if (t){
          console.log('已注册')
          this.$API.getUserInfo(user.uid, (res) => {
            this.globalData.userInfo = res.val()
            wx.hideLoading()
          })
        }else{
          console.log('未注册')
          this.$API.addUser(user, () => {
            wx.hideLoading()
          })
        }
      })
    }).catch(err=>{
      console.log('认证出错')
    })
  },
  globalData: {
    userInfo: null,
    uid:null
  }
})