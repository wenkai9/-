const app = getApp();
var mta = require('../../sdk/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll: "",//是否查看更多
    h: "474rpx"
  },
  //查看更多
  moreBtnEvent: function () {
    if (this.data.isScroll == "") {
      this.setData({
        isScroll: "true",
        h: "564rpx"
      })
    }
  },
  // //底部我也要玩事件
  // wanBtnEvent: function () {
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

    // wx.navigateToMiniProgram({
    //   appId: 'wx39a82da2cbe67bf5',
    //   path: 'pages/jump/jump',
    //   // envVersion: 'develop',
    //   success(res) {
    //     // 打开成功
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    mta.Page.init();
    self.setData({
      windowHeight: app.globalData.windowHeight+ 'px'
    })
    //调用全局获取用户信息方法
    app.getUserInfo(function (personInfo) {
      //更新数据
      self.setData({
        personInfo: personInfo,
        gender: personInfo.gender,
        nickName: personInfo.nickName,
        avatarUrl: personInfo.avatarUrl
      })
      //根据options.id是否有值判断是够从上个页面跳到本页面
      if (options.id){
        //取数据
        wx.request({
          url: app.globalData.url + '/home/user/userInfor',
          data: {
            id: options.id
          },
          method: "GET",
          success: function (r) {
            if (r.data.data.retArr == null) {
              self.setData({
                tips: "你还未匹配，快去发起匹配哦",
                wan: "发起匹配"

              })
            } else {
              self.setData({
                nickname: r.data.data.user.nickname,
                avatarUrl: r.data.data.user.avatarUrl,
                retArr: r.data.data.retArr,
                tips: "",
                wan: "再玩一次"
              })
              if (r.data.data.retArr.length < 7) {//判断数组长度，动态显示查看更多和列表高度
                self.setData({
                  isScroll: "true",
                  h: "564rpx"
                })

              }
            }
          },
          fail: function (r) {
            wx.showToast({
              title: '接口error',
            })
          }

        })
      }else{//否则是新用户直接进入本页面
        app.getUserOpenid(function (id){
          console.log(id);
          //取数据
          wx.request({
            url: app.globalData.url + '/home/user/userInfor',
            data: {
              id: id
              // id:undefined
            },
            method: "GET",
            success: function (r) {
              if (r.data.data.retArr == null) {
                self.setData({
                  tips: "你还未匹配，快去发起匹配哦",
                  wan: "发起匹配",
                  isScroll: "true",
                  h: "564rpx"
                })
              } else {
                self.setData({
                  nickname: r.data.data.user.nickname,
                  avatarUrl: r.data.data.user.avatarUrl,
                  retArr: r.data.data.retArr,
                  tips: "",
                  wan: "再玩一次"
                })
                if (r.data.data.retArr.length < 7) {//判断数组长度，动态显示查看更多和列表高度
                  self.setData({
                    isScroll: "true",
                    h: "564rpx"
                  })

                }
              }


            },
            fail: function (r) {
              wx.showToast({
                title: '接口error',
              })
            }

          })
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
      path: 'pages/me/me',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})