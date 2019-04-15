const app=getApp();
var mta = require('../../sdk/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:"",//用户性别
    xingzuoName:"",//星座名字
    imgarr:[],
    msg:""//底部文字
  },
  //点击星座图片返回上页
  goBack:function(){
    wx.navigateTo({
      url: '../selectXingzuo/selectXingzuo'
    })
  },
  navEvent:function(){
    var self=this;
    wx.navigateToMiniProgram({
      appId: self.data.nav_appid,
      path: self.data.nav_url
    })
  },
  //生成图片
  yulanImageEvent:function(){
    var self=this;
    //发起网络请求
    wx.request({
      url: app.globalData.url + '/home/user/getPoster',
      data: {
        constellation: self.data.xingzuoName,//星座名字
        id: app.globalData.id//id
      },
      method: "GET",
      success: function (r) {
        console.log(r);
        var imgarr=[];
        var img = 'http://xingzuo.haixinggo.com'+r.data.url;//拼接图片url
        console.log(img);
        imgarr.push(img);
        self.setData({
          imgarr:imgarr
        })
        console.log(self.data.imgarr);
        wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: self.data.imgarr // 需要预览的图片http链接列表
        })
      },
      fail:function(){
        wx.showToast({
          title: '生成图片接口error',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    mta.Page.init();
    console.log(options);//option为上个页面传递过来的url参数
    self.setData({
      xingzuoIcon:options.xingzuoIcon,//上个页面传过来的选中的星座图片
      xingzuoName: options.xingzuoName,//上个页面传过来的选中的星座名字
      gender: app.globalData.gender,//从全局js中取用户性别
      windowHeight: app.globalData.windowHeight + 'px'
    })
    // //取图片
    // wx.request({
    //   url: app.globalData.url + '/home/user/getImgLink',
    //   method: "GET",
    //   success: function (r) {
    //     console.log(r);
    //     self.setData({
    //       nav_appid:r.data[0].appid,
    //       nav_pictureurl:r.data[0].pictureurl,
    //       nav_url:r.data[0].url,
    //       nav_imgheight:r.data[0].imgheight+'rpx'
    //     })
    //   },
    //   fail: function () {
    //   }
    // })

    //取文字
    wx.request({
      url: app.globalData.url + '/home/user/getText',
      method: "GET",
      success: function (r) {
        console.log(r);
        console.log(r.data.msg);
        self.setData({
          msg: r.data.msg
        })
      },
      fail: function () {
      }
    })


    //控制生成图片按钮是否隐藏
    wx.request({
      url: app.globalData.url + '/home/user/getStatus',
      method: "GET",
      success: function (r) {
        console.log(r);
        console.log(r.data.status);
        console.log(r.data.location);
        self.setData({
          status: r.data.status,
          location: r.data.location,
          marginTop: r.data.marginTop+'rpx'
        })
      },
      fail: function () {
      }
    })
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
  onShareAppMessage: function (res) {
    var self=this;
    return {
      title: '我们的星座匹配吗？',
      // path: 'pages/shareJoin/shareJoin?scene=' + app.globalData.id,
      path: 'pages/test/test?scene=' + app.globalData.id,
      success: function (res) {
        // 转发成功传星座
        wx.request({
          url: app.globalData.url + '/home/user/editConstellation',
          data: {
            id: app.globalData.id,
            constellation: self.data.xingzuoName
          },
          method: "GET",
          success: function (r) {
            console.log("成功")
          },
          fail: function (r) {
            wx.showToast({
              title: '接口error',
              icon: 'none'
            })
          }

        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})