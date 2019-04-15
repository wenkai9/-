const app = getApp();
var mta = require('../../sdk/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: "",//当前用户所有信息
    gender: "",//当前用户性别
    nickName: "",//当前用户昵称
    avatarUrl: "",//当前用户头像url
    head_f:"",//分享者头像
    constellation_f:"",//分享者星座
    id_f:"",//分享者id
    constellation_j:"请选择",//进入者星座
    id_j:""//进入者id
  },
  //进入者点击头像选择星座
  joinEvent:function(){
    var self=this;
    wx.navigateTo({
      url: '../selectXingzuo/selectXingzuo?origin=1&id_f='+self.data.id_f,
    })
  },
  // //底部星座速配按钮
  // pipeiEvent:function(){
  //   var self=this;
  //   if (self.data.constellation_j==undefined){
  //     wx.showToast({
  //       title: '请点击自己头像选择自己星座',
  //       icon: 'none',
  //     })
  //   }else{
  //     wx.reLaunch({
  //       url: '../pipeiResult/pipeiResult?constellation_1=' +
  //       self.data.constellation_f + '&constellation_2=' + self.data.constellation_j +
  //       '&id_f=' + self.data.id_f + '&id_j=' + self.data.id_j
  //     })
  //   }
  // },
  //提交formId
  formSubmit: function (e) {
    var self = this;
    if (self.data.constellation_j == undefined) {
      wx.showToast({
        title: '请点击自己头像选择星座',
        icon: 'none',
      })
    } else {
      wx.reLaunch({
        url: '../pipeiResult/pipeiResult?constellation_1=' +
        self.data.constellation_f + '&constellation_2=' + self.data.constellation_j +
        '&id_f=' + self.data.id_f + '&id_j=' + self.data.id_j
      })
    }
    console.log(e.detail.formId);
    console.log(app.globalData.id);
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
    var self = this;
    mta.Page.init();
    console.log(options);
    //调用全局获取用户信息方法
    app.getUserInfo(function (personInfo) {
      //更新数据
      self.setData({
        personInfo: personInfo,
        gender: personInfo.gender,
        nickName: personInfo.nickName,
        avatarUrl: personInfo.avatarUrl,
        id_f:options.scene,
        constellation_j:options.xingzuoname,
        windowHeight: app.globalData.windowHeight+'px'
      })
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
                //发起网络请求
                wx.request({
                  url: app.globalData.url +'/home/User/WxLogin',
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
                    if (r.data.data.id==options.scene){
                      wx.reLaunch({
                        url: '../me/me?id='+options.scene
                      })
                    }
                    app.globalData.id = r.data.data.id;//将返回的当前用户id赋于全局变量
                    console.log(r);
                    self.setData({
                      id_j:r.data.data.id,//设置进入者的id
                      head_f: r.data.data.user.avatarUrl,//设置分享者头像
                      constellation_f: r.data.data.user.constellation//设置分享者星座
                    })
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