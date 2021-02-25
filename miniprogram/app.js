//app.js
App({
  onLaunch: function () {
    this.globalData = {
      openid:null,
      loginin:false,
      n:0,
      x:0,
      y:0,
      z:0,
      gx:0,
      gy:0,
      gz:0
    }
    wx.onAccelerometerChange((res) => { 

      console.log("加速度")
      // 获得的原始加速度
      var x = res.x;
      var y = res.y;
      var z = res.z; 

      //利用公式求出方位角 并求出去重力加速度的加速度
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

      this.globalData.x = x;
      this.globalData.y = y;
      this.globalData.z = z;
      this.globalData.gx = minus_x;
      this.globalData.gy = minus_y;
      this.globalData.gz = minus_z;
     // console.log(x+" "+y+" "+z+minus_x+" "+minus_y+" "+minus_z);
    });
    console.log("what");
    // if(true){
    //   console.log("login in successfully");
    //   var n = 0;
    //   let data = [];
    //   setInterval(function(){
    //     if(n == 56){
    //       console.log(data);
    //       data = [];
    //       n = 0;
    //     }else{
    //       data.push(this.globalData.openid,this.globalData.x,this.globalData.y,this.globalData.z,this.globalData.gx,this.globalData.gy,this.globalData.gz,'\r\n');
    //       n = n+1;
    //     }
    //   },60)
    // }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
  }
})
