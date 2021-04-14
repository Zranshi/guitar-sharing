// pages/login/login.js
import {URL} from "../config/index"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        email: "",
        error: ""
    },

    // 数据绑定
    userInput(e) {
        this.data.username = e.detail.value;
    },
    passInput(e) {
        this.data.password = e.detail.value;
    },
    emailInput(e) {
        this.data.email = e.detail.value;
    },
    // 邮箱正则判断
    emailCheck(value) {
        var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
        return reg.test(value);
    },
    register() {
        let that = this
        if (this.data.username === "") {
            this.setData({
                error: "用户名不能为空"
            })
            return;
        } else if (this.data.password === "") {
            this.setData({
                error: "密码不能为空"
            })
            return;
        } else if (this.data.email === "") {
            this.setData({
                error: "邮箱不能为空"
            })
            return;
        } else if (!this.emailCheck(this.data.email)) {
            this.setData({
                error: "邮箱格式不正确"
            })
            return;
        }

        wx.request({
            url: URL + '/user/register',
            method: "POST",
            data: {
                username: this.data.username,
                password: this.data.password,
                email: this.data.email
            },
            header: {
                // 'content-type': 'application/json'
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                if (res.statusCode === 200) {
                    if (res.data['msg'] === "success") {
                        console.log(res.data)
                        wx.redirectTo({
                            url: '/pages/login/login'
                        })
                    } else {
                        that.setData({
                            error: "用户名或邮箱已存在"
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
