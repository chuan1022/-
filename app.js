
import API from "./utils/api.js"
import wilddog from "./utils/wilddog.js"

const wilddogConfig = {
  syncURL: 'https://wd0357140339efzklz.wilddogio.com',
  authDomain: 'wd0357140339efzklz.wilddog.com'
}
//app.js
App({
  data:{
    
  },
  onLaunch: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.$API = API
    //登陆
    wilddog.initializeApp(wilddogConfig)
    this.dogSync=wilddog.sync()
    //认证
    wilddog.auth().signInWeapp().then(user=>{

      console.log(user)
      this.globalData.userInfo =user
      this.globalData.uid = user.uid
      wx.setStorageSync('uid', user.uid)
      //检查是否注册,没注册就注册
      this.dogSync.ref('api/users/' + user.uid).once('value',res=>{
        if(!res.val()){
          this.$API.addUser(this.dogSync,user,()=>{
            wx.hideLoading()
          })
        }else{
          this.$API.getUserInfo(this.dogSync, user.uid, (res) => {
            this.globalData.userInfo = res.val()
            wx.hideLoading()
          })
        }
      })
    }).catch(err=>{
      console.log('认证出错')
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // console.log(res)
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }else{
    //       //获取授权
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    uid:null
  }
})