// pages/login/login.js
import {URL} from "../config/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        error: ""
    },

    // 数据绑定
    userInput(e) {
        this.data.username = e.detail.value
    },
    passInput(e) {
        this.data.password = e.detail.value
    },

    //
    login() {
        let that = this
        if (this.data.username === "") {
            this.setData({
                error: "用户名不能为空"
            })
            return;
        }
        if (this.data.password === "") {
            this.setData({
                error: "密码不能为空"
            })
            return;
        }
        wx.request({
            url: URL + '/user/login',
            method: "POST",
            data: {
                username: this.data.username,
                password: this.data.password
            },
            header: {
                // 'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                if (res.statusCode === 200) {
                    if (res.data['userId'] !== 0) {
                        wx.setStorage({
                            key: "id",
                            data: res.data['userId']
                        })
                        wx.switchTab({
                            url: '/pages/home/home'
                        })
                    } else {
                        that.setData({
                            error: "用户名或密码错误！"
                        })
                    }
                } else {
                    that.setData({
                        error: "系统错误"
                    })
                }
            }
        })
    },
    register() {
        wx.navigateTo({
            url: "/pages/register/register"
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
