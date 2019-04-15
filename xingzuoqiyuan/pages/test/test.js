const app=getApp();
var mta = require('../../sdk/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    mta.Page.init();
    // console.log(options);
    wx.showLoading({
      title: 'loding...',
    })
    //调用全局获取用户信息方法
    app.getUserInfo(function (personInfo) {
      //更新数据
      self.setData({
        personInfo: personInfo,
        gender: personInfo.gender,
        nickName: personInfo.nickName,
        avatarUrl: personInfo.avatarUrl,
        id_f: options.scene,
        windowHeight: app.globalData.windowHeight + 'px'
      })
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: app.globalData.url + '/home/User/WxLogin',
              data: {
                id: options.scene,//分享者id
                code: res.code,//进入者code
                avatarUrl: self.data.avatarUrl,//进入者头像
                gender: self.data.gender,//进入者性别
                nickName: self.data.nickName,//进入者昵称
                appId: app.globalData.appId
              },
              method: "GET",
              success: function (r) {
                console.log(r);
                //判断两个用户id是否匹配过
                wx.request({
                  url: app.globalData.url + '/home/user/matchingRate',
                  data: {
                    id_f: options.scene ,//分享者id
                    id_j:r.data.data.id//进入者id
                  },
                  method: "GET",
                  success: function (res) {
                    console.log(res);
                    if (res.data.data.status){//status为1  匹配过
                      wx.navigateTo({
                        url: '../pipeiResult/pipeiResult?id_f=' + options.scene + '&id_j=' + r.data.data.id
                      })
                    }else{
                      if (r.data.data.id == options.scene) {
                        wx.reLaunch({
                          url: '../me/me?id=' + options.scene
                        })
                      } else if (r.data.data.id != options.scene) {
                        wx.reLaunch({
                          url: '../shareJoin/shareJoin?scene=' + options.scene
                        })
                      }
                      app.globalData.id = r.data.data.id;//将返回的当前用户id赋于全局变量
                    }
                  },
                  fail: function (r) {
                    wx.showToast({
                      title: '接口error',
                    })
                  }

                })
                // //888
                
              },
              fail: function (r) {
                wx.showToast({
                  title: '接口error',
                })
              }

            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })

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
  onShareAppMessage: function () {
  
  }
})