
import wilddog from "./wilddog.js"

const wilddogConfig = {
  syncURL: 'https://wd0357140339efzklz.wilddogio.com',
  authDomain: 'wd0357140339efzklz.wilddog.com'
}

wilddog.initializeApp(wilddogConfig)

const sync = wilddog.sync();

const API={
    //注册新用户
  addUser(user,success,fail){
    user.regTime = sync.ServerValue.TIMESTAMP
    sync.ref('api/users/' + user.uid).set(user).then(res=>{
        success&&success(res)
      }).catch(err=>{
        console.log(err)
        fail&&fail(err)
      })
    },
    //获取用户信息
    getUserInfo(uid,success) {
      sync.ref('api/users/'+uid).once('value', res => {
        success&&success(res)
      })
    },
    //更新用户信息
    updateUserInfo(uid,data,success){
      data.updateTime = sync.ServerValue.TIMESTAMP
      sync.ref('api/users/' + uid).update(data).then(res=>{
        success(res)
      })
    },
    //添加好友生日
    addFriend( uid, data, success){
      data.addTime = sync.ServerValue.TIMESTAMP
     
      sync.ref('api/friends/'+uid).push(data).then(res => {
        
        success(res)
      })
    },
    //删除好友
    delFriend(uid,id,success,fail){
      sync.ref('api/friends/' + uid).once('value').then(res=>{
        if(res.hasChild(id)){
          sync.ref('api/friends/' + uid + '/' + id).remove().then(res => {
            success(res)
          })
        }else{
          fail()
        }
      })
      
    },
    //获取好友生日列表
    getFriends(uid, success) {
      
      sync.ref('api/friends/' + uid).once('value',res=>{
        let data=res.val()
        for(let attr in data){
          let birthDayArray = data[attr].birthDay.split('-')
          let birthDay = {
            Y: birthDayArray[0],
            M: birthDayArray[1],
            D: birthDayArray[2],
          }
          let nowDate = {
            Y: new Date().getFullYear(),
            M: new Date().getMonth() + 1,
            D: new Date().getDate(),
          }
          //下次生日的年份
          let lastYear = nowDate.M > birthDay.M || (nowDate.M == birthDay.M && nowDate.D > birthDay.D) ? nowDate.Y + 1 : nowDate.Y
          data[attr].currentBirthDay = Date.parse(lastYear + '-' + birthDay.M + '-' + birthDay.D)   //时间戳
          data[attr].currentBirthDayString = new Date(lastYear + '-' + birthDay.M + '-' + birthDay.D).toLocaleDateString()  //时间字符串
          data[attr].lastDays = Math.ceil((data[attr].currentBirthDay - new Date().getTime()) / (24 * 60 * 60 * 1000))      //剩余天数
        }
        
        success(data)
      })
    },
    //提交反馈
    addIdea(uid,data, success) {
      data.addTime = sync.ServerValue.TIMESTAMP
      sync.ref('api/ideas').push(data, res => {
        success(res)
      })
    },
}

export default API