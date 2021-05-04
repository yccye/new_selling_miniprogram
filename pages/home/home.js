// pages/home/home.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    characteristicList:[{
      text: "免配送费"
    },{
      text: "0元起送"
    },{
      text: "新商家"
    },{
      text: "品牌商家"
    },{
      text: "跨天预定"
    }],
    sortList:[{
      sort: "综合排序",
      image:"",
    }, {
      sort: "速度最快",
      image: "",
    }, {
      sort: "评分最高",
      image: "",
    }, {
      sort: "起送价最低",
      image: "",
    }, {
      sort: "配送费最低",
      image: "",
    }],
    discountList:[{
      icon: "减",
      iconColor: "#FF635B", 
      text: "满减优惠"
    },{
      icon: "领",
      iconColor: "#FF7298", 
      text: "进店领券"
    },{
      icon: "返",
      iconColor: "#FB4343", 
      text: "满返代金券"
    },{
      icon: "折",
      iconColor: "#C183E2", 
      text: "折扣商品"
    },{
      icon: "订",
      iconColor: "#6FDF64", 
      text: "提前下单优惠"
    },{
      icon: "赠",
      iconColor: "#FDC41E", 
      text: "满赠活动"
    },{
      icon: "免",
      iconColor: "#43B697", 
      text: "满免配送"
    }],
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
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
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
      // wx.scanCode({
      //   onlyFromCamera: true,
      //   success(res){
      //     app.globalData.isIn = true;
      //   }
      // })
    }
  },
  finish: function () {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/filter",
      method: "GET",
      success: function (res) {
        that.setData({
          restaurant: res.data.data.restaurant,
        })
      }
    });
  },
  sortSelected: function (e) {
    var that = this;
    wx.request({
      url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/overAll",
      method: "GET",
      success: function (res) {
        that.setData({
          restaurant: res.data.data.restaurant,
          sortSelected: that.data.sortList[e.currentTarget.dataset.index].sort
        })
      }
    });
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
    // wx.request({
    //   url: "https://www.easy-mock.com/mock/596257bc9adc231f357c4664/restaurant/info",
    //   method: "GET",
    //   success: function (res) {
    //     that.setData({
    //       restaurant: res.data.data.restaurant,
    //       location: wx.getStorageSync('location')
    //     })
    //   }
    // });
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