// pages/user/favorites/favorites.js
import {URL} from "../../config/index";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        id: 0,
        list: []
    },
    getInfo() {
        let that = this;
        wx.request({
            url: URL + '/user/getInfo',
            method: "GET",
            data: {
                id: this.data.id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                that.setData({
                    username: res.data.info['username'],
                })
            }

        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 验证是否登陆
        let that = this
        try {
            const value = wx.getStorageSync('id');
            this.setData({
                id: Number(value)
            })
            that.getInfo()
            wx.request({
                url: URL + "/collect/getList",
                method: "GET",
                data: {
                    uid: this.data.id
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                    that.setData({
                        list: res.data.collections
                    })
                }
            })
        } catch (e) {
            console.log('系统错误')
        }
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
