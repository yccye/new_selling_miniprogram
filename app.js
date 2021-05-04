// app.js
App({
  onLaunch() {
    wx.onAccelerometerChange((res) => { 
      console.log("加速度")
      var x = res.x;
      var y = res.y;
      var z = res.z; 
      var pitch = Math.atan2(y,z)*(180/Math.PI);
      var roll = Math.atan2(-x,Math.sqrt(y*y+z*z))*(180/Math.PI);
      x*=0.98;
      y*=0.98;
      z*=0.98;
      roll = (-roll)*(180/Math.PI);
      pitch = (Math.PI-pitch)*(180/Math.PI);
      var minus_z = z-0.98*Math.cos(roll)-9.8*Math.cos(pitch);
      var minus_x = x-0.98*Math.sin(roll);
      var minus_y = y-0.98*Math.sin(pitch);
      console.log(x+" "+y+" "+z+minus_x+" "+minus_y+" "+minus_z);
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    isIn:false,
    userInfo: null,
    appid: 'wx9150db47bfc789a0', //appid
    secret: '64cd85a****************2c75dfd5', //secret
    amapKey: '6ef95**********************92021bdf14', //高德地图key
  },
  /**获取OpenID */
  getOpenId: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              wx.setStorageSync('userInfo', res.userInfo); //存储userInfo
            }
          });
          //这里存储了appid、secret、token串  
          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + that.globalData.appid + '&secret=' + that.globalData.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
          wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              var obj = {};
              obj.openid = res.data.openid;
              obj.expires_in = Date.now() + res.data.expires_in;
              console.log(obj);
              wx.setStorageSync('user', obj); //存储openid  
              that.globalData.openid = res.data.openid;
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
