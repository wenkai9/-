//app.js
var mta = require('sdk/mta_analysis.js');
App({
  globalData: {
    url: "https://xingzuo.haixinggo.com",//正式网
    // url:"https://xingzuotest.haixinggo.com",//测试网
    id: "",//服务端定义的id
    personInfo: null,//用户所有信息
    gender:"用户性别",
    avatarUrl:"用户头像",
    nickName:"用户昵称",
    appId: "wx65b0d13c9c878577"
  },
  //获取用户信息方法
  getUserInfo: function (cb) {
    var that = this;
    if (that.globalData.personInfo) {
      typeof cb == "function" && cb(that.globalData.personInfo)
    } else {
      wx.getUserInfo({
        withCredentials: "false",
        lang: "zh_CN",
        success: function (r) {//获取用户信息成功
          that.globalData.personInfo = r.userInfo;
          that.globalData.gender = r.userInfo.gender;
          that.globalData.avatarUrl = r.userInfo.avatarUrl;
          that.globalData.nickName = r.userInfo.nickName;
          typeof cb == "function" && cb(that.globalData.personInfo)
        },
        fail: function () {//获取用户信息失败（用户拒绝授权）
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权,将无法正常使用此小程序,点击确定重新获取授权。',
            success: function (res) {
              if (res.confirm) {//用户点击了确定按钮
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                      wx.getUserInfo({
                        success: function (r) {
                          that.globalData.personInfo = r.userInfo;
                          that.globalData.gender = r.userInfo.gender;
                          that.globalData.avatarUrl = r.userInfo.avatarUrl;
                          that.globalData.nickName = r.userInfo.nickName;
                          typeof cb == "function" && cb(that.globalData.personInfo)
                        }
                      })
                    }
                  }, fail: function (res) {

                  }
                })

              }
            }
          })
        }, complete: function (res) {


        }
      })
    }
  },
  //获取用户openid方法
  getUserOpenid: function (cb) {
    var that = this;
    if (that.globalData.id) {
      typeof cb == "function" && cb(that.globalData.id)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: that.globalData.url + '/home/User/WxLogin',//服务端取openid接口地址
              data: {
                code: res.code,
                avatarUrl: that.globalData.avatarUrl,
                gender: that.globalData.gender,
                nickName: that.globalData.nickName,
                appId: that.globalData.appId
              },
              method: "GET",
              success: function (r) {
                console.log(r);//服务端返回openid
                that.globalData.id = r.data.data.id;//将返回id赋于全局变量
                console.log(r.data.data.id);
                typeof cb == "function" && cb(that.globalData.id)
              },
              fail: function (res) {
                wx.showToast({
                  title: '获取id接口error',
                  icon: 'none'
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
  onLaunch: function (options) {
    var that=this;
    console.log(options);
    //获取用户设备信息
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        console.log(res.windowHeight);
        // wx.showToast({
        //   title: res.brand,
        // })
        if (res.brand=="HUAWEI"){
          that.globalData.windowHeight = res.windowHeight+60;
        } else if (res.brand == "HONOR"){
          that.globalData.windowHeight = res.windowHeight + 30;
        }else{
          that.globalData.windowHeight = res.windowHeight;
        }       
      }
    })
    mta.App.init({
      "appID": "500597063",
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
  }
})