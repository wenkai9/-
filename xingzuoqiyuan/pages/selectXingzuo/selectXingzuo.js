const app = getApp();
var mta = require('../../sdk/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origin:"",//判断此页面来源参数
    items: [
      {
        xingzuoName: '白羊座',
        xingzuoDate:'(3.21-4.19)',
        xingzuoIcon: '../../images/baiyang.png'
      },
      {
        xingzuoName: '金牛座',
        xingzuoDate: '(4.20-5.20)',
        xingzuoIcon: '../../images/jinniu.png'
      },
      {
        xingzuoName: '双子座',
        xingzuoDate: '(5.21-6.21)',
        xingzuoIcon: '../../images/shuangzi.png'
      },
      {
        xingzuoName: '巨蟹座',
        xingzuoDate: '(6.22-7.22)',
        xingzuoIcon: '../../images/juxie.png'
      },
      {
        xingzuoName: '狮子座',
        xingzuoDate: '(7.23-8.22)',
        xingzuoIcon: '../../images/shizi.png'
      },
      {
        xingzuoName: '处女座',
        xingzuoDate: '(8.23-9.22)',
        xingzuoIcon: '../../images/chunv.png'
      },
      {
        xingzuoName: '天秤座',
        xingzuoDate: '(9.23-10.23)',
        xingzuoIcon: '../../images/tiancheng.png'
      },
      {
        xingzuoName: '天蝎座',
        xingzuoDate: '(10.24-11.22)',
        xingzuoIcon: '../../images/tianxie.png'
      },
      {
        xingzuoName: '射手座',
        xingzuoDate: '(11.23-12.21)',
        xingzuoIcon: '../../images/sheshou.png'
      },
      {
        xingzuoName: '摩羯座',
        xingzuoDate: '(12.22-1.19)',
        xingzuoIcon: '../../images/moxie.png'
      },
      {
        xingzuoName: '水瓶座',
        xingzuoDate: '(1.20-2.18)',
        xingzuoIcon: '../../images/shuiping.png'
      },
      {
        xingzuoName: '双鱼座',
        xingzuoDate: '(2.19-3.20)',
        xingzuoIcon: '../../images/shuangyu.png'
      },
    ]
  },
  selectEvent:function(e){
    console.log(e);
    var self=this;
    if(self.data.origin=="1"){
      wx.navigateTo({
        url: '../shareJoin/shareJoin?scene=' + self.data.id_f + '&xingzuoname=' + e.currentTarget.dataset.xingzuoname
      })
    } else{
      wx.navigateTo({
        url: '../share/share?xingzuoIcon=' + e.currentTarget.dataset.xingzuoicon +
        '&xingzuoName=' + e.currentTarget.dataset.xingzuoname
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    mta.Page.init();
    console.log(options.origin);//origin判断此页面来源
    self.setData({
      origin: options.origin,
      id_f:options.id_f,
      windowHeight: app.globalData.windowHeight+ 'px'
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