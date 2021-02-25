// miniprogram/pages/TabPage/home_tab/home_tab.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 功能按键
    categoryList:{
      pageone:[{
        id: 1,
        name: "呼叫导购员",
        src: "/pages/images/1.png"
      }, {
        id: 2,
        name: "进店扫码",
        src: "/pages/images/2.png"
      }]
    },
    selected: 0,
    mask1Hidden: true,
    mask2Hidden: true,
    animationData: "",
    location: "",
    characteristicSelected: [false,false,false,false,false,false,false],
    discountSelected:null,
    selectedNumb: 0,
    sortSelected: "综合排序"
  },
  // 用于首页的功能点击实现函数 使用id号来区分不同的方法
  onServiceClick: function (event) {
    var id = event.target.dataset.postid;
    if(id==2){
      //扫码成功 将用户标记为进入用户
      wx.scanCode({
        onlyFromCamera: true,
        success(res){
          app.globalData.loginin = true;
          console.log(app.globalData.loginin);
        }
      })
      //获取用户openid
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.openid = res.result.openid
          console.log(app.globalData.openid);
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
      // 扫码成功后 开始记录并定期上传加速度
      wx.startAccelerometer({
        interval: 'ui',
      });
      if(true){
        console.log("login in successfully");
        var n = 0;
        let data = [];
        setInterval(function(){
          if(n == 56){
            console.log(data);
            data = [];
            n = 0;
          }else{
            data.push(app.globalData.openid,app.globalData.x,app.globalData.y,app.globalData.z,app.globalData.gx,app.globalData.gy,app.globalData.gz,'\r\n');
            n = n+1;
          }
        },60)
      }
    }
  },
  clearSelectedNumb: function () {
    this.setData({
      characteristicSelected: [false],
      discountSelected: null,
      selectedNumb: 0
    })
  },
  characteristicSelected: function (e) {
    var info = this.data.characteristicSelected;
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index];
    this.setData({
      characteristicSelected: info,
      selectedNumb: this.data.selectedNumb + (info[e.currentTarget.dataset.index]?1:-1)
    })
    console.log(e.currentTarget.dataset.index);
  },
  discountSelected: function (e) {
    if (this.data.discountSelected != e.currentTarget.dataset.index){
      this.setData({
        discountSelected: e.currentTarget.dataset.index,
        selectedNumb: this.data.selectedNumb+(this.data.discountSelected==null?1:0)
      })
    }else{
      this.setData({
        discountSelected: null,
        selectedNumb: this.data.selectedNumb - 1
      })
    }
  },
  onTapTag: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    });
  },
  mask1Cancel: function () {
    this.setData({
      mask1Hidden: true
    })
  },
  mask2Cancel: function () {
    this.setData({
      mask2Hidden: true
    })
  },
  onOverallTag: function () {
    this.setData({
      mask1Hidden: false
    })
  },
  onFilter: function () {
    this.setData({
      mask2Hidden: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this;
    //以下为商品展示信息
    that.setData({
      restaurant: [{
        "name": "御膳房",
        "src": "http://i2.kiimg.com/601998/a955867016875a41.jpg",
        "star": 4.5,
        "sales": 641,
        "initial_price": 0,
        "distribution_price": 0,
        "distance": "156m",
        "time": 33
      }, {
        "name": "韩式炸鸡啤酒屋",
        "star": 4.5,
        "sales": 731,
        "src": "http://i4.piimg.com/601998/9ce47f2f19d7717d.jpg",
        "initial_price": 15,
        "distribution_price": 0,
        "distance": "1.3km",
        "time": 52
      }],
      location: wx.getStorageSync('location')
    })
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
  }
})