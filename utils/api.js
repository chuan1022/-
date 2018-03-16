const API={
    //注册新用户
  addUser(sync, user,success,fail){
    user.regTime = sync.ServerValue.TIMESTAMP
    sync.ref('api/users/' + user.uid).set(user).then(res=>{
        success&&success(res)
      }).catch(err=>{
        console.log(err)
        fail&&fail(err)
      })
    },
    //获取用户信息
    getUserInfo(sync,uid,success) {
      sync.ref('api/users/'+uid).once('value', res => {
        success&&success(res)
      })
    },
    //更新用户信息
    updateUserInfo(sync,uid,data,success){
      data.updateTime = sync.ServerValue.TIMESTAMP
      sync.ref('api/users/' + uid).update(data).then(res=>{
        success(res)
      })
    },
    //添加好友生日
    addFriend(sync, uid, data, success){
      data.addTime = sync.ServerValue.TIMESTAMP
      sync.ref('api/friends/'+uid).push(data).then(res => {
        success(res)
      })
    },
    //获取好友生日列表
    getFriends(sync, uid, success) {
      sync.ref('api/friends/' + uid).once('value',res=>{
        success(res.val())
      })
    },
    //提交反馈
    addIdea(sync, uid,data, success) {
      data.addTime = sync.ServerValue.TIMESTAMP
      sync.ref('api/ideas').push(data, res => {
        success(res)
      })
    },
}

export default API