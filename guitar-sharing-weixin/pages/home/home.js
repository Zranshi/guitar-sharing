// pages/home/home.js
import {URL} from "../config/index";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        error: "",
        swiperCurrent: 0,
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 800,
        circular: true,
        imgUrls: [
            'https://lemon-blog-img.oss-cn-beijing.aliyuncs.com/guita/imgs%E5%90%89%E4%BB%962.jpg',
            'https://lemon-blog-img.oss-cn-beijing.aliyuncs.com/guita/imgs%E5%90%89%E4%BB%961.jpg',
            'https://lemon-blog-img.oss-cn-beijing.aliyuncs.com/guita/imgs%E5%90%89%E4%BB%963.jpg',
            'https://lemon-blog-img.oss-cn-beijing.aliyuncs.com/guita/imgs%E5%90%89%E4%BB%964.jpg',
            'https://lemon-blog-img.oss-cn-beijing.aliyuncs.com/guita/imgs%E5%90%89%E4%BB%965.jpg'
        ],
        link: [],
        activeNames: ['0'],
        singer: [],
        type: []
    },
    onChange(e) {
        this.setData({
            activeNames: e.detail
        })
    },
    searchFocus() {
        wx.navigateTo({
            url: "/pages/home/search/search"
        })
    },
    swiperChange: function (e) {
        this.setData({
            swiperCurrent: e.detail.current
        })
    },
    //点击图片触发事件
    swiperClick: function (e) {
        // wx.switchTab({
        //     url: this.data.links[this.data.swiperCurrent]
        // })
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
        // // 验证是否登陆
        let that = this
        try {
            const value = wx.getStorageSync('id');
            if (value === undefined) {
                this.setData({
                    error: "未登陆，请重新登陆"
                })
                wx.redirectTo({
                    url: "/pages/login/login"
                })
            }
        } catch (e) {
            console.log('系统错误')
        }

        // 请求歌手列表
        wx.request({
            url: URL + "/music/getSingerList",
            method: "GET",
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    singer: res.data.singerList
                })
            }
        })
        wx.request({
            url: URL + "/music/getTypeList",
            method: "GET",
            data: {},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    type: res.data.typeList
                })
            }
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
