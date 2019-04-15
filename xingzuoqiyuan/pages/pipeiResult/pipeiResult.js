const app = getApp();
var mta = require('../../sdk/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll:"",//是否查看更多
    h:"474rpx",
    suittable:"",
    remark:""
  },
  //排行榜查看更多事件
  moreBtnEvent:function(){
    if (this.data.isScroll == "") {
      this.setData({
        isScroll: "true",
        h:"564rpx"
      })
    }
  },
  // //底部我也要玩事件
  // wanBtnEvent:function(){
  //   wx.navigateTo({
  //     url: '../selectXingzuo/selectXingzuo'
  //   })
  // },
  //提交formId
  formSubmit: function (e) {
    console.log(app.globalData.id);
    wx.navigateTo({
      url: '../selectXingzuo/selectXingzuo'
    })
    // 发起网络请求
    wx.request({
      url: app.globalData.url + '/home/user/addUser',
      data: {
        formid: e.detail.formId,
        id: app.globalData.id
      },
      method: "GET",
      success: function (r) {
        console.log(r);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    mta.Page.init();
    self.setData({
      windowHeight: app.globalData.windowHeight + 'px'
    })
    console.log(options);//上个页面url
    wx.request({
      url: app.globalData.url + '/home/user/matchingRate',
      data: {
        constellation_1: options.constellation_1,//分享者星座
        constellation_2: options.constellation_2,//受邀者星座
        id_f: options.id_f,//分享者id
        id_j: options.id_j//
      },
      method: "GET",
      success: function (r) {
        console.log(r);
        console.log(r.data.data.list_f.user.avatarUrl);
        self.setData({
          nickname_f:r.data.data.list_f.user.nickname,
          avatarUrl_f: r.data.data.list_f.user.avatarUrl,
          nickname_j: r.data.data.list_j.user.nickname,
          avatarUrl_j: r.data.data.list_j.user.avatarUrl,
          retArr: r.data.data.list_f.retArr,
          suittable: r.data.data.nowUserInfor.matching.suittable+"%",
          remark: r.data.data.nowUserInfor.matching.remark
        })
        if (r.data.data.list_f.retArr.length < 7) {//判断数组长度，动态显示查看更多和列表高度
          self.setData({
            isScroll: "true",
            h: "554rpx"
          })
        }
      },
      fail: function (r) {
        wx.showToast({
          title: '接口error',
          icon: 'none'
        })
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
    return {
      title: '想知道你和什么星座最有缘吗？',
      path: 'pages/shareJoin/shareJoin?scene=' + app.globalData.id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})